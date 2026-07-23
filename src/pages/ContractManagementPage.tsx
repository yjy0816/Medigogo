import { useMemo, useRef, useState } from "react";

import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import SectionCard from "../components/common/SectionCard";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type ContractStatus = "유효" | "검토중" | "무효";

type ContractRow = {
    contractCode: string;
    inboundCustomerCode: string;
    outboundCustomerCode: string;
    productCode: string;
    contractStartDate: string;
    contractEndDate: string;
    status: ContractStatus;
};

const contractStatusOptions: ContractStatus[] = ["유효", "검토중", "무효"];
const customerNameByCode: Record<string, string> = {
    "CU-001": "서울중앙병원",
    "CU-002": "강남메디컬",
    "CU-003": "서부요양센터",
};
const productNameByCode: Record<string, string> = {
    "PD-0001": "의료용 장갑",
    "PD-0002": "주사기 10ml",
    "PD-0003": "소독 티슈",
};

const initialContracts: ContractRow[] = [
    {
        contractCode: "CT-0001",
        inboundCustomerCode: "CU-001",
        outboundCustomerCode: "CU-002",
        productCode: "PD-0001",
        contractStartDate: "2026-01-01",
        contractEndDate: "2026-12-31",
        status: "유효",
    },
    {
        contractCode: "CT-0002",
        inboundCustomerCode: "CU-003",
        outboundCustomerCode: "CU-002",
        productCode: "PD-0002",
        contractStartDate: "2026-03-01",
        contractEndDate: "2027-02-28",
        status: "검토중",
    },
    {
        contractCode: "CT-0003",
        inboundCustomerCode: "CU-001",
        outboundCustomerCode: "CU-003",
        productCode: "PD-0003",
        contractStartDate: "2026-06-15",
        contractEndDate: "2026-12-15",
        status: "무효",
    },
];

const createEmptyContract = (): ContractRow => ({
    contractCode: "",
    inboundCustomerCode: "",
    outboundCustomerCode: "",
    productCode: "",
    contractStartDate: "",
    contractEndDate: "",
    status: "유효",
});

const ContractManagementPage = () => {
    const gridRef = useRef<AgGridReact<ContractRow>>(null);
    const [rows, setRows] = useState<ContractRow[]>(initialContracts);
    const [customerNameFilter, setCustomerNameFilter] = useState("");
    const [baseDateFilter, setBaseDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<"" | ContractStatus>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [draftContract, setDraftContract] = useState<ContractRow>(createEmptyContract());

    const columnDefs = useMemo<ColDef<ContractRow>[]>(
        () => [
            { field: "contractCode", headerName: "계약코드", minWidth: 130 },
            { field: "inboundCustomerCode", headerName: "입고거래처코드", minWidth: 160 },
            {
                headerName: "입고거래처명",
                minWidth: 170,
                valueGetter: (params) =>
                    customerNameByCode[params.data?.inboundCustomerCode ?? ""] ?? "",
            },
            { field: "outboundCustomerCode", headerName: "출고거래처코드", minWidth: 160 },
            {
                headerName: "출고거래처명",
                minWidth: 170,
                valueGetter: (params) =>
                    customerNameByCode[params.data?.outboundCustomerCode ?? ""] ?? "",
            },
            { field: "productCode", headerName: "제품코드", minWidth: 130 },
            {
                headerName: "제품명",
                minWidth: 170,
                valueGetter: (params) => productNameByCode[params.data?.productCode ?? ""] ?? "",
            },
            {
                field: "contractStartDate",
                headerName: "계약시작일",
                minWidth: 150,
                cellRenderer: (params: ICellRendererParams<ContractRow, string>) => (
                    <input
                        type="date"
                        className="customer-grid-select"
                        value={params.value ?? ""}
                        onChange={(event) =>
                            params.node.setDataValue("contractStartDate", event.target.value)
                        }
                        onClick={(event) => event.stopPropagation()}
                    />
                ),
            },
            {
                field: "contractEndDate",
                headerName: "계약종료일",
                minWidth: 150,
                cellRenderer: (params: ICellRendererParams<ContractRow, string>) => (
                    <input
                        type="date"
                        className="customer-grid-select"
                        value={params.value ?? ""}
                        onChange={(event) =>
                            params.node.setDataValue("contractEndDate", event.target.value)
                        }
                        onClick={(event) => event.stopPropagation()}
                    />
                ),
            },
            {
                field: "status",
                headerName: "상태",
                minWidth: 120,
                cellRenderer: (params: ICellRendererParams<ContractRow, ContractStatus>) => (
                    <select
                        className="customer-grid-select"
                        value={params.value ?? contractStatusOptions[0]}
                        onChange={(event) =>
                            params.node.setDataValue("status", event.target.value as ContractStatus)
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        {contractStatusOptions.map((option) => (
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
            const inboundCustomerName = customerNameByCode[row.inboundCustomerCode] ?? "";
            const outboundCustomerName = customerNameByCode[row.outboundCustomerCode] ?? "";
            const normalizedCustomerNameFilter = customerNameFilter.trim().toLowerCase();
            const isCustomerNameMatched =
                normalizedCustomerNameFilter.length === 0 ||
                inboundCustomerName.toLowerCase().includes(normalizedCustomerNameFilter) ||
                outboundCustomerName.toLowerCase().includes(normalizedCustomerNameFilter);
            const isBaseDateMatched = baseDateFilter
                ? baseDateFilter >= row.contractStartDate && baseDateFilter <= row.contractEndDate
                : true;
            const isStatusMatched = statusFilter ? row.status === statusFilter : true;

            return isCustomerNameMatched && isBaseDateMatched && isStatusMatched;
        });
    }, [rows, customerNameFilter, baseDateFilter, statusFilter]);

    const handleSearch = () => {
        gridRef.current?.api.deselectAll();
    };

    const handleDelete = () => {
        const selectedRows = gridRef.current?.api.getSelectedRows() ?? [];

        if (selectedRows.length === 0) {
            window.alert("삭제할 계약을 선택해 주세요.");
            return;
        }

        const selectedCodes = new Set(selectedRows.map((row) => row.contractCode));
        setRows((prevRows) => prevRows.filter((row) => !selectedCodes.has(row.contractCode)));
    };

    const handleSave = () => {
        window.alert(`총 ${rows.length}건의 계약 정보를 저장했습니다.`);
    };

    const handleOpenCreateModal = () => {
        setDraftContract(createEmptyContract());
        setIsModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsModalOpen(false);
    };

    const handleDraftChange = (field: keyof ContractRow, value: string) => {
        setDraftContract((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCreateContract = () => {
        if (!draftContract.productCode.trim()) {
            window.alert("제품코드를 입력해 주세요.");
            return;
        }

        const nextCode = `CT-${String(rows.length + 1).padStart(4, "0")}`;
        const newRow: ContractRow = {
            ...draftContract,
            contractCode: draftContract.contractCode.trim() || nextCode,
            inboundCustomerCode: draftContract.inboundCustomerCode.trim(),
            outboundCustomerCode: draftContract.outboundCustomerCode.trim(),
            productCode: draftContract.productCode.trim(),
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
                        <span>기준일자</span>
                        <input
                            type="date"
                            value={baseDateFilter}
                            onChange={(event) => setBaseDateFilter(event.target.value)}
                        />
                    </label>

                    <label className="customer-filter-field">
                        <span>상태</span>
                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value as "" | ContractStatus)
                            }
                        >
                            <option value="">전체</option>
                            {contractStatusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </SectionCard>

            <SectionCard
                title="계약관리"
                actions={
                    <div className="customer-action-row">
                        <button
                            type="button"
                            className="customer-action-button"
                            onClick={handleSearch}
                        >
                            조회
                        </button>
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
                    <AgGridReact<ContractRow>
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
                        aria-label="신규 계약 등록"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h3>신규 계약 등록</h3>
                        <p>필수 항목을 입력하고 등록해 주세요.</p>

                        <div className="customer-modal-grid">
                            <label>
                                <span>계약코드</span>
                                <input
                                    value={draftContract.contractCode}
                                    onChange={(event) =>
                                        handleDraftChange("contractCode", event.target.value)
                                    }
                                    placeholder="미입력 시 자동채번"
                                />
                            </label>
                            <label>
                                <span>입고거래처코드</span>
                                <input
                                    value={draftContract.inboundCustomerCode}
                                    onChange={(event) =>
                                        handleDraftChange("inboundCustomerCode", event.target.value)
                                    }
                                    placeholder="예: CU-001"
                                />
                            </label>
                            <label>
                                <span>출고거래처코드</span>
                                <input
                                    value={draftContract.outboundCustomerCode}
                                    onChange={(event) =>
                                        handleDraftChange(
                                            "outboundCustomerCode",
                                            event.target.value
                                        )
                                    }
                                    placeholder="예: CU-002"
                                />
                            </label>
                            <label>
                                <span>제품코드</span>
                                <input
                                    value={draftContract.productCode}
                                    onChange={(event) =>
                                        handleDraftChange("productCode", event.target.value)
                                    }
                                    placeholder="예: PD-0001"
                                />
                            </label>
                            <label>
                                <span>계약시작일</span>
                                <input
                                    type="date"
                                    value={draftContract.contractStartDate}
                                    onChange={(event) =>
                                        handleDraftChange("contractStartDate", event.target.value)
                                    }
                                />
                            </label>
                            <label>
                                <span>계약종료일</span>
                                <input
                                    type="date"
                                    value={draftContract.contractEndDate}
                                    onChange={(event) =>
                                        handleDraftChange("contractEndDate", event.target.value)
                                    }
                                />
                            </label>
                            <label>
                                <span>상태</span>
                                <select
                                    value={draftContract.status}
                                    onChange={(event) =>
                                        handleDraftChange("status", event.target.value)
                                    }
                                >
                                    {contractStatusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
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
                                onClick={handleCreateContract}
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

export default ContractManagementPage;
