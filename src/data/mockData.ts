import type {
    AdminMenuItem,
    ActivityLog,
    AlertItem,
    BasicInfoMenuItem,
    ContractInfo,
    CustomerInfo,
    InboundOrder,
    InventoryItem,
    NavigationItem,
    OutboundOrder,
    ProductMaster,
    OrderDeliveryMenuItem,
    SettingGroup,
    StockControlMenuItem,
    StatisticsMenuItem,
    SummaryCardModel,
    WarehouseInfo,
} from "../types/inventory";

export const navigationItems: NavigationItem[] = [
    { key: "dashboard", label: "대시보드", description: "운영 현황" },
    { key: "basicInfo", label: "기본정보", description: "상품/창고 기준정보" },
    { key: "stockControl", label: "입출재고관리", description: "입고, 출고, 재고", badge: "9" },
    { key: "orderDelivery", label: "주문배송관리", description: "주문 처리와 배송", badge: "3" },
    { key: "statistics", label: "통계", description: "운영 분석과 지표" },
    { key: "admin", label: "Admin", description: "권한 및 운영설정" },
];

export const adminMenuItems: AdminMenuItem[] = [
    {
        key: "userManagement",
        label: "사용자관리",
        description: "계정 등록과 상태 관리",
    },
    {
        key: "programManagement",
        label: "프로그램관리",
        description: "화면 및 기능 등록",
    },
    {
        key: "roleManagement",
        label: "역할관리",
        description: "권한 역할 그룹 관리",
    },
    {
        key: "menuManagement",
        label: "메뉴관리",
        description: "전체 메뉴 구조 관리",
    },
    {
        key: "roleMenuPermissionManagement",
        label: "역할메뉴권한관리",
        description: "역할별 메뉴 권한 설정",
    },
    {
        key: "loginHistoryManagement",
        label: "로그인이력관리",
        description: "접속 및 로그인 기록 조회",
    },
    {
        key: "userAccessPage",
        label: "사용자접근페이지",
        description: "사용자별 접근 화면 관리",
    },
];

export const basicInfoMenuItems: BasicInfoMenuItem[] = [
    {
        key: "customerManagement",
        label: "거래처관리",
        description: "",
    },
    {
        key: "productManagement",
        label: "제품관리",
        description: "",
    },
    {
        key: "contractManagement",
        label: "계약관리",
        description: "",
    },
];

export const stockControlMenuItems: StockControlMenuItem[] = [
    {
        key: "inventoryStatus",
        label: "재고현황",
        description: "현재고와 안전재고 관리",
    },
    {
        key: "inboundManagement",
        label: "입고관리",
        description: "입고 예정과 검수 진행",
    },
    {
        key: "outboundManagement",
        label: "출고관리",
        description: "출고 지시와 출하 진행",
    },
    {
        key: "integratedStockControl",
        label: "입출재고통합",
        description: "입고/출고/재고를 통합 모니터링",
    },
];

export const orderDeliveryMenuItems: OrderDeliveryMenuItem[] = [
    {
        key: "orderManagement",
        label: "주문관리",
        description: "주문 접수와 진행 상태 관리",
    },
    {
        key: "deliveryManagement",
        label: "배송관리",
        description: "출하와 배송 진행 관리",
    },
];

export const statisticsMenuItems: StatisticsMenuItem[] = [
    {
        key: "orderStatistics",
        label: "주문통계",
        description: "주문 발생 추이 분석",
    },
    {
        key: "inboundStatistics",
        label: "입고통계",
        description: "입고량과 처리 추이",
    },
    {
        key: "outboundStatistics",
        label: "출고통계",
        description: "출고량과 처리 추이",
    },
    {
        key: "orderStatus",
        label: "주문현황",
        description: "현재 주문 처리 상태",
    },
    {
        key: "inboundStatus",
        label: "입고현황",
        description: "현재 입고 처리 상태",
    },
    {
        key: "monthlyStatus",
        label: "월별현황",
        description: "월 단위 운영 현황",
    },
    {
        key: "yearlyStatus",
        label: "년도별현황",
        description: "연 단위 운영 현황",
    },
    {
        key: "unshippedOrDelayedStatus",
        label: "미출고/지연현황",
        description: "미출고 및 지연 현황",
    },
];

export const summaryCards: SummaryCardModel[] = [
    { title: "총 재고 자산", value: "₩ 428M", change: "+8.2% vs 전일", tone: "primary" },
    { title: "오늘 입고 예정", value: "16건", change: "검수 대기 4건", tone: "success" },
    { title: "출고 지연", value: "3건", change: "즉시 확인 필요", tone: "warning" },
    { title: "안전재고 미달", value: "12품목", change: "발주 요청 필요", tone: "danger" },
];

export const inventoryItems: InventoryItem[] = [
    {
        sku: "FG-1001",
        productName: "의료용 장갑",
        warehouse: "본창고",
        zone: "A-01",
        quantity: 1240,
        safetyStock: 600,
        status: "정상",
        updatedAt: "2026-07-18 08:10",
    },
    {
        sku: "FG-1002",
        productName: "주사기 10ml",
        warehouse: "본창고",
        zone: "A-02",
        quantity: 320,
        safetyStock: 500,
        status: "부족",
        updatedAt: "2026-07-18 08:12",
    },
    {
        sku: "FG-1003",
        productName: "소독 티슈",
        warehouse: "냉장창고",
        zone: "C-03",
        quantity: 890,
        safetyStock: 400,
        status: "정상",
        updatedAt: "2026-07-18 08:15",
    },
    {
        sku: "FG-1004",
        productName: "체온계",
        warehouse: "본창고",
        zone: "B-01",
        quantity: 95,
        safetyStock: 120,
        status: "주의",
        updatedAt: "2026-07-18 08:16",
    },
    {
        sku: "FG-1005",
        productName: "멸균 거즈",
        warehouse: "보조창고",
        zone: "D-02",
        quantity: 670,
        safetyStock: 250,
        status: "정상",
        updatedAt: "2026-07-18 08:20",
    },
];

export const inboundOrders: InboundOrder[] = [
    {
        inboundNo: "IN-240718-01",
        supplier: "메디코어",
        warehouse: "본창고",
        eta: "2026-07-18 10:30",
        status: "도착예정",
        itemCount: 18,
    },
    {
        inboundNo: "IN-240718-02",
        supplier: "에이원헬스",
        warehouse: "냉장창고",
        eta: "2026-07-18 11:00",
        status: "검수중",
        itemCount: 7,
    },
    {
        inboundNo: "IN-240718-03",
        supplier: "케어메이트",
        warehouse: "보조창고",
        eta: "2026-07-18 13:40",
        status: "상차완료",
        itemCount: 11,
    },
];

export const outboundOrders: OutboundOrder[] = [
    {
        outboundNo: "OUT-240718-01",
        customer: "서울중앙병원",
        warehouse: "본창고",
        shipDate: "2026-07-18 09:30",
        status: "피킹중",
        itemCount: 9,
    },
    {
        outboundNo: "OUT-240718-02",
        customer: "강남메디컬",
        warehouse: "보조창고",
        shipDate: "2026-07-18 14:00",
        status: "출하대기",
        itemCount: 5,
    },
    {
        outboundNo: "OUT-240718-03",
        customer: "서부요양센터",
        warehouse: "본창고",
        shipDate: "2026-07-18 16:00",
        status: "송장발행",
        itemCount: 12,
    },
];

export const products: ProductMaster[] = [
    {
        sku: "FG-1001",
        category: "소모품",
        productName: "의료용 장갑",
        unit: "BOX",
        leadTimeDays: 3,
        active: "사용",
    },
    {
        sku: "FG-1002",
        category: "주사/채혈",
        productName: "주사기 10ml",
        unit: "EA",
        leadTimeDays: 5,
        active: "사용",
    },
    {
        sku: "FG-1003",
        category: "위생용품",
        productName: "소독 티슈",
        unit: "PACK",
        leadTimeDays: 2,
        active: "사용",
    },
    {
        sku: "FG-1004",
        category: "장비",
        productName: "체온계",
        unit: "EA",
        leadTimeDays: 14,
        active: "검토",
    },
];

export const customers: CustomerInfo[] = [
    {
        customerCode: "CU-001",
        customerName: "서울중앙병원",
        type: "병원",
        manager: "정민호",
        phone: "02-2100-1200",
        status: "거래중",
    },
    {
        customerCode: "CU-002",
        customerName: "강남메디컬",
        type: "의원",
        manager: "김하늘",
        phone: "02-530-7788",
        status: "거래중",
    },
    {
        customerCode: "CU-003",
        customerName: "서부요양센터",
        type: "요양센터",
        manager: "오지훈",
        phone: "032-440-9021",
        status: "계약검토",
    },
];

export const contracts: ContractInfo[] = [
    {
        contractNo: "CT-2026-001",
        customerName: "서울중앙병원",
        productGroup: "소모품",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        status: "유효",
    },
    {
        contractNo: "CT-2026-014",
        customerName: "강남메디컬",
        productGroup: "주사/채혈",
        startDate: "2026-03-01",
        endDate: "2027-02-28",
        status: "유효",
    },
    {
        contractNo: "CT-2026-021",
        customerName: "서부요양센터",
        productGroup: "장비",
        startDate: "2026-06-15",
        endDate: "2026-12-15",
        status: "검토중",
    },
];

export const warehouses: WarehouseInfo[] = [
    { code: "WH-01", name: "본창고", manager: "김현수", capacityRate: "78%", status: "운영중" },
    { code: "WH-02", name: "냉장창고", manager: "이서윤", capacityRate: "61%", status: "운영중" },
    { code: "WH-03", name: "보조창고", manager: "박민재", capacityRate: "84%", status: "점검예정" },
];

export const activityLogs: ActivityLog[] = [
    {
        time: "08:20",
        title: "주사기 10ml 안전재고 하회",
        detail: "본창고 A-02 구역에서 재고가 320EA로 감소했습니다.",
    },
    {
        time: "08:05",
        title: "출고 지시 생성",
        detail: "서울중앙병원 주문에 대한 피킹 작업이 시작되었습니다.",
    },
    {
        time: "07:50",
        title: "냉장창고 검수 진행",
        detail: "에이원헬스 입고 건 7품목에 대한 검수가 진행 중입니다.",
    },
];

export const alertItems: AlertItem[] = [
    {
        title: "안전재고 미달 품목 확인",
        detail: "주사기 10ml, 체온계 등 12품목이 발주 기준 아래입니다.",
        actionLabel: "입출재고관리 보기",
        actionSection: "stockControl",
    },
    {
        title: "오늘 입고 지연 가능성",
        detail: "메디코어 차량이 예정 시간보다 20분 늦을 수 있습니다.",
        actionLabel: "입출재고관리 보기",
        actionSection: "stockControl",
    },
    {
        title: "보조창고 적치율 과다",
        detail: "보조창고 적치율이 84%로 상승했습니다.",
        actionLabel: "기본정보 보기",
        actionSection: "basicInfo",
    },
];

export const settingGroups: SettingGroup[] = [
    {
        title: "기준 재고 정책",
        description: "품목별 안전재고, 재주문 시점, 리드타임을 관리합니다.",
        items: ["안전재고 기준", "자동 발주 알림", "리드타임 캘린더"],
    },
    {
        title: "창고 운영 정책",
        description: "구역별 적치율과 입출고 우선순위를 설정합니다.",
        items: ["존 우선순위", "피킹 동선", "냉장 보관 규칙"],
    },
    {
        title: "사용자 권한",
        description: "업무 역할에 따라 조회/승인 권한을 분리합니다.",
        items: ["입고 승인", "출고 승인", "마스터 수정"],
    },
];
