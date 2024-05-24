import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './../components/NavBar';
import { Link } from 'react-router-dom';

const Game: React.FC = () => {
 
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }
  return (
    <div className="home-container">
      <NavBar />
      <section className="reduced-image">
        <div className="container py-5">
          <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('en')}>English</button>
          <h1>{t('hello_message', { name: "ping" })}</h1>
          <div className="card mt-4">
          <Link to="/pong">1 V 1 </Link>
          <Link to="/IApong">1 V IA </Link>
          <Link to="/Tournament"> tournoi </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Game;
