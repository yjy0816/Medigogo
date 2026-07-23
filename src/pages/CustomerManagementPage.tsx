import { useMemo, useRef, useState } from "react";

import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import SectionCard from "../components/common/SectionCard";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type CustomerType = "입고거래처" | "출고거래처";
type CustomerCategory = "병원" | "의원" | "요양센터" | "도매상";
type ProgressStatus = "거래중" | "계약중" | "계약취소";

type CustomerRow = {
    customerCode: string;
    customerName: string;
    address: string;
    contact: string;
    email: string;
    ceoContact: string;
    ceoName: string;
    manager1Contact: string;
    manager1Name: string;
    manager2Contact: string;
    manager2Name: string;
    typeCategory: CustomerCategory;
    customerType: CustomerType;
    progressStatus: ProgressStatus;
};

const initialCustomers: CustomerRow[] = [
    {
        customerCode: "CU-001",
        customerName: "서울중앙병원",
        address: "서울시 중구 을지로 100",
        contact: "02-2100-1200",
        email: "admin@seoulcenter.co.kr",
        ceoContact: "010-1255-0098",
        ceoName: "박정훈",
        manager1Contact: "010-3277-1020",
        manager1Name: "김하늘",
        manager2Contact: "010-4411-2201",
        manager2Name: "정민호",
        typeCategory: "병원",
        customerType: "입고거래처",
        progressStatus: "거래중",
    },
    {
        customerCode: "CU-002",
        customerName: "강남메디컬",
        address: "서울시 강남구 논현로 88",
        contact: "02-530-7788",
        email: "cs@gangnammedical.co.kr",
        ceoContact: "010-8822-7744",
        ceoName: "이승호",
        manager1Contact: "010-3342-8831",
        manager1Name: "오지훈",
        manager2Contact: "010-9921-7764",
        manager2Name: "윤지수",
        typeCategory: "의원",
        customerType: "출고거래처",
        progressStatus: "계약중",
    },
    {
        customerCode: "CU-003",
        customerName: "서부요양센터",
        address: "인천시 서구 청라대로 210",
        contact: "032-440-9021",
        email: "center@westcare.kr",
        ceoContact: "010-6452-2200",
        ceoName: "최은정",
        manager1Contact: "010-7634-9981",
        manager1Name: "신유진",
        manager2Contact: "010-2355-6672",
        manager2Name: "조한결",
        typeCategory: "요양센터",
        customerType: "입고거래처",
        progressStatus: "거래중",
    },
];

const createEmptyCustomer = (): CustomerRow => ({
    customerCode: "",
    customerName: "",
    address: "",
    contact: "",
    email: "",
    ceoContact: "",
    ceoName: "",
    manager1Contact: "",
    manager1Name: "",
    manager2Contact: "",
    manager2Name: "",
    typeCategory: "병원",
    customerType: "입고거래처",
    progressStatus: "거래중",
});

const typeCategoryOptions: CustomerCategory[] = ["병원", "의원", "요양센터", "도매상"];
const customerTypeOptions: CustomerType[] = ["입고거래처", "출고거래처"];
const progressStatusOptions: ProgressStatus[] = ["거래중", "계약중", "계약취소"];

const CustomerManagementPage = () => {
    const gridRef = useRef<AgGridReact<CustomerRow>>(null);
    const [rows, setRows] = useState<CustomerRow[]>(initialCustomers);
    const [customerNameFilter, setCustomerNameFilter] = useState("");
    const [customerTypeFilter, setCustomerTypeFilter] = useState<"" | CustomerType>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [draftCustomer, setDraftCustomer] = useState<CustomerRow>(createEmptyCustomer());

    const columnDefs = useMemo<ColDef<CustomerRow>[]>(
        () => [
            { field: "customerCode", headerName: "거래처코드", minWidth: 130 },
            { field: "customerName", headerName: "거래처명", minWidth: 150 },
            { field: "address", headerName: "주소", minWidth: 220 },
            { field: "contact", headerName: "연락처", minWidth: 140 },
            { field: "email", headerName: "메일", minWidth: 190 },
            { field: "ceoContact", headerName: "대표자 연락처", minWidth: 150 },
            { field: "ceoName", headerName: "대표자 성함", minWidth: 130 },
            { field: "manager1Contact", headerName: "담당자1 연락처", minWidth: 160 },
            { field: "manager1Name", headerName: "담당자1 성함", minWidth: 130 },
            { field: "manager2Contact", headerName: "담당자2 연락처", minWidth: 160 },
            { field: "manager2Name", headerName: "담당자2 성함", minWidth: 130 },
            {
                field: "typeCategory",
                headerName: "유형구분",
                minWidth: 130,
                cellRenderer: (params: ICellRendererParams<CustomerRow, CustomerCategory>) => (
                    <select
                        className="customer-grid-select"
                        value={params.value ?? typeCategoryOptions[0]}
                        onChange={(event) =>
                            params.node.setDataValue(
                                "typeCategory",
                                event.target.value as CustomerCategory
                            )
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        {typeCategoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ),
            },
            {
                field: "customerType",
                headerName: "거래처구분",
                minWidth: 140,
                cellRenderer: (params: ICellRendererParams<CustomerRow, CustomerType>) => (
                    <select
                        className="customer-grid-select"
                        value={params.value ?? customerTypeOptions[0]}
                        onChange={(event) =>
                            params.node.setDataValue(
                                "customerType",
                                event.target.value as CustomerType
                            )
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        {customerTypeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ),
            },
            {
                field: "progressStatus",
                headerName: "거래상태",
                minWidth: 130,
                cellRenderer: (params: ICellRendererParams<CustomerRow, ProgressStatus>) => (
                    <select
                        className="customer-grid-select"
                        value={params.value ?? progressStatusOptions[0]}
                        onChange={(event) =>
                            params.node.setDataValue(
                                "progressStatus",
                                event.target.value as ProgressStatus
                            )
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        {progressStatusOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ),
            },
        ],
        []
    );

    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            const isNameMatched = row.customerName
                .toLowerCase()
                .includes(customerNameFilter.trim().toLowerCase());
            const isTypeMatched = customerTypeFilter
                ? row.customerType === customerTypeFilter
                : true;

            return isNameMatched && isTypeMatched;
        });
    }, [rows, customerNameFilter, customerTypeFilter]);

    const handleSearch = () => {
        gridRef.current?.api.deselectAll();
    };

    const handleDelete = () => {
        const selectedRows = gridRef.current?.api.getSelectedRows() ?? [];

        if (selectedRows.length === 0) {
            window.alert("삭제할 거래처를 선택해 주세요.");
            return;
        }

        const selectedCodes = new Set(selectedRows.map((row) => row.customerCode));
        setRows((prevRows) => prevRows.filter((row) => !selectedCodes.has(row.customerCode)));
    };

    const handleSave = () => {
        window.alert(`총 ${rows.length}건의 거래처 정보를 저장했습니다.`);
    };

    const handleOpenCreateModal = () => {
        setDraftCustomer(createEmptyCustomer());
        setIsModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsModalOpen(false);
    };

    const handleDraftChange = (field: keyof CustomerRow, value: string) => {
        setDraftCustomer((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCreateCustomer = () => {
        if (!draftCustomer.customerName.trim()) {
            window.alert("거래처명을 입력해 주세요.");
            return;
        }

        const nextCode = `CU-${String(rows.length + 1).padStart(3, "0")}`;
        const newRow: CustomerRow = {
            ...draftCustomer,
            customerCode: draftCustomer.customerCode.trim() || nextCode,
            customerName: draftCustomer.customerName.trim(),
            address: draftCustomer.address.trim(),
            contact: draftCustomer.contact.trim(),
            email: draftCustomer.email.trim(),
            ceoContact: draftCustomer.ceoContact.trim(),
            ceoName: draftCustomer.ceoName.trim(),
            manager1Contact: draftCustomer.manager1Contact.trim(),
            manager1Name: draftCustomer.manager1Name.trim(),
            manager2Contact: draftCustomer.manager2Contact.trim(),
            manager2Name: draftCustomer.manager2Name.trim(),
        };

        setRows((prevRows) => [newRow, ...prevRows]);
        setIsModalOpen(false);
    };

    return (
        <div className="page-stack customer-management-stack">
            <SectionCard title="">
                <div className="customer-filter-row">
                    <label className="customer-filter-field">
                        <span>거래처명</span>
                        <input
                            value={customerNameFilter}
                            onChange={(event) => setCustomerNameFilter(event.target.value)}
                            placeholder="거래처명을 입력하세요"
                        />
                    </label>

                    <label className="customer-filter-field">
                        <span>거래처구분</span>
                        <select
                            value={customerTypeFilter}
                            onChange={(event) =>
                                setCustomerTypeFilter(event.target.value as "" | CustomerType)
                            }
                        >
                            <option value="">전체</option>
                            <option value="입고거래처">입고거래처</option>
                            <option value="출고거래처">출고거래처</option>
                        </select>
                    </label>

                    <button type="button" className="customer-action-button" onClick={handleSearch}>
                        조회
                    </button>
                </div>
            </SectionCard>

            <SectionCard
                title="거래처관리"
                actions={
                    <div className="customer-action-row">
                        <button
                            type="button"
                            className="customer-action-button"
                            onClick={handleOpenCreateModal}
                        >
                            신규
                        </button>
                        <button
                            type="button"
                            className="customer-action-button"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                        <button
                            type="button"
                            className="customer-action-button is-primary"
                            onClick={handleSave}
                        >
                            저장
                        </button>
                    </div>
                }
            >
                <div className="ag-theme-quartz grid-surface customer-grid" style={{ height: 430 }}>
                    <AgGridReact<CustomerRow>
                        ref={gridRef}
                        rowData={filteredRows}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true,
                            flex: 1,
                            minWidth: 120,
                            cellStyle: { textAlign: "center" },
                            headerClass: "customer-grid-header-center",
                        }}
                        rowSelection={{
                            mode: "multiRow",
                            checkboxes: true,
                            headerCheckbox: true,
                            checkboxLocation: "selectionColumn",
                            enableClickSelection: false,
                        }}
                        selectionColumnDef={{
                            width: 42,
                            minWidth: 42,
                            pinned: "left",
                            sortable: false,
                            resizable: false,
                        }}
                        rowHeight={35}
                        pagination
                        paginationPageSize={10}
                    />
                </div>
            </SectionCard>

            {isModalOpen ? (
                <div
                    className="customer-modal-backdrop"
                    role="presentation"
                    onClick={handleCloseCreateModal}
                >
                    <div
                        className="customer-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="신규 거래처 등록"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h3>신규 거래처 등록</h3>
                        <p>필수 항목을 입력하고 등록해 주세요.</p>
                        <div className="customer-modal-grid">
                            <label>
                                <span>거래처코드</span>
                                <input
                                    value={draftCustomer.customerCode}
                                    onChange={(event) =>
                                        handleDraftChange("customerCode", event.target.value)
                                    }
                                    placeholder="미입력 시 자동채번"
                                />
                            </label>
                            <label>
                                <span>거래처명</span>
                                <input
                                    value={draftCustomer.customerName}
                                    onChange={(event) =>
                                        handleDraftChange("customerName", event.target.value)
                                    }
                                    placeholder="거래처명"
                                />
                            </label>
                            <label>
                                <span>주소</span>
                                <input
                                    value={draftCustomer.address}
                                    onChange={(event) =>
                                        handleDraftChange("address", event.target.value)
                                    }
                                    placeholder="주소"
                                />
                            </label>
                            <label>
                                <span>연락처</span>
                                <input
                                    value={draftCustomer.contact}
                                    onChange={(event) =>
                                        handleDraftChange("contact", event.target.value)
                                    }
                                    placeholder="대표 연락처"
                                />
                            </label>
                            <label>
                                <span>메일</span>
                                <input
                                    value={draftCustomer.email}
                                    onChange={(event) =>
                                        handleDraftChange("email", event.target.value)
                                    }
                                    placeholder="example@domain.com"
                                />
                            </label>
                            <label>
                                <span>대표자 연락처</span>
                                <input
                                    value={draftCustomer.ceoContact}
                                    onChange={(event) =>
                                        handleDraftChange("ceoContact", event.target.value)
                                    }
                                    placeholder="대표자 연락처"
                                />
                            </label>
                            <label>
                                <span>대표자 성함</span>
                                <input
                                    value={draftCustomer.ceoName}
                                    onChange={(event) =>
                                        handleDraftChange("ceoName", event.target.value)
                                    }
                                    placeholder="대표자 성함"
                                />
                            </label>
                            <label>
                                <span>담당자1 연락처</span>
                                <input
                                    value={draftCustomer.manager1Contact}
                                    onChange={(event) =>
                                        handleDraftChange("manager1Contact", event.target.value)
                                    }
                                    placeholder="담당자1 연락처"
                                />
                            </label>
                            <label>
                                <span>담당자1 성함</span>
                                <input
                                    value={draftCustomer.manager1Name}
                                    onChange={(event) =>
                                        handleDraftChange("manager1Name", event.target.value)
                                    }
                                    placeholder="담당자1 성함"
                                />
                            </label>
                            <label>
                                <span>담당자2 연락처</span>
                                <input
                                    value={draftCustomer.manager2Contact}
                                    onChange={(event) =>
                                        handleDraftChange("manager2Contact", event.target.value)
                                    }
                                    placeholder="담당자2 연락처"
                                />
                            </label>
                            <label>
                                <span>담당자2 성함</span>
                                <input
                                    value={draftCustomer.manager2Name}
                                    onChange={(event) =>
                                        handleDraftChange("manager2Name", event.target.value)
                                    }
                                    placeholder="담당자2 성함"
                                />
                            </label>
                            <label>
                                <span>유형구분</span>
                                <select
                                    value={draftCustomer.typeCategory}
                                    onChange={(event) =>
                                        handleDraftChange("typeCategory", event.target.value)
                                    }
                                >
                                    <option value="병원">병원</option>
                                    <option value="의원">의원</option>
                                    <option value="요양센터">요양센터</option>
                                    <option value="도매상">도매상</option>
                                </select>
                            </label>
                            <label>
                                <span>거래처구분</span>
                                <select
                                    value={draftCustomer.customerType}
                                    onChange={(event) =>
                                        handleDraftChange("customerType", event.target.value)
                                    }
                                >
                                    <option value="입고거래처">입고거래처</option>
                                    <option value="출고거래처">출고거래처</option>
                                </select>
                            </label>
                        </div>

                        <div className="customer-modal-actions">
                            <button
                                type="button"
                                className="customer-action-button"
                                onClick={handleCloseCreateModal}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="customer-action-button is-primary"
                                onClick={handleCreateCustomer}
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CustomerManagementPage;
