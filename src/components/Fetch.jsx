import { useState, useEffect } from "react";

export default ({ city = "Copenhagen" }) => {
  const [text, setCity] = useState(city);
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const apiKey = "032b6100f98b3d5392916fbf2ae7339c";
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.search = `?q=${text}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      setWeatherData({ ...json });
    } catch (e) {
      console.error(e);
    }
  };

  // example response
  /* {
    coord: { lon: 12.5655, lat: 55.6759 },
    weather: [
      { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
    ],
    base: "stations",
    main: {
      temp: 285.87,
      feels_like: 285.34,
      temp_min: 284.76,
      temp_max: 288.37,
      pressure: 1025,
      humidity: 82,
    },
    visibility: 10000,
    wind: { speed: 2.57, deg: 50 },
    clouds: { all: 20 },
    dt: 1715415614,
    sys: {
      type: 1,
      id: 1575,
      country: "DK",
      sunrise: 1715396730,
      sunset: 1715454408,
    },
    timezone: 7200,
    id: 2618425,
    name: "Copenhagen",
    cod: 200,
  };
  */

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWindDirection = (angle) => {
    const directions = [
      "↓ N",
      "↙ NE",
      "← E",
      "↖ SE",
      "↑ S",
      "↗ SW",
      "→ W",
      "↘ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  };

  const handleInputChange = (event) => {
    const name = event.target.value;
    console.log(name);
    if (name || name === "") setCity(name);
  };

  return (
    <div className="widget">
      <div className="panel panel-info">
        <div className="panel-heading">
          Weather in <b>{weatherData?.name}</b>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            Temperature: <b>{weatherData?.main?.temp}°C</b>
          </li>
          <li className="list-group-item">
            Humidity: <b>{weatherData?.main?.humidity}</b>
          </li>
          <li className="list-group-item">
            Wind:{" "}
            <b>
              {weatherData?.wind?.speed} m/s{" "}
              {getWindDirection(weatherData?.wind?.deg)}
            </b>
          </li>
          <li className="list-group-item">
            <form className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={text}
                  placeholder="City"
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  fetchWeatherData();
                  e.preventDefault();
                }}
                className="btn btn-default"
              >
                Search
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};
