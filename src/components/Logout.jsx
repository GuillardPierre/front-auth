import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const raw = localStorage.getItem("auth");
  const token = JSON.parse(raw);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (token && new Date(token.expiresAt) > new Date()) {
          const rep = await fetch(
            "https://offers-api.digistos.com/api/auth/logout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              credentials: "include",
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
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
