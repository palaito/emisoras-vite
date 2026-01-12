import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://de1.api.radio-browser.info/json/stations/search?limit=200&countrycode=VE";

export default function RadioList({ onSelectStation, favorites, toggleFavorite }) {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setStations(res.data))
      .catch(err => console.error("Error cargando estaciones:", err));
  }, []);

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4 text-center ">
      <h1 className="mb-3">🎵 Radios de Venezuela</h1>
      <input
        type="text"
        placeholder="Buscar emisora..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3"
      />
      <div className="row">
        {filteredStations.map((station) => (
          <div key={station.stationuuid} className="col-md-6 mb-3">
            <div className="card p-3 d-flex justify-content-between align-items-center">
              <div>
                <strong>{station.name}</strong>
                <p className="text-muted">{station.country}</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => onSelectStation(station)}
                >
                  ▶️ Play
                </button>
                <button
                  className={`btn ${favorites.some(f => f.stationuuid === station.stationuuid) ? "btn-warning" : "btn-outline-secondary"}`}
                  onClick={() => toggleFavorite(station)}
                >
                  ⭐
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}