import "./App.css";
import Fetch from "./components/Fetch";

const DEFAULT_CITY = "Copenhagen";
let city: string | null;

if (typeof window !== "undefined") {
  const queryParams = new URLSearchParams(location.search);
  city = queryParams.get("city") || DEFAULT_CITY;
}

function App() {
  return (
    <div>
      <Fetch city={city} />
    </div>
  );
}

export default App;
