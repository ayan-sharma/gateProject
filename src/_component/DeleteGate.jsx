import { useState , useEffect} from "react";
import {gates} from "../demo data/demo";
import { AddDelGAte } from "./GatesAPI";
import ModalGate from "./ModalGates";

const DeleteGate=({data,modalclose ,updatedState})=>{

    console.log(data,"Daya dele")
    const [gates, setGates] = useState(data.Gates);
    const [tempGates, setTempGates] = useState([]);
    const [deletedGates, setDeletedGates] = useState([]);

    const [showDelModal , setDelModal]= useState(false);

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

      function modalcloseDel(){
            if(showDelModal){
                setDelModal(false)
                modalclose();
            }

      }
    
    console.log(deletedGates,"deleted gate")

    const handleDelete = (gateId) => {
        console.log("Deleting gate with ID:", gateId);
        const updatedGates = gates.filter(gate => gate.GateId !== gateId);
        console.log("Updated gates after deletion:", updatedGates);
        const deletedGate = gates.find(gate => gate.GateId === gateId);
        console.log("Deleted gate:", deletedGate);
        if (deletedGate) {
            setTempGates([...tempGates, deletedGate]);
            setGates(updatedGates);
        } else {
            console.log("Gate not found with ID:", gateId);
        }
    };

    const handleUndo = () => {
        const restoredGate = tempGates.pop();
        setGates([...gates, restoredGate]);
        setDeletedGates(deletedGates.filter(gate => gate.GateId !== restoredGate.GateId));
        setTempGates([...tempGates]); // Update tempGates to trigger re-render
    };

    const handleSave = () => {
        // Send deletedGates to the API
        console.log("Deleted gates to be saved:", deletedGates);
        // Reset deletedGates state
        const gateIds = tempGates.map(gate => gate.GateId);
        var raw = JSON.stringify({
            "companyId": 110909,
            "vehicleId": data.VehicleId,
            "vehicleName": data.VehicleName,
            "tagId": "",
            "gateIds": gateIds,
            "action": "DEL",
            "createdBy": "SK"
          });
          AddDelGAte(raw);
        setDeletedGates([]);
        setDelModal(true)
        DelState()
    };

    function DelState(){
        console.log(deletedGates,"deleted Gate")
        console.log(tempGates,"tempGates Gate")
        console.log(data,"data Gate")
       // const DeleteSate =data.Gates.filter(datas=> datas.GateId == tempGates.GateId  );
        const updatedGates =data.Gates.filter(gate=> !tempGates.some(g=>g.GateId === gate.GateId));
        const updatedVehicle = { ...data, Gates: updatedGates };

        console.log(updatedVehicle,"try")

        updatedState(updatedVehicle);
    }
    console.log(gates,"adadhahdihajd mdjasfjkbj bjskjfaskj jabjkdb")

 
    return(
        <div className="modal-overlay" >
            <div className="modal-content spcl" style={{width:"400px"}}>
                <div className="container-home" style={{justifyContent:"space-between",padding:"10px"}}>
                    <div className="subHeading-gates">
                        Remove Gate Access
                    </div>
                    <div onClick={modalclose} class="cross-btn"></div>
                </div>
                <div className="container-main" style={{background:"#F6F7FB",padding:"10px",gap:"10px"}}>
                    <span style={{color:"#868686"}}>
                        Vehicle/VIN No.
                    </span>
                    <span className="subHeading-gates" style={{color:"black"}}>
                        {data.VehicleName}     
                    </span>
                </div>
                <div style={{overflowY:"auto"}}>
                    {gates.map((gate,index)=>{
                        return(
                            <div key={index} className="container-home" style={{justifyContent:"space-between",background:"#F6F7FB",margin:"10px 5px", borderRadius:"10px",padding:"10px"}}>
                            <div style={{display:"flex",alignItems: "center",gap:"10px"}}>
                            <div className="square"/>
                            <div>{gate.GateName}</div>
                            </div>
                            <div>   
                                <button style={{background:"#132438",color:"#ffffff",borderRadius:"10px"}} onClick={() => handleDelete(gate.GateId)}>Delete</button>
                            </div>
                            </div>
                        )
                    })}
                </div>
                {tempGates.length ?
                <div className="container-home" style={{justifyContent:"center",gap:"20px"}}>
                    <button style={{borderRadius:"10px",background:"Transparent",border:"1px solid black"}} onClick={handleUndo} disabled={tempGates.length === 0}>Undo</button>
                    <button style={{borderRadius:"10px",background:"#E59515",color:"white"}}onClick={handleSave} disabled={tempGates.length === 0}>Save</button>
                </div> :""}
            </div>
                    {showDelModal && <ModalGate warn={false} data={tempGates} modalclose={modalcloseDel}/>}
        </div>
    )
}

export default DeleteGate;