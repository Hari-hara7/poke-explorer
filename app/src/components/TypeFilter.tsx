import React from 'react';

const TypeFilter = ({
  types,
  selectedTypes,
  setSelectedTypes,
}: {
  types: string[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}) => {
  const toggleType = (type: string) => {
    setSelectedTypes(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {types.map((type) => (
        <button
          key={type}
          className={`px-3 py-1 rounded-full border ${
            selectedTypes.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => toggleType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
