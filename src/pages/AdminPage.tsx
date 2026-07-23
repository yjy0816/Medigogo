import SectionCard from "../components/common/SectionCard";
import { adminMenuItems } from "../data/mockData";
import type { AdminSubSection } from "../types/inventory";

type AdminPageProps = {
    activeAdminMenu: AdminSubSection;
};

const adminContent: Record<
    AdminSubSection,
    {
        title: string;
        description: string;
        points: string[];
    }
> = {
    userManagement: {
        title: "사용자관리",
        description: "사용자 계정 등록, 상태 변경, 비밀번호 초기화 업무를 관리합니다.",
        points: ["사용자 등록/수정", "계정 잠금 및 해제", "초기 비밀번호 발급"],
    },
    programManagement: {
        title: "프로그램관리",
        description: "시스템에서 사용하는 프로그램과 기능 단위를 등록합니다.",
        points: ["프로그램 코드 관리", "기능별 사용 여부", "버전 반영 이력"],
    },
    roleManagement: {
        title: "역할관리",
        description: "부서 또는 업무별 역할 그룹과 기본 권한 묶음을 관리합니다.",
        points: ["역할 생성", "역할 설명 관리", "기본 권한 템플릿"],
    },
    menuManagement: {
        title: "메뉴관리",
        description: "사이드 메뉴와 화면 연결 구조를 관리합니다.",
        points: ["메뉴 노출 순서", "상위/하위 메뉴 관계", "사용 여부 관리"],
    },
    roleMenuPermissionManagement: {
        title: "역할메뉴권한관리",
        description: "역할별로 메뉴 접근, 조회, 등록, 수정 권한을 세부 설정합니다.",
        points: ["역할별 메뉴 매핑", "조회/수정 권한 분리", "권한 일괄 반영"],
    },
    loginHistoryManagement: {
        title: "로그인이력관리",
        description: "로그인 성공/실패 이력과 접속 환경을 추적합니다.",
        points: ["로그인 성공/실패 조회", "IP 및 브라우저 기록", "기간별 접속 이력"],
    },
    userAccessPage: {
        title: "사용자접근페이지",
        description: "사용자별 접근 가능한 화면과 최근 사용 페이지를 관리합니다.",
        points: ["사용자별 접근 화면 조회", "최근 접속 페이지 확인", "예외 권한 부여"],
    },
};

const AdminPage = ({ activeAdminMenu }: AdminPageProps) => {
    const selectedMenu = adminMenuItems.find((item) => item.key === activeAdminMenu);
    const selectedContent = adminContent[activeAdminMenu];

    return (
        <div className="page-stack">
            <SectionCard title={selectedContent.title} description={selectedContent.description}>
                <div className="page-stack admin-page-stack">
                    <div className="admin-selected-menu">
                        <span>선택된 하위 메뉴</span>
                        <strong>{selectedMenu?.label}</strong>
                        <p>{selectedMenu?.description}</p>
                    </div>

                    <div className="settings-grid">
                        {selectedContent.points.map((point) => (
                            <div key={point} className="admin-block">
                                <strong>{point}</strong>
                                <p>{selectedContent.title} 화면에서 우선 배치할 관리 항목입니다.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionCard>
        </div>
    );
};

export default AdminPage;
