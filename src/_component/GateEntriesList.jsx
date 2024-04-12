 import { useEffect } from "react";
import truckIcon from "../truckGateIconBlack.png"
 const GateEntriesList=({data,modalclose})=>{

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape' ) {
            modalclose();
          }else if (event.key === 'Enter' || event.keyCode === 13){
            modalclose();
          }
        };
    
        // Attach the event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    
      
    //   useEffect(()=>{
    //     let timeoutId 
    //     timeoutId =setTimeout(() => {
    //       modalclose()
    //     }, 2000);
        
    //     return()=>{
    //       clearTimeout(timeoutId)
    //     }
    //   },[])

    return(
        <div  className="modal-overlay" >
            <div   className="modal-content spcl" style={{width:"400px",border:"1px tr #868686"}}>
                <div style={{padding:"10px"}}> 
                <div className="container-home" style={{justifyContent:"space-between"}}>
                        <span className="subHeading-gates" style={{color:"#201F27"}}>Confirmed By</span>
                        <div onClick={modalclose} class="cross-btn"></div>

                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={truckIcon} alt="Truck" style={{ background: "#F6F7FB", borderRadius: "10px" }} />
                        <div>
                            <span className="subHeading-gates">{data.VehicleName}</span><br/>
                            <span style={{color:"#868686"}}>Vehicle ID/VIN No.</span>
                        </div>
                    </div>
                </div>
                <hr style={{color:"#E1E3EB",background:"#E1E3EB",borderColor:"#E1E3EB"}}/>
                    <div className="container-main" style={{border:"2px solid #E1E3EB",borderRadius:"10px",margin:"10px"}}>
                        <div className="container-home" style={{justifyContent:"space-around",background:"#F6F7FB",borderBottom:"2px solid #E1E3EB"}}>
                            <span>Approved By</span>
                            <span>Gate Name</span>
                        </div>
                        {data['Gates'].map((GateData)=>{
                                return(
                                                <div className="container-home" style={{gap:"70px",padding:"10px"}}>
                                                <div style={{display:"flex",alignItems: "baseline",gap:"10px"}}>
                                                    <div className="square" />
                                                    <div className="container-main" style={{gap:"5px"}}>
                                                        <div style={{fontWeight:"600"}}>{GateData.CreatedBy? GateData.CreatedBy:"admin"}</div>
                                                        <div style={{color:"#868686"}}>{GateData.CreatedDate}</div>
                                                        {/* <div style={{color:"#868686"}}>14-09-2023, 10:20 am</div> */}
                                                    </div>
                                                </div>
                                                <span>{GateData.GateName}</span>
                                                {/* <span>Gate A</span> */}
                                            </div>
                                )
                        })}
                        
                        {/* <div className="container-home" style={{justifyContent:"space-around"}}>
                            <div style={{display:"flex",alignItems: "baseline"}}>
                                <div className="square" />
                                <div className="container-main">
                                    <div>Rahul M</div>
                                    <div style={{color:"#868686"}}>14-09-2023, 10:20 am</div>
                                </div>
                            </div>
                            <span>Gate A</span>
                        </div> */}

                        {/* <span>kaka M </span>
                        <span>ttaa M </span> */}
                    </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                                <button
                        style={{ background: "#E59515", color: "#FFFFFF", borderRadius:"10px", 
                        fontFamily: "SF Pro Text",fontSize: "14px",fontWeight: "600",
                        lineHeight: "17px",letterSpacing: "0em",textAlign: "center"}}
                        onClick={() => {
                            modalclose()
                        }}
                        >
                        Close
                        </button>
                    </div>

            </div>
        </div>
    )
}

export default GateEntriesList;