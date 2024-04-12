import { useEffect, useState } from "react";
import {gates} from "../../demo data/demo"
import DeleteGate from "../DeleteGate";
import GateEntriesList from "../GateEntriesList";
import GateTable from "../GateTable";
import ModalGate from "../ModalGates";
import "../Table/JsonToTable.css"
import { AddDelGAte, GetGates, homeData } from "../GatesAPI";
import DropdownWithCheckboxes from "./DropdownWithCheckboxes";
function Home(){
    const [ gateData , SetGateData] = useState([]);

    const [homeDataAPI , setHomeDataAPI] = useState([])
    const [selectedGates, setSelectedGates] = useState([]);
    const [selectedVeh , setSelectedVeh] = useState()

    const [updatedState , setUpdateState] = useState([]);


    const handleSelectedGatesChange = (selectedOptions) => {
        console.log(selectedGates)
        
        setSelectedGates(selectedOptions);
    };

    const handelVehChange=(event)=>{
        setSelectedVeh(event.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const responseData = await homeData();
                console.log(responseData, "kaka");
                setHomeDataAPI(responseData);
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchData();
    }, []);

    function approveGate (){
        // alert(selectedVeh)
        let vehData = homeDataAPI.find(data=> data.VehicleName === selectedVeh)
        // const gateIds = selectedGates.map(gate => gate.GateId);
        console.log(selectedGates,"asa")
 
        console.log(vehData,"veh data")       
        var raw = JSON.stringify({
            "companyId": 110909,
            "vehicleId": vehData.VehicleId,
            "vehicleName": vehData.VehicleName,
            "tagId": "",
            "gateIds": selectedGates,
            "action": "ADD",
            "createdBy": "SK"
          });
          console.log(raw,"raw")
        AddDelGAte(raw);
    }

    const stylebox={
        background:"#F6F7FB",border:"1px solid #CED2E3", borderRadius:"10px", height:"30px"
    }

    useEffect(()=>{
        async function getGatesHome(){
            try{
                let responseData = await GetGates();
                SetGateData(responseData);
                console.log(responseData,"GatesData");

            }
            catch(error){
                console.error(error)
            }
        }
        getGatesHome();
    },[])

    const updateParentState = (newState) => {
        setUpdateState(newState);
        //setHomeDataAPI(newState);
      };

      const updatedStateDel=(newState)=>{
        console.log(newState)
        //setUpdateState(newState);
      }

      useEffect(()=>{
        setHomeDataAPI(updatedState);
      },[updatedState])

    return(
        <div className="container-main">
            <div className="container" style={{padding:"10px"}}>
                <h4>Gate In (Grant Vehicle Permission)</h4>
            </div>    
            <DropdownWithCheckboxes homeDataAPI={homeDataAPI}  updateParentState={updateParentState}/>
            <div style={{background:"#F0F5FE"} }>           
                 <GateTable data={homeDataAPI} updatedStateDel={updatedStateDel}/>
            </div>

        </div>
    );
}

export default Home;