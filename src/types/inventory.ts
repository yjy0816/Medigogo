export type AppSection =
    | "dashboard"
    | "admin"
    | "basicInfo"
    | "stockControl"
    | "orderDelivery"
    | "statistics";

export type NavigationItem = {
    key: AppSection;
    label: string;
    description: string;
    badge?: string;
};

export type AdminSubSection =
    | "userManagement"
    | "programManagement"
    | "roleManagement"
    | "menuManagement"
    | "roleMenuPermissionManagement"
    | "loginHistoryManagement"
    | "userAccessPage";

export type AdminMenuItem = {
    key: AdminSubSection;
    label: string;
    description: string;
};

export type BasicInfoSubSection = "customerManagement" | "productManagement" | "contractManagement";

export type BasicInfoMenuItem = {
    key: BasicInfoSubSection;
    label: string;
    description: string;
};

export type StockControlSubSection = "inventoryStatus" | "inboundManagement" | "outboundManagement";

export type StockControlMenuItem = {
    key: StockControlSubSection;
    label: string;
    description: string;
};

export type OrderDeliverySubSection = "orderManagement" | "deliveryManagement";

export type OrderDeliveryMenuItem = {
    key: OrderDeliverySubSection;
    label: string;
    description: string;
};

export type StatisticsSubSection =
    | "orderStatistics"
    | "inboundStatistics"
    | "outboundStatistics"
    | "orderStatus"
    | "inboundStatus"
    | "monthlyStatus"
    | "yearlyStatus"
    | "unshippedOrDelayedStatus";

export type StatisticsMenuItem = {
    key: StatisticsSubSection;
    label: string;
    description: string;
};

export type SummaryTone = "primary" | "success" | "warning" | "danger";

export type SummaryCardModel = {
    title: string;
    value: string;
    change: string;
    tone: SummaryTone;
};

export type InventoryItem = {
    sku: string;
    productName: string;
    warehouse: string;
    zone: string;
    quantity: number;
    safetyStock: number;
    status: string;
    updatedAt: string;
};

export type InboundOrder = {
    inboundNo: string;
    supplier: string;
    warehouse: string;
    eta: string;
    status: string;
    itemCount: number;
};

export type OutboundOrder = {
    outboundNo: string;
    customer: string;
    warehouse: string;
    shipDate: string;
    status: string;
    itemCount: number;
};

export type ProductMaster = {
    sku: string;
    category: string;
    productName: string;
    unit: string;
    leadTimeDays: number;
    active: string;
};

export type CustomerInfo = {
    customerCode: string;
    customerName: string;
    type: string;
    manager: string;
    phone: string;
    status: string;
};

export type ContractInfo = {
    contractNo: string;
    customerName: string;
    productGroup: string;
    startDate: string;
    endDate: string;
    status: string;
};

export type WarehouseInfo = {
    code: string;
    name: string;
    manager: string;
    capacityRate: string;
    status: string;
};

export type ActivityLog = {
    time: string;
    title: string;
    detail: string;
};

export type AlertItem = {
    title: string;
    detail: string;
    actionLabel: string;
    actionSection: AppSection;
};

export type SettingGroup = {
    title: string;
    description: string;
    items: string[];
};
