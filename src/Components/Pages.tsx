import Page from "./Page";
import { useState, useEffect } from "react";

const Pages = () => {
  const [Data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const fetchData = async () => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${currentPage}`
    );
    const data = await response.json();

    if (data) {
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {Data ? (
        <div className="flex flex-col p-10 gap-y-8 justify-center items-center">
          <div className="p-10">
            <Page data={Data.data} />
          </div>

          {/* Pagination */}
          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">Loading...</div>
      )}
    </>
  );
};

export default Pages;
