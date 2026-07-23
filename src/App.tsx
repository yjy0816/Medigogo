import { useState } from "react";

import SectionCard from "./components/common/SectionCard";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import {
    adminMenuItems,
    basicInfoMenuItems,
    orderDeliveryMenuItems,
    navigationItems,
    statisticsMenuItems,
    stockControlMenuItems,
} from "./data/mockData";
import AdminPage from "./pages/AdminPage";
import BasicInfoPage from "./pages/BasicInfoPage";
import DashboardPage from "./pages/DashboardPage";
import InboundPage from "./pages/InboundPage";
import InventoryPage from "./pages/InventoryPage";
import LoginPage from "./pages/LoginPage";
import OrderDeliveryPage from "./pages/OrderDeliveryPage";
import OutboundPage from "./pages/OutboundPage";
import StatisticsPage from "./pages/StatisticsPage";
import type {
    AdminSubSection,
    AppSection,
    BasicInfoSubSection,
    OrderDeliverySubSection,
    StatisticsSubSection,
    StockControlSubSection,
} from "./types/inventory";
import "./App.css";

const pageMeta: Record<AppSection, { title: string; description: string }> = {
    dashboard: {
        title: "운영 대시보드",
        description: "오늘의 입출고와 재고 이상 상황을 한눈에 확인합니다.",
    },
    admin: {
        title: "Admin",
        description: "운영 정책, 사용자 권한, 승인 기준을 관리합니다.",
    },
    basicInfo: {
        title: "기본정보",
        description: "상품과 창고 기준정보를 한 곳에서 관리합니다.",
    },
    stockControl: {
        title: "입출재고관리",
        description: "입고, 출고, 현재고를 통합 기준으로 추적합니다.",
    },
    orderDelivery: {
        title: "주문배송관리",
        description: "주문 처리 상태와 배송 진행 상황을 관리합니다.",
    },
    statistics: {
        title: "통계",
        description: "운영 성과와 재고/배송 지표를 분석합니다.",
    },
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [activeSection, setActiveSection] = useState<AppSection>("dashboard");
    const [activeAdminMenu, setActiveAdminMenu] = useState<AdminSubSection>("userManagement");
    const [activeBasicInfoMenu, setActiveBasicInfoMenu] =
        useState<BasicInfoSubSection>("customerManagement");
    const [activeOrderDeliveryMenu, setActiveOrderDeliveryMenu] =
        useState<OrderDeliverySubSection>("orderManagement");
    const [activeStatisticsMenu, setActiveStatisticsMenu] =
        useState<StatisticsSubSection>("orderStatistics");
    const [activeStockControlMenu, setActiveStockControlMenu] =
        useState<StockControlSubSection>("inventoryStatus");
    const [isAdminExpanded, setIsAdminExpanded] = useState(false);
    const [isBasicInfoExpanded, setIsBasicInfoExpanded] = useState(false);
    const [isOrderDeliveryExpanded, setIsOrderDeliveryExpanded] = useState(false);
    const [isStatisticsExpanded, setIsStatisticsExpanded] = useState(false);
    const [isStockControlExpanded, setIsStockControlExpanded] = useState(false);

    const activeAdminMenuMeta = adminMenuItems.find((item) => item.key === activeAdminMenu);
    const activeBasicInfoMenuMeta = basicInfoMenuItems.find(
        (item) => item.key === activeBasicInfoMenu
    );
    const activeOrderDeliveryMenuMeta = orderDeliveryMenuItems.find(
        (item) => item.key === activeOrderDeliveryMenu
    );
    const activeStatisticsMenuMeta = statisticsMenuItems.find(
        (item) => item.key === activeStatisticsMenu
    );
    const activeStockControlMenuMeta = stockControlMenuItems.find(
        (item) => item.key === activeStockControlMenu
    );

    const headerTitle =
        activeSection === "admin" && activeAdminMenuMeta
            ? `${pageMeta.admin.title} > ${activeAdminMenuMeta.label}`
            : activeSection === "basicInfo" && activeBasicInfoMenuMeta
              ? `${pageMeta.basicInfo.title} > ${activeBasicInfoMenuMeta.label}`
              : activeSection === "orderDelivery" && activeOrderDeliveryMenuMeta
                ? `${pageMeta.orderDelivery.title} > ${activeOrderDeliveryMenuMeta.label}`
                : activeSection === "statistics" && activeStatisticsMenuMeta
                  ? `${pageMeta.statistics.title} > ${activeStatisticsMenuMeta.label}`
                  : activeSection === "stockControl" && activeStockControlMenuMeta
                    ? `${pageMeta.stockControl.title} > ${activeStockControlMenuMeta.label}`
                    : pageMeta[activeSection].title;

    const headerDescription =
        activeSection === "admin" && activeAdminMenuMeta
            ? activeAdminMenuMeta.description
            : activeSection === "basicInfo" && activeBasicInfoMenuMeta
              ? activeBasicInfoMenuMeta.description
              : activeSection === "orderDelivery" && activeOrderDeliveryMenuMeta
                ? activeOrderDeliveryMenuMeta.description
                : activeSection === "statistics" && activeStatisticsMenuMeta
                  ? activeStatisticsMenuMeta.description
                  : activeSection === "stockControl" && activeStockControlMenuMeta
                    ? activeStockControlMenuMeta.description
                    : pageMeta[activeSection].description;

    const handleTopMenuSelect = (section: AppSection) => {
        setActiveSection(section);
        setIsAdminExpanded(section === "admin");
        setIsBasicInfoExpanded(section === "basicInfo");
        setIsOrderDeliveryExpanded(section === "orderDelivery");
        setIsStatisticsExpanded(section === "statistics");
        setIsStockControlExpanded(section === "stockControl");
    };

    const handleLogin = (userId: string) => {
        setIsLoggedIn(true);
        setLoggedInUserId(userId);
        handleTopMenuSelect("dashboard");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoggedInUserId("");
        setActiveSection("dashboard");
        setIsAdminExpanded(false);
        setIsBasicInfoExpanded(false);
        setIsOrderDeliveryExpanded(false);
        setIsStatisticsExpanded(false);
        setIsStockControlExpanded(false);
    };

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    const renderPage = () => {
        switch (activeSection) {
            case "dashboard":
                return <DashboardPage onNavigate={setActiveSection} />;
            case "admin":
                return <AdminPage activeAdminMenu={activeAdminMenu} />;
            case "basicInfo":
                return <BasicInfoPage activeBasicInfoMenu={activeBasicInfoMenu} />;
            case "orderDelivery":
                return <OrderDeliveryPage activeOrderDeliveryMenu={activeOrderDeliveryMenu} />;
            case "statistics":
                return <StatisticsPage activeStatisticsMenu={activeStatisticsMenu} />;
            case "stockControl":
                switch (activeStockControlMenu) {
                    case "inventoryStatus":
                        return <InventoryPage />;
                    case "inboundManagement":
                        return <InboundPage />;
                    case "outboundManagement":
                        return <OutboundPage />;
                    default:
                        return <InventoryPage />;
                }
            default:
                return (
                    <SectionCard title="준비 중" description="해당 메뉴는 곧 연결됩니다.">
                        <p>추가 화면을 이 영역에 배치하면 됩니다.</p>
                    </SectionCard>
                );
        }
    };

    return (
        <div className="app-shell">
            <header className="top-navigation">
                <div className="top-brand" aria-label="메디로지틱스 배달관리 시스템">
                    <span className="top-brand-mark" aria-hidden="true">
                        <svg viewBox="0 0 36 36" role="presentation" focusable="false">
                            <rect x="5" y="12" width="26" height="18" rx="5" />
                            <path d="M7 14.5L18 6l11 8.5" />
                            <path d="M12 30V18" />
                            <path d="M24 30V18" />
                            <path d="M15 23h6" />
                        </svg>
                    </span>
                    <span className="top-brand-text">메디로지틱스 배달관리 시스템</span>
                </div>
                <nav className="top-navigation-list" aria-label="상위 메뉴">
                    {navigationItems.map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            className={
                                item.key === activeSection
                                    ? "top-navigation-item is-active"
                                    : "top-navigation-item"
                            }
                            onClick={() => handleTopMenuSelect(item.key)}
                        >
                            <span>{item.label}</span>
                            {item.badge ? <em>{item.badge}</em> : null}
                        </button>
                    ))}
                </nav>
                <div className="top-navigation-actions">
                    <span className="top-navigation-user">{loggedInUserId}님</span>
                    <button type="button" className="logout-button" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </header>

            <div className="app-body">
                <Sidebar
                    items={navigationItems}
                    activeSection={activeSection}
                    onSelect={setActiveSection}
                    adminItems={adminMenuItems}
                    activeAdminMenu={activeAdminMenu}
                    onSelectAdminMenu={setActiveAdminMenu}
                    isAdminExpanded={isAdminExpanded}
                    onToggleAdminExpanded={() => setIsAdminExpanded((prev) => !prev)}
                    basicInfoItems={basicInfoMenuItems}
                    activeBasicInfoMenu={activeBasicInfoMenu}
                    onSelectBasicInfoMenu={setActiveBasicInfoMenu}
                    isBasicInfoExpanded={isBasicInfoExpanded}
                    onToggleBasicInfoExpanded={() => setIsBasicInfoExpanded((prev) => !prev)}
                    orderDeliveryItems={orderDeliveryMenuItems}
                    activeOrderDeliveryMenu={activeOrderDeliveryMenu}
                    onSelectOrderDeliveryMenu={setActiveOrderDeliveryMenu}
                    isOrderDeliveryExpanded={isOrderDeliveryExpanded}
                    onToggleOrderDeliveryExpanded={() =>
                        setIsOrderDeliveryExpanded((prev) => !prev)
                    }
                    statisticsItems={statisticsMenuItems}
                    activeStatisticsMenu={activeStatisticsMenu}
                    onSelectStatisticsMenu={setActiveStatisticsMenu}
                    isStatisticsExpanded={isStatisticsExpanded}
                    onToggleStatisticsExpanded={() => setIsStatisticsExpanded((prev) => !prev)}
                    stockControlItems={stockControlMenuItems}
                    activeStockControlMenu={activeStockControlMenu}
                    onSelectStockControlMenu={setActiveStockControlMenu}
                    isStockControlExpanded={isStockControlExpanded}
                    onToggleStockControlExpanded={() => setIsStockControlExpanded((prev) => !prev)}
                />
                <div className="app-main">
                    <Header title={headerTitle} description={headerDescription} />
                    <main className="app-content">{renderPage()}</main>
                </div>
            </div>
        </div>
    );
}

export default App;
