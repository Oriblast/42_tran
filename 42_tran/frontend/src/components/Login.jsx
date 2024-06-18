// src/components/Login.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';  // Assurez-vous que votre instance axios est configurée

const CLIENT_ID = 'votre_client_id_42';  // Remplacez par votre client ID
const CLIENT_SECRET = 'votre_client_secret_42';  // Remplacez par votre client secret
const REDIRECT_URI = 'http://localhost:3000';  // URL de redirection après authentification

const Login = () => {
  const [authUrl, setAuthUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUrl = () => {
      const url = `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      setAuthUrl(url);
    };

    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post('oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI,
          });

          localStorage.setItem('access_token', response.data.access_token);
          navigate('/profile');  // Rediriger vers la page de profil après authentification
        } catch (error) {
          console.error('Erreur de récupération du token d\'accès:', error);
        }
      }
    };

    getAuthUrl();
    handleCallback();
  }, [navigate]);

  return (
    <div>
      <h2>Connectez-vous avec 42</h2>
      <a href={authUrl}>Login with 42</a>
    </div>
  );
};

export default Login;
