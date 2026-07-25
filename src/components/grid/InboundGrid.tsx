import { forwardRef, useImperativeHandle, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {getInbound} from "../api/inboundApi";
import type {SearchCondition} from "../../types/search";
import type { ColDef } from "ag-grid-community";

export interface InboundGridRef {
    search( condition:SearchCondition ):Promise<void>;
}

interface Item {
                itemNo: string;
                itemName: string;
                qty: number;
}


const InboundGrid = forwardRef<InboundGridRef>(( _ ,ref)=>{


const [rowData,setRowData] = useState<Item[]>([]);
const columnDefs: ColDef<Item>[] = [
    {
        field:"itemNo",
        headerName:"상품번호"
    },

    {
        field:"itemName",
        headerName:"상품명"
    },

    {
        field:"qty",
        headerName:"수량"
    }

];



const search = async(condition:SearchCondition)=>{

    const data =
        await getInbound(condition);
    setRowData(data);
};



useImperativeHandle(ref,()=>({

    search

}));



return(

<div style={{  height:300 }}
>

        <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
        />

</div>

);


});


export default InboundGrid;