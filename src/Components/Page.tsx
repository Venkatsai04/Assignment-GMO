import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";

const Page = ({ data }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowClick, setRowClick] = useState(true);

    return (
        <div>
            {/* Fields: title, place_of_origin, artist_display, inscriptions, date_start, date_end */}

            <DataTable value={data} selectionMode={rowClick ? undefined : 'multiple'}  tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                <Column field="title" header="Title" className="p-0 border-b" />
                <Column field="place_of_origin" header="Place of Origin" className="p-0 border-b" />
                <Column field="artist_display" header="Artist" className="p-0 border-b" />
                <Column field="inscriptions" header="Inscriptions" className="p-0 border-b" />
                <Column field="date_start" header="Start Date" className="p-0 border-b" />
                <Column field="date_end" header="End Date" className="p-0 border-b" />
            </DataTable>
        </div>
    );
};

export default Page;
