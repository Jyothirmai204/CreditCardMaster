const STORAGE_KEY = "cardmaster-auth";

export function readStoredAuth() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { token: "", role: "", name: "" };
  }

  try {
    return JSON.parse(saved);
  } catch {
    return { token: "", role: "", name: "" };
  }
}

export function writeStoredAuth(auth) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
  localStorage.removeItem(STORAGE_KEY);
}

export function decodeJwtPayload(token) {
  try {
    const raw = token.replace("Bearer ", "").split(".")[1];
    const normalized = raw.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(normalized)
        .split("")
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return {};
  }
}
