
import { Search, SlidersHorizontal } from "lucide-react";

function CountrySearch({
  searchTerm,
  onSearch,
  selectedRegion,
  setSelectedRegion,
}) {
  return (
    <form
      className="search-toolbar"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="search-input">
        <Search size={19} />

        <input
          type="search"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={onSearch}
          aria-label="Search countries by name"
        />
      </label>

      <label className="region-select">
        <SlidersHorizontal size={17} />

        <select
          value={selectedRegion}
          onChange={(event) => setSelectedRegion(event.target.value)}
          aria-label="Filter countries by region"
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antarctic</option>
        </select>
      </label>
    </form>
  );
}

export default CountrySearch;