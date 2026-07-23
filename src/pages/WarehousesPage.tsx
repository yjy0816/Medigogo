import type { ColDef } from "ag-grid-community";

import DataTable from "../components/grid/DataTable";
import { warehouses } from "../data/mockData";

const columnDefs: ColDef[] = [
    { field: "code", headerName: "창고코드" },
    { field: "name", headerName: "창고명" },
    { field: "manager", headerName: "담당자" },
    { field: "capacityRate", headerName: "적치율" },
    { field: "status", headerName: "상태" },
];

const WarehousesPage = () => {
    return (
        <DataTable
            title="창고 관리"
            description="창고별 적치율과 운영 상태를 점검합니다."
            rowData={warehouses}
            columnDefs={columnDefs}
        />
    );
};

export default WarehousesPage;
