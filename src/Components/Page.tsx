import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";


const Page = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div>
      <DataTable
        value={data}
        tableStyle={{ minWidth: "50rem" }}
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

        <Column field="title" header="Title" className=" border-b" />
        <Column
          field="place_of_origin"
          header="Place of Origin"
          className=" border-b"
        />
        <Column
          field="artist_display"
          header="Artist"
          className=" border-b"
        />
        <Column
          field="inscriptions"
          header="Inscriptions"
          className=" border-b"
        />
        <Column
          field="date_start"
          header="Start Date"
          className=" border-b"
        />
        <Column field="date_end" header="End Date" className=" border-b" />
      </DataTable>
    </div>
  );
};

export default Page;
