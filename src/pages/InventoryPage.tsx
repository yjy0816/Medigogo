import type { ColDef } from "ag-grid-community";

import DataTable from "../components/grid/DataTable";
import { inventoryItems } from "../data/mockData";

const columnDefs: ColDef[] = [
    { field: "sku", headerName: "SKU" },
    { field: "productName", headerName: "품목명" },
    { field: "warehouse", headerName: "창고" },
    { field: "zone", headerName: "구역" },
    { field: "quantity", headerName: "현재고" },
    { field: "safetyStock", headerName: "안전재고" },
    { field: "status", headerName: "상태" },
    { field: "updatedAt", headerName: "최종변경" },
];

const InventoryPage = () => {
    return (
        <DataTable
            title="재고 현황"
            description="창고별 재고와 안전재고 기준을 한 화면에서 관리합니다."
            rowData={inventoryItems}
            columnDefs={columnDefs}
            height={420}
        />
    );
};

export default InventoryPage;
