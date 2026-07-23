import type { BasicInfoSubSection } from "../types/inventory";

import ContractManagementPage from "./ContractManagementPage";
import CustomerManagementPage from "./CustomerManagementPage";
import ProductsPage from "./ProductsPage";

type BasicInfoPageProps = {
    activeBasicInfoMenu: BasicInfoSubSection;
};

const BasicInfoPage = ({ activeBasicInfoMenu }: BasicInfoPageProps) => {
    switch (activeBasicInfoMenu) {
        case "customerManagement":
            return <CustomerManagementPage />;
        case "productManagement":
            return <ProductsPage />;
        case "contractManagement":
            return <ContractManagementPage />;
        default:
            return <CustomerManagementPage />;
    }
};

export default BasicInfoPage;
