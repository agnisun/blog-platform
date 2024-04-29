import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token") || "");

	return <AuthContext.Provider value={useMemo(() => ({ token, setToken }), [token])}>{children}</AuthContext.Provider>;
}
