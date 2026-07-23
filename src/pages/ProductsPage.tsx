import { useMemo, useRef, useState, type ChangeEvent } from "react";

import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import SectionCard from "../components/common/SectionCard";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type ProductGroup = "소모품" | "주사/채혈" | "위생용품" | "장비";
type ProductUnit = "EA" | "BOX" | "PACK";
type ProductActive = "사용" | "검토" | "중지";

type ProductRow = {
    productGroup: ProductGroup;
    productCode: string;
    productName: string;
    inboundCustomerCode: string;
    unit: ProductUnit;
    leadTimeDays: number;
    active: ProductActive;
};

const productGroupOptions: ProductGroup[] = ["소모품", "주사/채혈", "위생용품", "장비"];
const productUnitOptions: ProductUnit[] = ["EA", "BOX", "PACK"];
const productActiveOptions: ProductActive[] = ["사용", "검토", "중지"];

const initialProducts: ProductRow[] = [
    {
        productGroup: "소모품",
        productCode: "PD-0001",
        productName: "의료용 장갑",
        inboundCustomerCode: "CU-001",
        unit: "BOX",
        leadTimeDays: 3,
        active: "사용",
    },
    {
        productGroup: "주사/채혈",
        productCode: "PD-0002",
        productName: "주사기 10ml",
        inboundCustomerCode: "CU-002",
        unit: "EA",
        leadTimeDays: 5,
        active: "사용",
    },
    {
        productGroup: "위생용품",
        productCode: "PD-0003",
        productName: "소독 티슈",
        inboundCustomerCode: "CU-003",
        unit: "PACK",
        leadTimeDays: 2,
        active: "검토",
    },
];

const createEmptyProduct = (): ProductRow => ({
    productGroup: "소모품",
    productCode: "",
    productName: "",
    inboundCustomerCode: "",
    unit: "EA",
    leadTimeDays: 1,
    active: "사용",
});

const ProductsPage = () => {
    const gridRef = useRef<AgGridReact<ProductRow>>(null);
    const excelInputRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<ProductRow[]>(initialProducts);
    const [productNameFilter, setProductNameFilter] = useState("");
    const [productGroupFilter, setProductGroupFilter] = useState<"" | ProductGroup>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [draftProduct, setDraftProduct] = useState<ProductRow>(createEmptyProduct());

    const columnDefs = useMemo<ColDef<ProductRow>[]>(
        () => [
            { field: "productGroup", headerName: "제품그룹", minWidth: 150 },
            { field: "productName", headerName: "제품명", minWidth: 200 },
            { field: "productCode", headerName: "제품코드", minWidth: 140 },
            { field: "inboundCustomerCode", headerName: "입고거래처코드", minWidth: 180 },
            {
                field: "unit",
                headerName: "단위",
                minWidth: 100,
                cellRenderer: (params: ICellRendererParams<ProductRow, ProductUnit>) => (
                    <select
                        className="customer-grid-select"
                        value={params.value ?? productUnitOptions[0]}
                        onChange={(event) =>
                            params.node.setDataValue("unit", event.target.value as ProductUnit)
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        {productUnitOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ),
            },
            { field: "leadTimeDays", headerName: "리드타임", minWidth: 110 },
            {
                field: "active",
                headerName: "사용상태",
                minWidth: 110,
                cellRenderer: (params: ICellRendererParams<ProductRow, ProductActive>) => (
                    <select
                        className="customer-grid-select"
                        value={params.value ?? productActiveOptions[0]}
                        onChange={(event) =>
                            params.node.setDataValue("active", event.target.value as ProductActive)
                        }
                        onClick={(event) => event.stopPropagation()}
                    >
                        {productActiveOptions.map((option) => (
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
            const isNameMatched = row.productName
                .toLowerCase()
                .includes(productNameFilter.trim().toLowerCase());
            const isGroupMatched = productGroupFilter
                ? row.productGroup === productGroupFilter
                : true;

            return isNameMatched && isGroupMatched;
        });
    }, [rows, productNameFilter, productGroupFilter]);

    const handleSearch = () => {
        gridRef.current?.api.deselectAll();
    };

    const handleDelete = () => {
        const selectedRows = gridRef.current?.api.getSelectedRows() ?? [];

        if (selectedRows.length === 0) {
            window.alert("삭제할 제품을 선택해 주세요.");
            return;
        }

        const selectedCodes = new Set(selectedRows.map((row) => row.productCode));
        setRows((prevRows) => prevRows.filter((row) => !selectedCodes.has(row.productCode)));
    };

    const handleSave = () => {
        window.alert(`총 ${rows.length}건의 제품 정보를 저장했습니다.`);
    };

    const handleExcelUploadClick = () => {
        excelInputRef.current?.click();
    };

    const handleExcelFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        window.alert(`${selectedFile.name} 파일을 선택했습니다.`);
        event.target.value = "";
    };

    const handleOpenCreateModal = () => {
        setDraftProduct(createEmptyProduct());
        setIsModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsModalOpen(false);
    };

    const handleDraftChange = (field: keyof ProductRow, value: string) => {
        setDraftProduct((prev) => ({
            ...prev,
            [field]: field === "leadTimeDays" ? Number(value) || 0 : value,
        }));
    };

    const handleCreateProduct = () => {
        if (!draftProduct.productName.trim()) {
            window.alert("제품명을 입력해 주세요.");
            return;
        }

        const nextCode = `PD-${String(rows.length + 1).padStart(4, "0")}`;

        const newRow: ProductRow = {
            ...draftProduct,
            productCode: draftProduct.productCode.trim() || nextCode,
            productName: draftProduct.productName.trim(),
            inboundCustomerCode: draftProduct.inboundCustomerCode.trim(),
            leadTimeDays: Math.max(0, Number(draftProduct.leadTimeDays) || 0),
        };

        setRows((prevRows) => [newRow, ...prevRows]);
        setIsModalOpen(false);
    };

    return (
        <div className="page-stack customer-management-stack">
            <SectionCard title="">
                <div className="customer-filter-row">
                    <label className="customer-filter-field">
                        <span>제품그룹</span>
                        <select
                            value={productGroupFilter}
                            onChange={(event) =>
                                setProductGroupFilter(event.target.value as "" | ProductGroup)
                            }
                        >
                            <option value="">전체</option>
                            {productGroupOptions.map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="customer-filter-field">
                        <span>제품명</span>
                        <input
                            value={productNameFilter}
                            onChange={(event) => setProductNameFilter(event.target.value)}
                            placeholder="제품명을 입력하세요"
                        />
                    </label>
                </div>
            </SectionCard>

            <SectionCard
                title="제품관리"
                actions={
                    <div className="customer-action-row">
                        <input
                            ref={excelInputRef}
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleExcelFileChange}
                            style={{ display: "none" }}
                        />
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
                        <button
                            type="button"
                            className="customer-action-button"
                            onClick={handleExcelUploadClick}
                        >
                            엑셀 업로드
                        </button>
                    </div>
                }
            >
                <div className="ag-theme-quartz grid-surface customer-grid" style={{ height: 430 }}>
                    <AgGridReact<ProductRow>
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
                        aria-label="신규 제품 등록"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h3>신규 제품 등록</h3>
                        <p>필수 항목을 입력하고 등록해 주세요.</p>

                        <div className="customer-modal-grid">
                            <label>
                                <span>제품그룹</span>
                                <select
                                    value={draftProduct.productGroup}
                                    onChange={(event) =>
                                        handleDraftChange("productGroup", event.target.value)
                                    }
                                >
                                    {productGroupOptions.map((group) => (
                                        <option key={group} value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>제품코드</span>
                                <input
                                    value={draftProduct.productCode}
                                    onChange={(event) =>
                                        handleDraftChange("productCode", event.target.value)
                                    }
                                    placeholder="미입력 시 자동채번"
                                />
                            </label>
                            <label>
                                <span>제품명</span>
                                <input
                                    value={draftProduct.productName}
                                    onChange={(event) =>
                                        handleDraftChange("productName", event.target.value)
                                    }
                                    placeholder="제품명"
                                />
                            </label>
                            <label>
                                <span>입고거래처코드</span>
                                <input
                                    value={draftProduct.inboundCustomerCode}
                                    onChange={(event) =>
                                        handleDraftChange("inboundCustomerCode", event.target.value)
                                    }
                                    placeholder="예: CU-001"
                                />
                            </label>
                            <label>
                                <span>단위</span>
                                <select
                                    value={draftProduct.unit}
                                    onChange={(event) =>
                                        handleDraftChange("unit", event.target.value)
                                    }
                                >
                                    {productUnitOptions.map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>리드타임</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={draftProduct.leadTimeDays}
                                    onChange={(event) =>
                                        handleDraftChange("leadTimeDays", event.target.value)
                                    }
                                    placeholder="일수"
                                />
                            </label>
                            <label>
                                <span>사용상태</span>
                                <select
                                    value={draftProduct.active}
                                    onChange={(event) =>
                                        handleDraftChange("active", event.target.value)
                                    }
                                >
                                    {productActiveOptions.map((active) => (
                                        <option key={active} value={active}>
                                            {active}
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
                                onClick={handleCreateProduct}
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

export default ProductsPage;
