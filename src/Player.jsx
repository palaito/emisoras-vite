export default function Player({ currentStation }) {
  if (!currentStation) return null;

  return (
    <div className="fixed-bottom bg-dark text-white p-3 d-flex justify-content-between align-items-center">
      <strong>{currentStation.name}</strong>
      <audio controls autoPlay src={currentStation.url_resolved} className="w-50" />
    </div>
  );
}