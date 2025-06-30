import { createContext, useContext, useState, ReactNode } from "react";

export interface UserData {
    nombre: string | null;
    correo: string | null;
    contrasena: string | null;
}

interface UserContextType {
    user: string | null;
    setUser: (user: string) => void;
}

const UserContext = createContext<UserContextType>(null!);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>("");

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};