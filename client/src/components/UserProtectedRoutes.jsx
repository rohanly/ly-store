import { useSession } from "@/context/SessionContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function UserProtectedRoutes({ children }) {
  const { sessionUser, isAuthenticated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
    }
  }, [isAuthenticated]);

  return children;
}
