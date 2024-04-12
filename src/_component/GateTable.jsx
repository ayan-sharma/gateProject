import { useEffect, useState } from "react";
// import { vehicles } from "../demo data/demo";
import Pagination from "./Table/Pagination";
import GateEntriesList from "./GateEntriesList";
import { homeData } from "./GatesAPI";
import DeleteGate from "./DeleteGate";
import imageConfirm from "./../ConfirmIcon.png"

const GateTable=( {data , updatedStateDel})=>{
    // const[vehicles , setVehicles]= useState(data)
    console.log('data lenght', data.length);
   // const [vehicles , setVehicles]= useState(data && data.length > 0 ? data : []);

    const vehicles= data;
    const [searchTerm, setSearchTerm] = useState("");
    const[selectedData, setSelectedData] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [confirmedByModal ,setConfirmedByModal] =  useState(false);
    const [GateNameData ,setGateNameData] =  useState(false);
    const [showDelete ,setShowDelete] =  useState(false);

    const [filteredData, setFilteredData] = useState([]);
    
    const[pageNumber , setPageNumber] = useState()

        // useEffect(()=>{
        //     setFilteredData(vehicles)
        // },[vehicles])

        const styleBUtton={
            background:"transparent",
            borderRadius:"10px",
            width:"80%",
            cursor:"pointer",
            ":hover": {
                background: "#132438"
              }
        };
        

        useEffect(() => {
            const handleKeyDown = (event) => {
              if (event.key === 'Escape' ) {
                setGateNameData(false);
              }else if (event.key === 'Enter' || event.keyCode === 13){
                setGateNameData(false);
              }
            };
        
            // Attach the event listener
            window.addEventListener('keydown', handleKeyDown);
        
            // Clean up the event listener on component unmount
            return () => {
              window.removeEventListener('keydown', handleKeyDown);
            };
          }, []);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const responseData = await homeData();
    //             console.log(responseData, "kaka");
    //             setVehicles(responseData);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    
    //     fetchData();
    // }, []);

    useEffect(() => {
        if (searchTerm === "") {
          setFilteredData(vehicles);
        } else {
          let filteredData = Array.isArray(vehicles)
            ? vehicles.filter((row) =>
                Object.values(row).some((value) => {
                  const stringValue =
                    typeof value === "number" ||
                    (typeof value === "string" && value !== null)
                      ? value.toString()
                      : "";
                  return stringValue
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                })
              )
            : [vehicles].filter((row) =>
                Object.values(row).some((value) => {
                  const stringValue =
                    typeof value === "number" ||
                    (typeof value === "string" && value !== null)
                      ? value.toString()
                      : "";
                  return stringValue
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                })
              );
          setFilteredData(filteredData);
        }
      }, [searchTerm, vehicles]);
    
    const changePage=()=>{
        //const pageNumberChange = Number(event.target.value)
        if(pageNumber < 1 || pageNumber > pageCount )
            alert('kk')
        //alert(pageNumberChange)
        //setPageNumber(pageNumberChange)
        setCurrentPage(pageNumber)
    }
    
    function handleSearch(event) {
        const searchTerm = event.target.value.trim();
        setSearchTerm(searchTerm);
        setCurrentPage(1);
      }

      function updatedState(newState){

        console.log(newState,"new state updated");
        let updatedVeh = vehicles.find((data => data.VehicleId == newState.VehicleId))
        updatedVeh.Gates = newState.Gates;
        vehicles.find(data=> 
            {if(data.VehicleId == updatedVeh.VehicleId){
                data= updatedVeh
            }})
        //vehicles.VehicleId[updatedVeh.VehicleId] = updatedVeh
        updatedStateDel(vehicles)
      }



      function handlePageChange(event) {
        setCurrentPage(parseInt(event));
      }

      function modalcloseConfirm(){
        if(confirmedByModal)
            setConfirmedByModal(false)
      }

      function modalcloseDelete (){
        if(showDelete)
            setShowDelete(false)
      }
      const entriesPerPage = 10

      const startIndex = (currentPage - 1) * 10;

      console.log(filteredData,"filerede")

      const visibleData = filteredData.slice(
        startIndex,
        startIndex + entriesPerPage
      );

      const pageCount = Math.ceil(filteredData.length / entriesPerPage);


      function GateName(GateNameData){
            return(
                <div className="modal-overlay">
                    <div className="modal-content spcl">
                    <div onClick={()=>{setGateNameData(false)}} class="cross-btn" style={{left:"135px",top:"-15px"}}></div>
                        <div className="container-main" style={{justifyContent:"space-between",gap:"10px"}}>
                            {Object.values(GateNameData).map((data, index) => {
                                return (
                                    <div key={index} style={{ display: "flex", alignItems: "baseline",gap:"10px" }}>
                                        <div className="square" />
                                        <div className="container-main">
                                            <span>{data.GateName}</span>
                                            {/* <div style={{color:"#868686"}}>14-09-2023, 10:20 am</div> */}
                                        </div>
                                    </div>
                                );
                            })}

                        {/* <span>Gate A</span> */}
                        </div>
                    </div>
                </div>
        )
      }


       if(vehicles.length == 0 )
       return(
        <>
        loading</>
       )

    return(
        <div style={{padding:"20px",background:"#ffffff",margin:"20px",border:"1px solid #ddd",borderRadius:"10px"}}>
            <div className="container-home" style={{justifyContent:"space-between",background:"#F6F7FB",borderRadius:"15px 15px 0px 0px"}}>
                <div className="container-home" style={{justifyContent:"space-between",width:"100%",padding: "15px"}}>
                    <span className="heading-gates" style={{fontWeight:"600"}}> Vehicle List</span>
                <div
                    className="input-group"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <input 
                    className="form-control icon-search"
                    aria-label="Text input with dropdown button"
                    type="text"
                    placeholder="Search Vehicle..."
                    value={searchTerm}
                    onChange={handleSearch}
                    />
                </div>
              </div>

            </div>{
            visibleData.length == 0 ? (
          <div style={{ textAlign: "center" , height:"400px" }}>No Result Found</div>
        ) : (
            <div className="table-container">
            <table style={{ width: "100%", borderCollapse: "collapse"}}>
                <thead style={{ position: "sticky", top: "0%", zIndex: "3" }}>
                    <tr >
                        <th style={{ width: "5%" }}>S.N.</th>
                        <th style={{ width: "25%" }}>Vehicle/VIN No.</th>
                        <th style={{ width: "20%" }}>Entry Gates</th>
                        <th style={{ width: "25%" }}>Last Confirmation Date/Time</th>
                        <th style={{ width: "15%" }}>Confirmed By</th>
                        <th style={{ width: "10%" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleData.map((vehicle, index) => (
                        <tr key={index}>
                            <td  style={{ width: "5%" }}>{index + 1}</td>
                            <td  style={{ width: "25%" }}>{vehicle.VehicleName}</td>
                            {/* <td style={{ display:"inline",background:"#D0FAE2",padding:"0px 10px",position:"relative",top: "13px"}} 
                            onClick={() =>{ setGateNameData(!GateNameData);setSelectedData(vehicle.Gates)}}>{`${vehicle.Gates.length} gates`}</td> */}
                            <td style={{ position: "relative" }} onClick={() => { setGateNameData(!GateNameData); setSelectedData(vehicle.Gates)}}>
                                <span style={{ background: "#D0FAE2", padding: "0px 10px" ,cursor:"pointer"}}>{`${vehicle.Gates.length} ${vehicle.Gates.length == 1 ? 'Gate':'Gates'} `}</span>
                            </td>

                            {/* {GateNameData && GateName(vehicle.Gates)} */}
                            <td  style={{ width: "25%" }}>{vehicle.Gates.length > 0 ? vehicle.Gates[vehicle.Gates.length - 1].CreatedDate : ''}</td>
                            <td style={{ width: "15%" }} onClick={() => {setConfirmedByModal(!confirmedByModal);setSelectedData(vehicle)}}>
                              <span style={{cursor:"pointer"}}> 
                                 {`${vehicle.Gates.map((data,index) => 
                                    index < 2 ? (data.CreatedBy?data.CreatedBy:"admin"):""
                                )} `}</span>
                                <span>
                                    <img src={imageConfirm} style={{position:"absolute",top:"5px",left:"95px",cursor:"pointer"}}/>
                              </span>
                            </td>
                            <td  style={{ width: "10%" }}>
                                {/* <button style={{background:"transparent",borderRadius:"10px",width:"80%",cursor:"pointer"
                                ,"&:hover":{background: "#132438"}}} */}
                                <button className="custom-button"
                                
                                onClick={()=>{setShowDelete(!showDelete);setSelectedData(vehicle)}}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>)}

            <div style={{display:"flex"}}>
                <div style={{width:"25%"}}></div>
                <div style={{width:"40%",display:"flex",background:"#F6F7FB"}}>
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
                </div>
                <div style={{background:"#F6F7FB"}}>
                    Go To Page
                    <input className="fotter-input"
                    //onChange={changePage} 
                    value={pageNumber} onChange={(e)=>{setPageNumber(Number(e.target.value))}}
                    />
                    Go
                    <button onClick={changePage}  style={{background:"transparent",border:"1px solid",borderRadius:"6px"}}>
                        <i className={`fa fa-chevron-right`}/>
                    </button>
                </div>
            </div>

            {GateNameData && GateName(selectedData)}

            {confirmedByModal && (<GateEntriesList data={selectedData} modalclose={modalcloseConfirm}/> )}

            {showDelete && (<DeleteGate data={selectedData}  modalclose={modalcloseDelete} updatedState={updatedState}/> )}
        </div>
    )
}

export default GateTable;