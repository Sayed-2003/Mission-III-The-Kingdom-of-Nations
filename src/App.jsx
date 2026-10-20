
import { useEffect, useState } from "react";
import {
  Globe2,
  Compass,
  Users,
  Crown,
  RotateCcw,
} from "lucide-react";

import CountrySearch from "./components/CountrySearch.jsx";
import CountryList from "./components/CountryList.jsx";

const API_URL =
  import.meta.env.VITE_COUNTRIES_API_URL 
const API_KEY =
  import.meta.env.VITE_COUNTRIES_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchCountries() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          const message =
            result.errors?.[0]?.message ||
            `API error: ${response.status}`;

          throw new Error(message);
        }

        const data = result.data?.objects;

        if (!Array.isArray(data)) {
          throw new Error(
            "The API response did not contain a country list."
          );
        }

        const formattedCountries = data.map((country) => {
          const alpha2 = country.codes?.alpha_2?.toLowerCase();

          return {
            name: {
              common: country.names?.common || "Unknown",
            },
            capital: Array.isArray(country.capitals)
              ? country.capitals
              : country.capitals
                ? [country.capitals]
                : [],
            region: country.region || "Other",
            population: country.population ?? 0,
            flags: {
              emoji: country.flag?.emoji || "🏳️",
              png: alpha2
                ? `https://flagcdn.com/w320/${alpha2}.png`
                : "",
              svg: alpha2
                ? `https://flagcdn.com/${alpha2}.svg`
                : "",
              alt: `Flag of ${country.names?.common || "Unknown"}`,
            },
            cca3: country.codes?.alpha_3,
          };
        });

        if (!ignore) {
          setCountries(formattedCountries);
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);

        if (!ignore) {
          setError(
            err.message ||
            "The Royal Archives could not be reached. Please try again."
          );
          setCountries([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCountries();

    return () => {
      ignore = true;
    };
  }, []);

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleReset() {
    setSearchTerm("");
    setSelectedRegion("All");
  }

  const filteredCountries = countries.filter((country) => {
    const name = country.name?.common || "";

    const matchesName = name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesRegion =
      selectedRegion === "All" ||
      country.region === selectedRegion;

    return matchesName && matchesRegion;
  });

  return (
    <div className="app">
      <header className="site-header">
        <a href="/" className="brand">
          <span className="brand-icon">
            <Crown size={22} />
          </span>

          <span>
            <strong>CODORIA</strong>
            <small>THE ROYAL ATLAS</small>
          </span>
        </a>

        <div className="header-label">
          <Globe2 size={16} />
          <span>MISSION III</span>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-icon">
            <Compass size={30} />
          </div>

          <p className="eyebrow">
            THE ROYAL CARTOGRAPHER'S ARCHIVES
          </p>

          <h1>
            The Kingdom of <span>Nations</span>
          </h1>

          <p className="hero-description">
            Discover the lands, people, and capitals of our world.
            Search the royal records and explore every corner of the globe.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <Globe2 size={19} />
              <div>
                <strong>{loading ? "..." : countries.length}</strong>
                <span>Countries loaded</span>
              </div>
            </div>

            <div className="stat">
              <Users size={19} />
              <div>
                <strong>
                  {loading
                    ? "..."
                    : filteredCountries.length.toLocaleString()}
                </strong>
                <span>Found</span>
              </div>
            </div>
          </div>
        </section>

        <section className="explorer">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE THE REALM</p>
              <h2>Country Directory</h2>
            </div>

            <button
              className="reset-button"
              onClick={handleReset}
              type="button"
            >
              <RotateCcw size={15} />
              Reset filters
            </button>
          </div>

          <CountrySearch
            searchTerm={searchTerm}
            onSearch={handleSearch}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />

          {loading && (
            <div className="status-message" role="status">
              <div className="loader" />
              <p>Opening the Royal Archives...</p>
            </div>
          )}

          {!loading && error && (
            <div
              className="status-message error-message"
              role="alert"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <CountryList countries={filteredCountries} />
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>✦ THE KINGDOM OF NATIONS ✦</p>
        <span>Powered by the REST Countries API</span>
      </footer>
    </div>
  );
}

export default App;