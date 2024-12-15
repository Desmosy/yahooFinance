import React, { useState, useEffect, useRef } from 'react';


const playDropSound = () => {
    const audio = new Audio(drop);
    audio.play();
  };
  
const DollarCatchGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [dollars, setDollars] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (!gameOver) {
        createDollar();
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);

  const createDollar = () => {
    const newDollar = {
      id: Date.now(),
      left: Math.random() * 100,
      top: -5,
    };
    setDollars(prevDollars => [...prevDollars, newDollar]);
  };

  const moveDollars = () => {
    setDollars(prevDollars =>
      prevDollars.map(dollar => ({
        ...dollar,
        top: dollar.top + 1,
      })).filter(dollar => {
        if (dollar.top > 100) {
          setLives(prevLives => prevLives - 1);
          return false;
        }
        return true;
      })
    );
  };

  useEffect(() => {
    const moveInterval = setInterval(moveDollars, 50);
    return () => clearInterval(moveInterval);
  }, []);

  const handleMouseMove = (e) => {
    if (gameOver || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setPlayerPosition(Math.max(0, Math.min(newPosition, 100)));
  };

  const checkCollision = () => {
    setDollars(prevDollars =>
      prevDollars.filter(dollar => {
        const dollarRect = {
          left: dollar.left,
          right: dollar.left + 6,
          top: dollar.top,
          bottom: dollar.top + 5,
        };
        const playerRect = {
          left: playerPosition - 5,
          right: playerPosition + 5,
          top: 85,
          bottom: 95,
        };

        if (
          dollarRect.bottom >= playerRect.top &&
          dollarRect.left < playerRect.right &&
          dollarRect.right > playerRect.left
        ) {
          setScore(prevScore => prevScore + 10);
          
          return false;
        }
        return true;
      })
    );
  };

  useEffect(checkCollision, [dollars, playerPosition]);

  return (
    <div style={styles.body}>
      <div ref={containerRef} style={styles.gameContainer} onMouseMove={handleMouseMove}>
        <div style={styles.score}>SCORE: {score}</div>
        <div style={styles.lives}>LIVES: {lives}</div>
        <div style={{...styles.player, left: `${playerPosition}%`}}>💼 TRADER</div>
        {dollars.map(dollar => (
          <div key={dollar.id} style={{...styles.dollar, left: `${dollar.left}%`, top: `${dollar.top}%`}}>$</div>
        ))}
        {gameOver && <div style={styles.gameOver}>GAME OVER! MARKET CRASH! 💥</div>}
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: 'black',
    color: '#00FF00',
    fontFamily: "'Courier New', monospace",
    margin: 0,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  gameContainer: {
    width: '100%',
    maxWidth: '800px',
    height: '400px',
    backgroundColor: '#111',
    border: '3px solid #00FF00',
    position: 'relative',
    overflow: 'hidden',
  },
  player: {
    width: '80px',
    height: '40px',
    backgroundColor: '#00FF00',
    position: 'absolute',
    bottom: '20px',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: '40px',
    fontWeight: 'bold',
  },
  dollar: {
    position: 'absolute',
    width: '50px',
    height: '20px',
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    lineHeight: '20px',
    fontWeight: 'bold',
    border: '2px solid lime',
  },
  score: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '20px',
  },
  lives: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
  },
  gameOver: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontSize: '30px',
    animation: 'blink 1s infinite',
  },
};

export default DollarCatchGame;
