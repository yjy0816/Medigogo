import SummaryCard from "../components/common/SummaryCard";
import SectionCard from "../components/common/SectionCard";
import { activityLogs, alertItems, inventoryItems, outboundOrders } from "../data/mockData";
import type { AppSection } from "../types/inventory";

type DashboardPageProps = {
    onNavigate: (section: AppSection) => void;
};

const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
    const shortageItems = inventoryItems.filter((item) => item.quantity <= item.safetyStock);
    const todayOrderCount = outboundOrders.length;
    const todayShortageCount = shortageItems.length;
    const unshippedCount = outboundOrders.filter((order) => order.status !== "출고완료").length;

    const dashboardCards = [
        {
            title: "오늘 주문",
            value: `${todayOrderCount}건`,
            change: "오늘 접수된 출고 주문 기준",
            tone: "primary" as const,
        },
        {
            title: "오늘 재고부족",
            value: `${todayShortageCount}품목`,
            change: "안전재고 이하 품목 수",
            tone: "danger" as const,
        },
        {
            title: "미출고건수",
            value: `${unshippedCount}건`,
            change: "출고완료 전 주문 건수",
            tone: "warning" as const,
        },
    ];

    return (
        <div className="page-stack">
            <div className="summary-grid">
                {dashboardCards.map((card) => (
                    <SummaryCard key={card.title} {...card} />
                ))}
            </div>

            <div className="panel-grid">
                <SectionCard
                    title="오늘의 운영 포인트"
                    description="우선 확인해야 할 현장 이슈입니다."
                >
                    <div className="alert-list">
                        {alertItems.map((alert) => (
                            <button
                                key={alert.title}
                                type="button"
                                className="alert-item"
                                onClick={() => onNavigate(alert.actionSection)}
                            >
                                <strong>{alert.title}</strong>
                                <p>{alert.detail}</p>
                                <span>{alert.actionLabel}</span>
                            </button>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard
                    title="실시간 작업 로그"
                    description="입출고와 재고 이상 이벤트를 추적합니다."
                >
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
            </div>

            <SectionCard
                title="안전재고 미달 품목"
                description="즉시 발주 또는 이동이 필요한 품목 목록입니다."
            >
                <div className="shortage-list">
                    {shortageItems.map((item) => (
                        <article key={item.sku} className="shortage-item">
                            <div>
                                <strong>{item.productName}</strong>
                                <p>
                                    {item.warehouse} / {item.zone}
                                </p>
                            </div>
                            <div>
                                <strong>{item.quantity} EA</strong>
                                <p>안전재고 {item.safetyStock} EA</p>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
};

export default DashboardPage;
