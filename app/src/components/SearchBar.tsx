interface Props {
    search: string;
    setSearch: (search: string) => void;
  }
  
  const SearchBar = ({ search, setSearch }: Props) => {
    return (
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-4 py-2 w-full mb-4"
      />
    );
  };
  
  export default SearchBar;
  