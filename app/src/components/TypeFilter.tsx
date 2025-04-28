interface Props {
    types: string[];
    selectedType: string;
    setSelectedType: (type: string) => void;
  }
  
  const TypeFilter = ({ types, selectedType, setSelectedType }: Props) => {
    return (
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border rounded px-4 py-2 w-full mb-4"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    );
  };
  
  export default TypeFilter;
  