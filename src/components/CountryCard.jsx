
import { MapPin, Users, ArrowUpRight } from "lucide-react";

function CountryCard({ country }) {
  const rawName = country.name;
  const name =
    typeof rawName === "string"
      ? rawName
      : rawName?.common ||
      rawName?.name ||
      "Unknown Country";

  const rawCapital = country.capital ?? country.capitals;
  const firstCapital = Array.isArray(rawCapital)
    ? rawCapital[0]
    : rawCapital;

  const capital =
    typeof firstCapital === "string"
      ? firstCapital
      : firstCapital?.name ||
      "No capital listed";

  const rawRegion = country.region;
  const region =
    typeof rawRegion === "string"
      ? rawRegion
      : rawRegion?.name || "Unknown region";

  const rawPopulation = country.population;
  const population =
    typeof rawPopulation === "number"
      ? rawPopulation
      : Number(rawPopulation) || 0;

  const rawFlags = country.flags ?? country.flag;
  const flag =
    rawFlags?.png ||
    rawFlags?.svg ||
    rawFlags?.url ||
    "";

  const flagDescription =
    rawFlags?.alt ||
    `Flag of ${name}`;

  const countryCode =
    country.cca3 ||
    country.codes?.alpha_3 ||
    country.cca2 ||
    country.codes?.alpha_2 ||
    "—";

  return (
    <article className="country-card">
      <div className="flag-container">
        {flag ? (
          <img
            className="country-flag"
            src={flag}
            alt={flagDescription}
            loading="lazy"
          />
        ) : (
          <div className="flag-placeholder">
            <span>
              {rawFlags?.emoji || "🏳️"} Flag unavailable
            </span>
          </div>
        )}

        <span className="region-badge">
          {region}
        </span>
      </div>

      <div className="country-info">
        <div className="country-title">
          <div>
            <p className="country-code">
              {countryCode}
            </p>

            <h3>{name}</h3>
          </div>

          <ArrowUpRight
            size={19}
            className="card-arrow"
            aria-hidden="true"
          />
        </div>

        <div className="country-detail">
          <MapPin size={16} aria-hidden="true" />

          <span>
            <strong>Capital:</strong> {capital}
          </span>
        </div>

        <div className="country-detail">
          <Users size={16} aria-hidden="true" />

          <span>
            <strong>Population:</strong>{" "}
            {population.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
}

export default CountryCard;