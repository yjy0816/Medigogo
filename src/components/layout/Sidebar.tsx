import type {
    AdminMenuItem,
    AdminSubSection,
    BasicInfoMenuItem,
    BasicInfoSubSection,
    NavigationItem,
    AppSection,
    OrderDeliveryMenuItem,
    OrderDeliverySubSection,
    StatisticsMenuItem,
    StatisticsSubSection,
    StockControlMenuItem,
    StockControlSubSection,
} from "../../types/inventory";

type SidebarProps = {
    items: NavigationItem[];
    activeSection: AppSection;
    onSelect: (section: AppSection) => void;
    adminItems: AdminMenuItem[];
    activeAdminMenu: AdminSubSection;
    onSelectAdminMenu: (menu: AdminSubSection) => void;
    isAdminExpanded: boolean;
    onToggleAdminExpanded: () => void;
    basicInfoItems: BasicInfoMenuItem[];
    activeBasicInfoMenu: BasicInfoSubSection;
    onSelectBasicInfoMenu: (menu: BasicInfoSubSection) => void;
    isBasicInfoExpanded: boolean;
    onToggleBasicInfoExpanded: () => void;
    stockControlItems: StockControlMenuItem[];
    activeStockControlMenu: StockControlSubSection;
    onSelectStockControlMenu: (menu: StockControlSubSection) => void;
    isStockControlExpanded: boolean;
    onToggleStockControlExpanded: () => void;
    orderDeliveryItems: OrderDeliveryMenuItem[];
    activeOrderDeliveryMenu: OrderDeliverySubSection;
    onSelectOrderDeliveryMenu: (menu: OrderDeliverySubSection) => void;
    isOrderDeliveryExpanded: boolean;
    onToggleOrderDeliveryExpanded: () => void;
    statisticsItems: StatisticsMenuItem[];
    activeStatisticsMenu: StatisticsSubSection;
    onSelectStatisticsMenu: (menu: StatisticsSubSection) => void;
    isStatisticsExpanded: boolean;
    onToggleStatisticsExpanded: () => void;
};

const Sidebar = ({
    items,
    activeSection,
    onSelect,
    adminItems,
    activeAdminMenu,
    onSelectAdminMenu,
    isAdminExpanded,
    onToggleAdminExpanded,
    basicInfoItems,
    activeBasicInfoMenu,
    onSelectBasicInfoMenu,
    isBasicInfoExpanded,
    onToggleBasicInfoExpanded,
    stockControlItems,
    activeStockControlMenu,
    onSelectStockControlMenu,
    isStockControlExpanded,
    onToggleStockControlExpanded,
    orderDeliveryItems,
    activeOrderDeliveryMenu,
    onSelectOrderDeliveryMenu,
    isOrderDeliveryExpanded,
    onToggleOrderDeliveryExpanded,
    statisticsItems,
    activeStatisticsMenu,
    onSelectStatisticsMenu,
    isStatisticsExpanded,
    onToggleStatisticsExpanded,
}: SidebarProps) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand sidebar-brand-summary">
                <p className="sidebar-brand-label">오늘 점검 대상</p>
                <strong>안전재고 12품목 / 출고지연 3건</strong>
            </div>

            <nav className="sidebar-nav" aria-label="전체 메뉴 트리">
                {items.map((item) => (
                    <div key={item.key} className="nav-group">
                        <button
                            type="button"
                            className={
                                item.key === activeSection ? "nav-item is-active" : "nav-item"
                            }
                            onClick={() => {
                                onSelect(item.key);

                                if (item.key === "admin") {
                                    onToggleAdminExpanded();
                                }

                                if (item.key === "basicInfo") {
                                    onToggleBasicInfoExpanded();
                                }

                                if (item.key === "stockControl") {
                                    onToggleStockControlExpanded();
                                }

                                if (item.key === "orderDelivery") {
                                    onToggleOrderDeliveryExpanded();
                                }

                                if (item.key === "statistics") {
                                    onToggleStatisticsExpanded();
                                }
                            }}
                            aria-expanded={
                                item.key === "admin"
                                    ? isAdminExpanded
                                    : item.key === "basicInfo"
                                      ? isBasicInfoExpanded
                                      : item.key === "stockControl"
                                        ? isStockControlExpanded
                                        : item.key === "orderDelivery"
                                          ? isOrderDeliveryExpanded
                                          : item.key === "statistics"
                                            ? isStatisticsExpanded
                                            : undefined
                            }
                        >
                            <div>
                                <strong>{item.label}</strong>
                            </div>

                            <div className="nav-item-meta">
                                {item.badge ? <em>{item.badge}</em> : null}
                                {item.key === "admin" ? (
                                    <span
                                        className={
                                            isAdminExpanded ? "nav-caret is-expanded" : "nav-caret"
                                        }
                                        aria-hidden="true"
                                    >
                                        ▾
                                    </span>
                                ) : item.key === "basicInfo" ? (
                                    <span
                                        className={
                                            isBasicInfoExpanded
                                                ? "nav-caret is-expanded"
                                                : "nav-caret"
                                        }
                                        aria-hidden="true"
                                    >
                                        ▾
                                    </span>
                                ) : item.key === "stockControl" ? (
                                    <span
                                        className={
                                            isStockControlExpanded
                                                ? "nav-caret is-expanded"
                                                : "nav-caret"
                                        }
                                        aria-hidden="true"
                                    >
                                        ▾
                                    </span>
                                ) : item.key === "orderDelivery" ? (
                                    <span
                                        className={
                                            isOrderDeliveryExpanded
                                                ? "nav-caret is-expanded"
                                                : "nav-caret"
                                        }
                                        aria-hidden="true"
                                    >
                                        ▾
                                    </span>
                                ) : item.key === "statistics" ? (
                                    <span
                                        className={
                                            isStatisticsExpanded
                                                ? "nav-caret is-expanded"
                                                : "nav-caret"
                                        }
                                        aria-hidden="true"
                                    >
                                        ▾
                                    </span>
                                ) : null}
                            </div>
                        </button>

                        {item.key === "basicInfo" && isBasicInfoExpanded ? (
                            <div className="admin-subnav" aria-label="기본정보 하위 메뉴">
                                {basicInfoItems.map((basicInfoItem) => (
                                    <button
                                        key={basicInfoItem.key}
                                        type="button"
                                        className={
                                            basicInfoItem.key === activeBasicInfoMenu
                                                ? "admin-subnav-item is-active"
                                                : "admin-subnav-item"
                                        }
                                        onClick={() => {
                                            onSelect("basicInfo");
                                            onSelectBasicInfoMenu(basicInfoItem.key);
                                        }}
                                    >
                                        <strong>{basicInfoItem.label}</strong>
                                    </button>
                                ))}
                            </div>
                        ) : null}

                        {item.key === "stockControl" && isStockControlExpanded ? (
                            <div className="admin-subnav" aria-label="입출재고관리 하위 메뉴">
                                {stockControlItems.map((stockControlItem) => (
                                    <button
                                        key={stockControlItem.key}
                                        type="button"
                                        className={
                                            stockControlItem.key === activeStockControlMenu
                                                ? "admin-subnav-item is-active"
                                                : "admin-subnav-item"
                                        }
                                        onClick={() => {
                                            onSelect("stockControl");
                                            onSelectStockControlMenu(stockControlItem.key);
                                        }}
                                    >
                                        <strong>{stockControlItem.label}</strong>
                                    </button>
                                ))}
                            </div>
                        ) : null}

                        {item.key === "orderDelivery" && isOrderDeliveryExpanded ? (
                            <div className="admin-subnav" aria-label="주문배송관리 하위 메뉴">
                                {orderDeliveryItems.map((orderDeliveryItem) => (
                                    <button
                                        key={orderDeliveryItem.key}
                                        type="button"
                                        className={
                                            orderDeliveryItem.key === activeOrderDeliveryMenu
                                                ? "admin-subnav-item is-active"
                                                : "admin-subnav-item"
                                        }
                                        onClick={() => {
                                            onSelect("orderDelivery");
                                            onSelectOrderDeliveryMenu(orderDeliveryItem.key);
                                        }}
                                    >
                                        <strong>{orderDeliveryItem.label}</strong>
                                    </button>
                                ))}
                            </div>
                        ) : null}

                        {item.key === "statistics" && isStatisticsExpanded ? (
                            <div className="admin-subnav" aria-label="통계 하위 메뉴">
                                {statisticsItems.map((statisticsItem) => (
                                    <button
                                        key={statisticsItem.key}
                                        type="button"
                                        className={
                                            statisticsItem.key === activeStatisticsMenu
                                                ? "admin-subnav-item is-active"
                                                : "admin-subnav-item"
                                        }
                                        onClick={() => {
                                            onSelect("statistics");
                                            onSelectStatisticsMenu(statisticsItem.key);
                                        }}
                                    >
                                        <strong>{statisticsItem.label}</strong>
                                    </button>
                                ))}
                            </div>
                        ) : null}

                        {item.key === "admin" && isAdminExpanded ? (
                            <div className="admin-subnav" aria-label="Admin 하위 메뉴">
                                {adminItems.map((adminItem) => (
                                    <button
                                        key={adminItem.key}
                                        type="button"
                                        className={
                                            adminItem.key === activeAdminMenu
                                                ? "admin-subnav-item is-active"
                                                : "admin-subnav-item"
                                        }
                                        onClick={() => {
                                            onSelect("admin");
                                            onSelectAdminMenu(adminItem.key);
                                        }}
                                    >
                                        <strong>{adminItem.label}</strong>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
