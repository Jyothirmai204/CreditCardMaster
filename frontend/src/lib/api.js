import { API_BASE } from "../config";

export async function apiRequest(path, options = {}, token = "") {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = token;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.msg || data?.message || `Request failed with ${response.status}`);
  }

  return data;
}

export async function submitJson(event, path, token, payload, setToast) {
  event.preventDefault();
  try {
    await apiRequest(
      path,
      {
        method: "POST",
        body: JSON.stringify(payload)
      },
      token
    );
    setToast(`${path} succeeded`);
  } catch (error) {
    setToast(error.message);
  }
}

export async function submitWithoutBody(event, path, token, setToast) {
  event.preventDefault();
  try {
    await apiRequest(path, { method: "POST" }, token);
    setToast(`${path} succeeded`);
  } catch (error) {
    setToast(error.message);
  }
}
