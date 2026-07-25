import type {SearchCondition} from "../../types/search";


export const getOrders = async(condition:SearchCondition)=>{


    return [

        {
            itemNo:"ORD001",
            itemName:"노트북",
            qty:10
        },

        {
            itemNo:"ORD002",
            itemName:"모니터",
            qty:5
        }

    ];

};