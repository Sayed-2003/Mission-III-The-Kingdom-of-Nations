
import { SearchX } from "lucide-react";
import CountryCard from "./CountryCard.jsx";

function CountryList({ countries }) {
  if (countries.length === 0) {
    return (
      <div className="empty-state">
        <SearchX size={36} />
        <h3>No countries found</h3>
        <p>
          No records match your search. Try another country name
          or choose a different region.
        </p>
      </div>
    );
  }

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3 || country.name?.common}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryList;