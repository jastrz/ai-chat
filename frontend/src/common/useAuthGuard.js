import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const useAuthGuard = () => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.username === "User" || !userData.token) {
      navigate("/login");
    }
  }, [userData]);
};
