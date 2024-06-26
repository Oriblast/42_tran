import React, { useState } from 'react';

const PlayerForm = ({ addPlayer }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nom du joueur"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default PlayerForm;
