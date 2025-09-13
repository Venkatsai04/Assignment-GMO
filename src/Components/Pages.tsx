import { useState, useEffect } from "react";
import Page from "./Page";

type Artwork = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
};

const Pages = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );
      const json = await res.json();
      setData(json.data);
      setTotalPages(json.pagination.total_pages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1) {
      setCurrentPage(totalPages); 
    } else if (page > totalPages) {
      setCurrentPage(1); 
    } else {
      setCurrentPage(page);
    }
  };


  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; 
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 border rounded ${
            i === currentPage
              ? "bg-indigo-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col p-10 gap-y-8 justify-center items-center">
      <div className="p-10 w-full">
        <Page
          data={data}
          loading={loading}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>

      {/* circular pagination */}
      <div className="flex space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>

      {/* selection panel */}
      <div className="mt-6 p-4 border rounded bg-gray-50 w-full">
        <h3 className="font-semibold mb-2">Selected Rows:</h3>
        {selectedIds.size === 0 ? (
          <p className="text-gray-500">No rows selected</p>
        ) : (
          <ul className="list-disc pl-6">
            {Array.from(selectedIds).map((id) => (
              <li key={id}>Artwork ID: {id}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pages;
