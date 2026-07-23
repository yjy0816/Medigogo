import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import SectionCard from "../common/SectionCard";

type DataTableProps = {
    title: string;
    description?: string;
    rowData: Record<string, string | number>[];
    columnDefs: ColDef[];
    height?: number;
};

const DataTable = ({ title, description, rowData, columnDefs, height = 360 }: DataTableProps) => {
    return (
        <SectionCard title={title} description={description}>
            <div className="ag-theme-quartz grid-surface" style={{ height }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                        flex: 1,
                        minWidth: 120,
                    }}
                    pagination
                    paginationPageSize={5}
                />
            </div>
        </SectionCard>
    );
};

export default DataTable;
