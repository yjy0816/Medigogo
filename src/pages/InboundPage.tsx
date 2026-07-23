import type { ColDef } from "ag-grid-community";

import DataTable from "../components/grid/DataTable";
import { inboundOrders } from "../data/mockData";

const columnDefs: ColDef[] = [
    { field: "inboundNo", headerName: "입고번호" },
    { field: "supplier", headerName: "공급사" },
    { field: "warehouse", headerName: "입고창고" },
    { field: "eta", headerName: "도착예정" },
    { field: "status", headerName: "상태" },
    { field: "itemCount", headerName: "품목수" },
];

const InboundPage = () => {
    return (
        <DataTable
            title="입고 관리"
            description="입고 예정, 검수중, 상차완료 상태를 기준으로 흐름을 관리합니다."
            rowData={inboundOrders}
            columnDefs={columnDefs}
        />
    );
};

export default InboundPage;
