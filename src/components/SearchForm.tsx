import { forwardRef, useImperativeHandle, useState } from "react";
import type {SearchCondition} from "../types/search";
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from "react-flatpickr";


export interface SearchFormRef {
    getCondition(): SearchCondition;
    validate(): boolean;
    reset(): void;
}


interface SearchFormProps {
    onSearch: () => Promise<void>;
}



const SearchForm = forwardRef<SearchFormRef,SearchFormProps>((props, ref)=>{



    const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
    };
    

    const today = new Date();
    
    const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(
              today.getMonth() - 1
        );



    const [condition, setCondition] = useState<SearchCondition>({
        
        fromDate: formatDate(oneMonthAgo),
        
        toDate: formatDate(today),
        
        customerCd: ""

    });



    const changeDate = (name:string, date:Date[]) => {
        
        const value = date[0]
            ? formatDate(date[0])
            : "";
      
        setCondition(prev => ({
            ...prev,
            [name]: value
        }));

    };



    const changeHandler =
        (e:React.ChangeEvent<HTMLInputElement>)=>{

            const {name,value}=e.target;


            setCondition(prev=>({

                ...prev,

                [name]:value

            }));

        };



    const getCondition = ()=>{

         //alert(JSON.stringify(condition));

        return condition;

    };



    const validate = ()=>{


        if(!condition.fromDate){

            alert("시작일 입력");

            return false;

        }


        if(!condition.toDate){

            alert("종료일 입력");

            return false;

        }

       

        if(!condition.customerCd){

            alert("거래처 입력");

            return false;

        }    

        return true;


    };



    const reset=()=>{


        setCondition({

            fromDate:"",
            toDate:"",
            customerCd:""

        });

    };



    useImperativeHandle(ref,()=>({

        getCondition,

        validate,

        reset

    }));



    return (

       
                <div className="customer-filter-row">
                    <label className="customer-filter-field">
                        <span>시작일</span>
                         <Flatpickr
                                    value={condition.fromDate}
                                    options={{
                                        dateFormat:"Y-m-d"
                                    }}
                                    onChange={(date)=>{
                                        changeDate("fromDate", date);
                                    }}
                                />
                    </label>

                    <label className="customer-filter-field">
                        <span>종료일</span>
                        <Flatpickr
                                    value={condition.toDate}
                                    options={{
                                        dateFormat:"Y-m-d"
                                    }}
                                    onChange={(date)=>{
                                        changeDate("toDate", date);
                                    }}
                                />
                    </label>

                     <label className="customer-filter-field">
                        <span>거래처명</span>
                        <input
                            name="customerCd"
                            value={condition.customerCd}
                            onChange={changeHandler}
                            placeholder="거래처"

                        />
                    </label>

                    <button
                            type="button"
                            className="customer-action-button is-primary"
                            onClick={props.onSearch}
                        >
                            조회
                        </button>
                   

                </div>
          
    );

});


export default SearchForm;