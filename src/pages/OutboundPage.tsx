import type { ColDef } from "ag-grid-community";

import DataTable from "../components/grid/DataTable";
import { outboundOrders } from "../data/mockData";

const columnDefs: ColDef[] = [
    { field: "outboundNo", headerName: "출고번호" },
    { field: "customer", headerName: "거래처" },
    { field: "warehouse", headerName: "출고창고" },
    { field: "shipDate", headerName: "출하일시" },
    { field: "status", headerName: "상태" },
    { field: "itemCount", headerName: "품목수" },
];

const OutboundPage = () => {
    return (
        <DataTable
            title="출고 관리"
            description="피킹, 송장발행, 출하대기 작업을 순차적으로 추적합니다."
            rowData={outboundOrders}
            columnDefs={columnDefs}
        />
    );
};

export default OutboundPage;
