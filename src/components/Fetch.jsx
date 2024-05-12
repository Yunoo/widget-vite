import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getWindDirection } from "../utils/wind";

export default ({ city }) => {
  const [searchText, setSearchText] = useState(city);
  const [weatherData, setWeatherData] = useState([]);

  // const location = useLocation();
  const navigate = useNavigate();

  // Update QS params when searching
  const updateNavigation = () => {
    // const params = new URLSearchParams();
    // params.set("city", searchText);
    // const newUrl = `${window.location.pathname}?${params.toString()}`;
    // window.history.pushState({}, "", newUrl);
    const queryString = `?city=${searchText}`;
    navigate(`/${queryString}`, { replace: true });
  };

  const fetchWeatherData = async (ignore) => {
    if (!searchText || searchText === "") return;
    try {
      const apiKey = "032b6100f98b3d5392916fbf2ae7339c";
      const url = new URL("https://api.openweathermap.org/data/2.5/weather");
      url.search = `?q=${searchText}&units=metric&appid=${apiKey}`;
      if (ignore) return;
      const response = await fetch(url);
      const json = await response.json();
      setWeatherData({ ...json });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetchWeatherData(ignore);
    return () => {
      console.log(true);
      ignore = true;
    };
  }, []);

  const handleInputChange = (event) => {
    const name = event.target.value;
    setSearchText(name);
  };

  const handleSearchClick = () => {
    updateNavigation();
    fetchWeatherData();
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
                  value={searchText}
                  placeholder="City"
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearchClick();
                      // TODO: Set loading
                      // TODO: Set errors
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearchClick(e);
                  // TODO: Set loading
                  // TODO: Set errors
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
