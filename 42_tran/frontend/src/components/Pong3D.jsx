import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Pong3D = () => {
  const mountRef = useRef(null);
  const [keysPressed1, setKeysPressed1] = useState({ z: false, x: false });
  const [keysPressed2, setKeysPressed2] = useState({ '8': false, '2': false });
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    // Définir les dimensions de la scène
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Créer une scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Créer une caméra
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Créer un rendu
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Ajouter des contrôles d'orbite
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    // Ajouter une lumière
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Créer les raquettes
    const paddleGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
    const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const paddle1 = new THREE.Mesh(paddleGeometry, paddleMaterial);
    const paddle2 = new THREE.Mesh(paddleGeometry, paddleMaterial);
    paddle1.position.x = -2;
    paddle2.position.x = 2;
    scene.add(paddle1);
    scene.add(paddle2);

    // Créer la balle
    const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Mouvement de la balle
    let ballDirection = { x: 0.05, y: 0.05 };

    // Fonction pour mettre à jour les scores
    const updateScore = (player) => {
      if (player === 1) {
        setScore1((prevScore) => {
          if (prevScore + 1 >= 5) {
            alert("Le joueur 1 a gagné !");
            return 0;
          }
          return prevScore + 1;
        });
      } else {
        setScore2((prevScore) => {
          if (prevScore + 1 >= 5) {
            alert("Le joueur 2 a gagné !");
            return 0;
          }
          return prevScore + 1;
        });
      }
      ball.position.set(0, 0, 0); // Réinitialiser la position de la balle
      ballDirection.x = 0.05 * (Math.random() > 0.5 ? 1 : -1);
      ballDirection.y = 0.05 * (Math.random() > 0.5 ? 1 : -1);
    };

    // Animation
    const animate = () => {
      // Déplacer la balle
      ball.position.x += ballDirection.x;
      ball.position.y += ballDirection.y;

      // Vérifier les collisions avec les murs
      if (ball.position.y >= 2.5 || ball.position.y <= -2.5) {
        ballDirection.y *= -1;
      }

      // Vérifier les collisions avec les raquettes
      if (
        (ball.position.x >= paddle2.position.x - 0.1 && ball.position.x <= paddle2.position.x + 0.1 && ball.position.y <= paddle2.position.y + 0.5 && ball.position.y >= paddle2.position.y - 0.5) ||
        (ball.position.x <= paddle1.position.x + 0.1 && ball.position.x >= paddle1.position.x - 0.1 && ball.position.y <= paddle1.position.y + 0.5 && ball.position.y >= paddle1.position.y - 0.5)
      ) {
        ballDirection.x *= -1;
      }

      // Vérifier les sorties de terrain
      if (ball.position.x >= 3) {
        updateScore(1); // Joueur 1 marque
      }
      if (ball.position.x <= -3) {
        updateScore(2); // Joueur 2 marque
      }

      // Déplacer les raquettes
      if (keysPressed1['z'] && paddle1.position.y < 2) {
        paddle1.position.y += 0.1;
      }
      if (keysPressed1['x'] && paddle1.position.y > -2) {
        paddle1.position.y -= 0.1;
      }
      if (keysPressed2['8'] && paddle2.position.y < 2) {
        paddle2.position.y += 0.1;
      }
      if (keysPressed2['2'] && paddle2.position.y > -2) {
        paddle2.position.y -= 0.1;
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Gestion des événements de clavier
    const handleKeyDown = (event) => {
      if (event.key === 'z' || event.key === 'x') {
        setKeysPressed1((prevState) => ({ ...prevState, [event.key]: true }));
      }
      if (event.key === '8' || event.key === '2') {
        setKeysPressed2((prevState) => ({ ...prevState, [event.key]: true }));
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'z' || event.key === 'x') {
        setKeysPressed1((prevState) => ({ ...prevState, [event.key]: false }));
      }
      if (event.key === '8' || event.key === '2') {
        setKeysPressed2((prevState) => ({ ...prevState, [event.key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Nettoyage à la fin du composant
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [keysPressed1, keysPressed2]);

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
      <div>
        <p>Score Joueur 1: {score1}</p>
        <p>Score Joueur 2: {score2}</p>
      </div>
    </div>
  );
};

export default Pong3D;
