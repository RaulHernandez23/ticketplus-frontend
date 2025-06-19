import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

export function useAuthValidation() {
	const [status, setStatus] = useState("loading"); // 'loading' | 'valid' | 'invalid' | 'no-token'

	useEffect(() => {
		const verificar = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				setStatus("no-token");
				return;
			}

			try {
				await apiFetch("/api/auth/validar-token", {
					method: "GET",
					headers: {
						"x-token": token,
					},
				});
				setStatus("valid");
			} catch (error) {
				localStorage.clear();
				setStatus("invalid");
			}
		};

		verificar();
	}, []);

	console.log("Estado de autenticación:", status);
	return status;
}
