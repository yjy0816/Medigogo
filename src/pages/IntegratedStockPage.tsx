import { useRef } from "react";
import Toolbar from "../components/Toolbar";
import SearchForm , { type  SearchFormRef }  from "../components/SearchForm";
import InboundGrid, {  type InboundGridRef } from "../components/grid/InboundGrid";


const IntegratedStockPage=()=>{


const searchFormRef = useRef<SearchFormRef>(null);
const InboundGridRef = useRef<InboundGridRef>(null);


const handleSearch = async()=>{

        const form = searchFormRef.current;

        if(!form)
        return;

        if(!form.validate())
        return;

const condition = form.getCondition();

await Promise.all([

                   InboundGridRef.current?.search(condition) ?? null,
]);

};

return (

<>

<SearchForm ref={searchFormRef}  onSearch={handleSearch} />
<InboundGrid ref={InboundGridRef} />
</>

      ); 

};


export default IntegratedStockPage;