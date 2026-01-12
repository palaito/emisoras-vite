import { useState, useEffect } from "react";
import RadioList from "./RadioList";
import Player from "./Player";

function App() {
  const [currentStation, setCurrentStation] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (station) => {
    setFavorites(prev =>
      prev.some(f => f.stationuuid === station.stationuuid)
        ? prev.filter(f => f.stationuuid !== station.stationuuid)
        : [...prev, station]
    );
  };

  return (
    <div style={{ paddingBottom: "80px" }}>
      <RadioList
        onSelectStation={setCurrentStation}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Player currentStation={currentStation} />
    </div>
  );
}

export default App;