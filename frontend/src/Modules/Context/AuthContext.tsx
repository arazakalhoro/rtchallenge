import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthInterface } from "../../Interfaces/Interface";

export const AuthContext = createContext<AuthInterface>({
  baseUrl: "",
  getUserData() {},
  ChangePassword() {},
  loginUser: {
    exp: 0,
    iat: 0,
    roles: ["", "", "", "", "", "", ""],
    userName: "",
    userEmail: "",
    userGroup: "",
    userId: 0,
    
  },
  requestHeaders: {},
  setLoginUser() {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
{
  /* TODO:Mostafa Any*/
}
export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginUser, setLoginUser] = useState(null);
  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  let baseUrl = "http://127.0.0.1:8000/api";

  const getUserData = () => {
    const encodedToken: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(encodedToken);
    setLoginUser(decodedToken);
  };
  const ChangePassword = () => {
    return (
      
      <h1>ChangePassword</h1>
    )
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ getUserData, loginUser, setLoginUser, baseUrl, requestHeaders,ChangePassword }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
