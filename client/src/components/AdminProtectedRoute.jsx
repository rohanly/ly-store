import { useSession } from "@/context/SessionContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AdminProtectedRoutes({ children }) {
  const { sessionUser, isAuthenticated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
    }
  }, [isAuthenticated]);

  if (sessionUser && sessionUser.role != "admin") {
    return <div>Not a admin</div>;
  }

  return children;
}
