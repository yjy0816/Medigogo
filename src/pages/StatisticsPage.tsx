import SectionCard from "../components/common/SectionCard";
import SummaryCard from "../components/common/SummaryCard";
import { inboundOrders, inventoryItems, outboundOrders, summaryCards } from "../data/mockData";
import type { StatisticsSubSection } from "../types/inventory";

type StatisticsPageProps = {
    activeStatisticsMenu: StatisticsSubSection;
};

const StatisticsPage = ({ activeStatisticsMenu }: StatisticsPageProps) => {
    const normalInventoryCount = inventoryItems.filter((item) => item.status === "정상").length;
    const riskInventoryCount = inventoryItems.length - normalInventoryCount;
    const inboundTotal = inboundOrders.reduce((sum, order) => sum + order.itemCount, 0);
    const outboundTotal = outboundOrders.reduce((sum, order) => sum + order.itemCount, 0);

    const viewTitleMap: Record<StatisticsSubSection, string> = {
        orderStatistics: "주문통계",
        inboundStatistics: "입고통계",
        outboundStatistics: "출고통계",
        orderStatus: "주문현황",
        inboundStatus: "입고현황",
        monthlyStatus: "월별현황",
        yearlyStatus: "년도별현황",
        unshippedOrDelayedStatus: "미출고/지연현황",
    };

    const viewDescriptionMap: Record<StatisticsSubSection, string> = {
        orderStatistics: "주문 발생량과 처리 흐름을 요약합니다.",
        inboundStatistics: "입고 발생량과 처리 흐름을 요약합니다.",
        outboundStatistics: "출고 발생량과 처리 흐름을 요약합니다.",
        orderStatus: "현재 주문 상태를 확인합니다.",
        inboundStatus: "현재 입고 상태를 확인합니다.",
        monthlyStatus: "월별 운영 추이를 확인합니다.",
        yearlyStatus: "년도별 운영 추이를 확인합니다.",
        unshippedOrDelayedStatus: "미출고 및 지연 건을 확인합니다.",
    };

    const selectedViewTitle = viewTitleMap[activeStatisticsMenu];
    const selectedViewDescription = viewDescriptionMap[activeStatisticsMenu];

    return (
        <div className="page-stack">
            <SectionCard title={selectedViewTitle} description={selectedViewDescription}>
                {activeStatisticsMenu === "orderStatistics" ? (
                    <div className="summary-grid">
                        {summaryCards.map((card) => (
                            <SummaryCard key={card.title} {...card} />
                        ))}
                    </div>
                ) : activeStatisticsMenu === "inboundStatistics" ? (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>{inboundTotal}</strong>
                            <span>입고 예정 품목 수</span>
                        </article>
                        <article className="metric-item">
                            <strong>{inboundOrders.length}</strong>
                            <span>입고 예정 건수</span>
                        </article>
                    </div>
                ) : activeStatisticsMenu === "outboundStatistics" ? (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>{outboundTotal}</strong>
                            <span>출고 예정 품목 수</span>
                        </article>
                        <article className="metric-item">
                            <strong>{outboundOrders.length}</strong>
                            <span>출고 예정 건수</span>
                        </article>
                    </div>
                ) : activeStatisticsMenu === "orderStatus" ? (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>
                                {outboundOrders.filter((order) => order.status === "피킹중").length}
                            </strong>
                            <span>피킹중</span>
                        </article>
                        <article className="metric-item">
                            <strong>
                                {outboundOrders.filter((order) => order.status !== "피킹중").length}
                            </strong>
                            <span>기타 진행상태</span>
                        </article>
                    </div>
                ) : activeStatisticsMenu === "inboundStatus" ? (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>
                                {inboundOrders.filter((order) => order.status === "검수중").length}
                            </strong>
                            <span>검수중</span>
                        </article>
                        <article className="metric-item">
                            <strong>
                                {inboundOrders.filter((order) => order.status !== "검수중").length}
                            </strong>
                            <span>기타 진행상태</span>
                        </article>
                    </div>
                ) : activeStatisticsMenu === "monthlyStatus" ? (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>7월</strong>
                            <span>현재 선택 월</span>
                        </article>
                        <article className="metric-item">
                            <strong>{normalInventoryCount}</strong>
                            <span>정상 재고 품목</span>
                        </article>
                    </div>
                ) : activeStatisticsMenu === "yearlyStatus" ? (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>2026</strong>
                            <span>현재 기준 연도</span>
                        </article>
                        <article className="metric-item">
                            <strong>{riskInventoryCount}</strong>
                            <span>주의/부족 품목</span>
                        </article>
                    </div>
                ) : (
                    <div className="metric-list">
                        <article className="metric-item">
                            <strong>
                                {
                                    outboundOrders.filter((order) => order.status !== "송장발행")
                                        .length
                                }
                            </strong>
                            <span>미출고 건수</span>
                        </article>
                        <article className="metric-item">
                            <strong>
                                {
                                    outboundOrders.filter((order) => order.status === "출하대기")
                                        .length
                                }
                            </strong>
                            <span>지연 의심 건수</span>
                        </article>
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

export default StatisticsPage;
