/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "./api/axios";
import { urls } from "./constants/links";
import jwtDecode from "./utils/jwt_decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const tokensLocalStorage = JSON.parse(localStorage.getItem("tokens"));
    const onLoadTokens = tokensLocalStorage ? tokensLocalStorage : null;
    const decodedToken = tokensLocalStorage
        ? jwt_decode(tokensLocalStorage.access)
        : null;
    const [user, setUser] = useState(() => decodedToken);
    const [tokens, setTokens] = useState(() => onLoadTokens);

    const loginUser = async (inputs) => {
        const response = await axios.post(urls.LOGIN, inputs)
        setTokens(response.data);
        const userID = jwtDecode(response.data.access);
        setUser(userID);
        localStorage.setItem("tokens", JSON.stringify(response.data));
    }

    const logout = () => {
        setTokens(null);
        setUser(null);
    }

    const updateUser = async () => {
        try {
            const response = await axios.post(urls.REFRESH, {
                refresh: tokens.refresh,
            });
            const data = await response.json()
            setTokens(data)
            setUser(jwt_decode(data.access));
            localStorage.setItem("tokens", JSON.stringify(data));
        } catch (error) {

        }
    }

    useEffect(() => {
        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (tokens) {
                updateUser();
            }
        }, fourMinutes);

        return () => clearInterval(interval);
    }, [tokens]);

    return (
        <AuthContext.Provider value={{ user, loginUser, tokens, logout }}>{children}</AuthContext.Provider>
    )
}