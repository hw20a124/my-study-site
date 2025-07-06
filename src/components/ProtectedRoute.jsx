import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    //未ログインなら/loginにリダイレクト
    return <Navigate to="/login" />;
  }

  //ログイン済みなら中身を表示
  return children;
};

export default ProtectedRoute;