import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
}: {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}) => (
  <div className="mt-4 flex justify-center items-center gap-2">
    <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded">
      Prev
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
      >
        {i + 1}
      </button>
    ))}
    <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 border rounded">
      Next
    </button>
  </div>
);

export default Pagination;
