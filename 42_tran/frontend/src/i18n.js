import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    resources: {
      en: {
        translation:  {
        "hello_message": "hello {{name}} !",
        "welcom": "welcom sir to dragon pong {{name}}",
        "coup": " Where every stroke is a dragon's step towards victory",
        "aventure": "Want to hone your forehand with a dash of adventure?",
        "av": "With us, every exchange is more epic than a battle between knights and dragons!",
        "ave": "Test your reflexes and strategy in a simple but captivating game.",
        "aven": "Share your impressive scores and your best moments.",
        "classement": "rank",
        "photo": "Picture",
        "gagne": "Winner",
        "perdre": "Loser",
        "grade": "Rank",
        "info": "Info user",
        "nom": "Last name",
        "prenom": "First name",
        "game": "Jeux",
        "parametre": "Parametres",
        
        }
      },
      fr: {
        translation: {
        "hello_message": "Bonjour {{name}} !",
        "welcom": "bienvenue sir sur dragon pong {{name}}",
        "coup": "Où chaque coup de raquette est un pas de dragon vers la victoire. {{name}}",
        "aventure": "Envie de peaufiner votre coup droit avec un zeste d'aventure ?",
        "av": "Chez nous, chaque échange est plus épique qu'une bataille entre chevaliers et dragons !",
        "ave": "Testez vos réflexes et votre stratégie dans un jeu simple mais captivant.",
        "aven": "Partagez vos scores impressionnants et vos meilleurs moments.",
        "classement": "Classement des joueurs",
        "photo": "Photo",
        "gagne": "Gagnant",
        "perdre": "Perdant",
        "grade": "Grade",
        "info": "Profile",
        "nom": "Nom",
        "prenom": "Prenom",
        "game": "games",
        "parametre": "Setting",
        }
      }
    }
  });

export default i18n;
