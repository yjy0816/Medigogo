import SectionCard from "./common/SectionCard";

interface Props {

    onSearch:()=>void;

}


const Toolbar = ({onSearch}:Props)=>{


    return (

         
                    <div className="customer-action-row"  
                         style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "15px"   }}>
 
                        <button
                            type="button"
                            className="customer-action-button is-primary"
                            onClick={onSearch}
                        >
                            조회
                        </button>

                        <button
                            type="button"
                            className="customer-action-button"
                            onClick={onSearch}
                        >
                            신규
                        </button>
                        <button
                            type="button"
                            className="customer-action-button"
                            onClick={onSearch}
                        >
                            삭제
                        </button>
                        <button
                            type="button"
                            className="customer-action-button "
                            onClick={onSearch}
                        >
                            저장
                        </button>
                    </div>
                



    );

};


export default Toolbar;