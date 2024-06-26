import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VAULT_ADDR = 'http://localhost:8200';
const VAULT_TOKEN = 'root';  // Remplacez par le token d'accès approprié pour la production

const CLIENT_ID = 'votre_client_id_42';  // Remplacez par votre client ID
const CLIENT_SECRET = 'votre_client_secret_42';  // Remplacez par votre client secret
const REDIRECT_URI = 'http://localhost:3000';  // URL de redirection après authentification

const Login = () => {
  const [authUrl, setAuthUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUrl = async () => {
      const url = `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      setAuthUrl(url);
    };

    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Récupérer la clé d'API depuis Vault
          const response = await axios.get(`${VAULT_ADDR}/v1/secret/data/myapp`, {
            headers: {
              'X-Vault-Token': VAULT_TOKEN,
            },
          });

          const api_key = response.data.data.api_key;  // Adapter en fonction de la structure de votre secret

          // Utiliser la clé d'API pour demander le token d'accès
          const tokenResponse = await axios.post('oauth/token', {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI,
          });

          localStorage.setItem('access_token', tokenResponse.data.access_token);
          localStorage.setItem('api_key', api_key);  // Stocker la clé d'API localement si nécessaire
          
          navigate('/profile');  // Rediriger vers la page de profil après authentification
        } catch (error) {
          console.error('Erreur de récupération du token d\'accès :', error);
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
