import SectionCard from "../components/common/SectionCard";
import DataTable from "../components/grid/DataTable";
import { activityLogs, outboundOrders } from "../data/mockData";
import type { OrderDeliverySubSection } from "../types/inventory";
import type { ColDef } from "ag-grid-community";

const columnDefs: ColDef[] = [
    { field: "outboundNo", headerName: "주문번호" },
    { field: "customer", headerName: "거래처" },
    { field: "warehouse", headerName: "출고창고" },
    { field: "shipDate", headerName: "배송예정" },
    { field: "status", headerName: "진행상태" },
    { field: "itemCount", headerName: "품목수" },
];

type OrderDeliveryPageProps = {
    activeOrderDeliveryMenu: OrderDeliverySubSection;
};

const OrderDeliveryPage = ({ activeOrderDeliveryMenu }: OrderDeliveryPageProps) => {
    return (
        <div className="page-stack">
            {activeOrderDeliveryMenu === "orderManagement" ? (
                <DataTable
                    title="주문관리"
                    description="주문 접수부터 출고 대기까지의 진행 상태를 확인합니다."
                    rowData={outboundOrders}
                    columnDefs={columnDefs}
                />
            ) : (
                <SectionCard title="배송관리" description="현장 대응이 필요한 주문 이슈입니다.">
                    <div className="timeline-list">
                        {activityLogs.map((log) => (
                            <article key={`${log.time}-${log.title}`} className="timeline-item">
                                <span>{log.time}</span>
                                <div>
                                    <strong>{log.title}</strong>
                                    <p>{log.detail}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </SectionCard>
            )}
        </div>
    );
};

export default OrderDeliveryPage;
