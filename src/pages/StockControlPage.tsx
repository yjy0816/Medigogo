import InboundPage from "./InboundPage";
import InventoryPage from "./InventoryPage";
import OutboundPage from "./OutboundPage";

const StockControlPage = () => {
    return (
        <div className="page-stack">
            <InventoryPage />
            <div className="panel-grid">
                <InboundPage />
                <OutboundPage />
            </div>
        </div>
    );
};

export default StockControlPage;
