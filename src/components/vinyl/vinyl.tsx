import CreateVinyl from "./create-vinyl";
import VinylList from "./vinyl-list";

export default function Vinyl() {
  return (
    <div>
      <h1>Vinyl</h1>
      <div>
        <VinylList />
        <CreateVinyl />
      </div>
    </div>
  );
}