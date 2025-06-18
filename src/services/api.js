const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiFetch = async (endpoint, options = {}) => {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
		...options,
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Error ${response.status}: ${error}`);
	}

	return response.json();
};
