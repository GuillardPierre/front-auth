import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const rep = await fetch(
          'https://offers-api.digistos.com/api/auth/logout',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('auth'))?.token
              }`,
            },
          }
        );
        if (!rep.ok) {
          const response = await rep.json();
          throw new Error(response.message);
        }
        localStorage.removeItem('auth');
        navigate('/connexion');
      } catch (error) {
        console.error(error);
      }
    };

    handleLogout();
  }, []);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
