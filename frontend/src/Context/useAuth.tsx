import { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { UserProfile } from "../Models/User";
import { loginAPI } from "../Services/AuthService";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      setRole(role);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, [token]);

  const loginUser = async (email: string, password: string) => {
    //await loginAPI(email, password)
    //   .then((res) => {
    //     if (res) {
    //       localStorage.setItem("token", res?.data.token);
    //       const userObj = {
    //         userName: res?.data.userName,
    //         email: res?.data.email,
    //         role: res?.data.role,
    //       };
    //       localStorage.setItem("user", JSON.stringify(userObj));
    //       setToken(res?.data.token);
    //       setUser(userObj);
    //       navigate("/add");
    //     }
    //   })
    //   .catch((e) => console.log("Server error occured"));

    //TODO: Delete this temp one< after api

    localStorage.setItem("token", "ebrdt4eh4e");
    const userObj = {
      id: 1,
      username: "Admin",
      email: "evwee@vev.ru",
      role: "super_admin",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken("ebrdt4eh4e");
    setUser(userObj);
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setToken("");
    setRole("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ user, token, loginUser, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
