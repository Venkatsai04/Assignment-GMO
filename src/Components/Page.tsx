import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export type Artwork = {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
};

type Props = {
  data: Artwork[];
  loading: boolean;
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
};

const Page = ({ data, loading, selectedIds, setSelectedIds }: Props) => {
  const [showBox, setShowBox] = useState(false);
  const [count, setCount] = useState<number | "">("");


  const selectedRows = data.filter((row) => selectedIds.has(row.id));


  const handleSelection = (e: { value: Artwork[] }) => {
    const newSet = new Set(selectedIds);
    data.forEach((row) => newSet.delete(row.id));
    e.value.forEach((row) => newSet.add(row.id));
    setSelectedIds(newSet);
  };


  const applyBulkSelect = () => {
    if (count === "" || count <= 0) return;

    let updated = new Set(selectedIds);
    let left = count;

    for (let i = 0; i < data.length && left > 0; i++) {
      updated.add(data[i].id);
      left--;
    }

    setSelectedIds(updated);
    localStorage.setItem("rowsLeftToSelect", left.toString());
    setShowBox(false);
    setCount("");
  };


  useEffect(() => {
    const rowsLeft = parseInt(
      localStorage.getItem("rowsLeftToSelect") || "0",
      10
    );
    if (rowsLeft > 0) {
      let updated = new Set(selectedIds);
      let left = rowsLeft;

      for (let i = 0; i < data.length && left > 0; i++) {
        updated.add(data[i].id);
        left--;
      }

      setSelectedIds(updated);
      localStorage.setItem("rowsLeftToSelect", left.toString());
    }
  }, [data]);


  const renderHeader = () => (
    <div className="flex items-center gap-2 relative">
      <span>Select</span>
      <button
        onClick={() => setShowBox(!showBox)}
        className="text-gray-600 hover:text-black"
      >
        ▼
      </button>

      {showBox && (
        <div className="absolute top-8 left-0 bg-white border shadow p-3 rounded z-10">
          <input
            type="number"
            className="border px-2 py-1 mr-2"
            value={count}
            placeholder="How many?"
            onChange={(e) =>
              setCount(e.target.value === "" ? "" : parseInt(e.target.value))
            }
          />
          <button
            onClick={applyBulkSelect}
            className="bg-gray-500 text-white px-3 py-1 rounded mt-2"
          >
            Select
          </button>
        </div>
      )}
    </div>
  );

  const columns = [
    { field: "title", header: "Title" },
    { field: "place_of_origin", header: "Place of Origin" },
    { field: "artist_display", header: "Artist" },
    { field: "inscriptions", header: "Inscriptions" },
    { field: "date_start", header: "Start Date" },
    { field: "date_end", header: "End Date" },
  ];

  return (
    <DataTable<Artwork>
      value={data}
      loading={loading}
      selection={selectedRows}
      onSelectionChange={handleSelection}
      dataKey="id"
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column selectionMode="multiple" header={renderHeader} headerStyle={{ width: "5rem" }} />
      {columns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} />
      ))}
    </DataTable>
  );
};

export default Page;
