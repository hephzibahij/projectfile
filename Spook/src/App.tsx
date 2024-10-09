import React, { useState, useEffect } from 'react';
import './App.css';
import { mainCharacter, spookCoin, squadIcon, freakIcon, dollarCoin } from './images';
import Settings from './icons/Settings';

const App: React.FC = () => {
  const [points, setPoints] = useState(300000000);  // Start with a high number for the currency display
  const [freaks, setFreaks] = useState(30);         // Number of freaks (as in the image)
  const level = 2;                                  // Placeholder for the level (2 in your image)

  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 11;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg);
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  return (
    <div className="bg-black flex justify-center text-white h-screen font-bold">
      {/* Header */}
      <div className="w-full max-w-xl px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={freakIcon} alt="Freaks" className="w-8 h-8" />
            <p className="ml-2">{freaks} Freaks</p>
          </div>
          <p>LVL {level}</p>
          <Settings className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-[#272a2f] text-center rounded-t-[48px] flex flex-col items-center py-8">
        <p className="text-xl mb-4">300,000,000</p>
        <div className="w-64 h-64 bg-white rounded-full p-4" onClick={handleCardClick}>
          <img src={mainCharacter} alt="Ghost" className="w-full h-full" />
        </div>
        <p className="mt-6">Complete tasks to earn $$SPOOK</p>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs py-2">
        <div className="text-center w-1/4">
          <img src={mainCharacter} alt="Home" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Home</p>
        </div>
        <div className="text-center w-1/4">
          <img src={squadIcon} alt="Tasks" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Tasks</p>
        </div>
        <div className="text-center w-1/4">
          <img src={spookCoin} alt="Leaderboard" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Leaderboard</p>
        </div>
        <div className="text-center w-1/4">
          <img src={dollarCoin} alt="Friends" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
      </div>

      {/* Click animations */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: ${click.y - 42}px,
            left: ${click.x - 28}px,
            animation: float 1s ease-out
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </div>
  );
};

export default App;