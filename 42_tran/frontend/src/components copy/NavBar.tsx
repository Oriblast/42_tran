import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importez useTranslation depuis react-i18next

const NavBar = () => {
  const { t, i18n } = useTranslation(); // Utilisez useTranslation pour obtenir la fonction t et l'objet i18n

  const changeToFrench = () => {
    i18n.changeLanguage('fr'); // Changez la langue en français
  };

  const changeToEnglish = () => {
    i18n.changeLanguage('en'); // Changez la langue en anglais
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          DragonPong
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/game"
              >
                {t('game')} {/* Utilisez la fonction t pour traduire le texte */}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/leaderboard"
              >
                {t('leaderboard')}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/settings"
              >
                {t('settings')}
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link btn btn-sm mb-0 me-1"
                to="/login"
              >
                {t('login')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
