import { useState, useEffect } from 'react';

export default function EscapeSquare() {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const newTop = Math.floor(Math.random() * 80 + 10) + '%';
      const newLeft = Math.floor(Math.random() * 80 + 10) + '%';
      setPosition({ top: newTop, left: newLeft });
    }, 1500);

    return () => clearInterval(moveInterval);
  }, []);

  const handleClick = () => {
    if (gameOver) return;
    setScore(score + 1);
    setMisses(0);
  };

  const handleMiss = () => {
    if (gameOver) return;
    setMisses(prev => {
      const next = prev + 1;
      if (next >= 3) setGameOver(true);
      return next;
    });
  };

  return (
    <div
      onClick={handleMiss}
      style={{ width: '100%', height: '80vh', position: 'relative', background: '#f9f9f9' }}
    >
      {!gameOver && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          style={{
            width: 60,
            height: 60,
            background: 'blue',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            borderRadius: 8,
            position: 'absolute',
            top: position.top,
            left: position.left,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer'
          }}
        >
          base
        </div>
      )}

      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>Score: {score}</h2>
        {gameOver && <h3 style={{ color: 'red' }}>Game Over</h3>}
      </div>
    </div>
  );
}
