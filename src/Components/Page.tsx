import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Page = ({ data }) => {
    
    console.log(data);
        
    return (
        <div>
            {/* Fields: title, place_of_origin, artist_display, inscriptions, date_start, date_end */}
            <DataTable 
                value={data} 
                tableStyle={{ minWidth: '50rem' }}

            >
                <Column field="title" header="Title" ></Column>
                <Column field="place_of_origin" header="Place of Origin" ></Column>
                <Column field="artist_display" header="Artist" ></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Start Date" ></Column>
                <Column field="date_end" header="End Date" ></Column>
            </DataTable>
        </div>
    )
}

export default Page