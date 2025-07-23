import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice";

const Logout = () => {
  const token = useSelector((state) => state.auth.token);
  const expiresAt = useSelector((state) => state.auth.expiresAt);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token && new Date(expiresAt) > new Date()) {
          const rep = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!rep.ok) {
            const response = await rep.json();
            throw new Error(response.message);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(logout());
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
