import { useState, useEffect } from "react";
import Page, { type Artwork } from "./Page";

const Pages = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

 
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=10`
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
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("rowsLeftToSelect");
    });
  }, [currentPage]);


  const goToPage = (page: number) => {
    if (page < 1) setCurrentPage(totalPages);
    else if (page > totalPages) setCurrentPage(1);
    else setCurrentPage(page);
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

      <div className="flex space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Prev
        </button>

        {Array.from({ length: Math.min(totalPages, 20) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? "bg-indigo-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pages;
