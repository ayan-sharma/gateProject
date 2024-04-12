import React, { useEffect, useState } from 'react';
import { AddDelGAte, GetGates, formatDate } from '../GatesAPI';
import ModalGate from '../ModalGates';
import { vehileList } from '../../demo data/demo';

const DropdownWithCheckboxes = ({ homeDataAPI,updateParentState }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [selectedGates, setSelectedGates] = useState([]);
    const [selectedVeh , setSelectedVeh] = useState()

    const [ gateData , SetGateData] = useState([]);
    const [ AllgateData , SetAllGateData] = useState([]);
    const[succesModal , setSuccesModal] = useState(false);

    const[modalData , setModalData] = useState([])

    function resetState(){
        setSelectedOptions([]);
        setDropdownOpen(false);
        setSelectedVeh([]);
    }

    const stylebox={
        background:"#F6F7FB",border:"1px solid #CED2E3", borderRadius:"10px", height:"30px"
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          const dropdownElement = document.getElementById('dropdown-menu');
          if (dropdownElement && !dropdownElement.contains(event.target)) {
            setDropdownOpen(false);
          }
        };
    
        window.addEventListener('click', handleClickOutside);
    
        return () => {
          window.removeEventListener('click', handleClickOutside);
        };
      }, []);

    function findGatesByVehicleName(vehicleName, gateNames) {
        const vehicle = homeDataAPI.find(vehicle => vehicle.VehicleName === vehicleName);
        if (!vehicle) return [];
      
        const gateNamesToFind = gateNames.map(gate => gate.Name);
        const filteredGates = vehicle.Gates.filter(gate => gateNamesToFind.includes(gate.GateName));

        return filteredGates;
      }

      
      function findMissingGateNames(kaka, gateNames) {
        const kakaGateNames = kaka.map(gate => gate.GateName);
        const missingGateNames = gateNames.filter(gate => !kakaGateNames.includes(gate.Name));
        return missingGateNames;
      }

    useEffect(()=>{
        let gatesShown = findGatesByVehicleName(selectedVeh,AllgateData);
        const gates = findMissingGateNames(gatesShown, AllgateData);

        SetGateData(gates)
    },[selectedVeh,homeDataAPI])

    const handelVehChange=(event)=>{
        setSelectedVeh(event.target.value);
    }
    

    useEffect(()=>{
        async function getGatesHome(){
            try{
                let responseData = await GetGates();
                SetAllGateData(responseData);
                console.log(responseData,"GatesData");

            }
            catch(error){
                console.error(error)
            }
        }
        getGatesHome();
    },[])

    function modalclose(){
        if(succesModal){
            setSuccesModal(false)
            resetState();
        }
    }




    // function AddToState(){
    //     let updateData = homeDataAPI.find(data=>data.VehicleName==selectedVeh);
    //     console.log(selectedOptions,"selected option");
    //     let gateNumber = AllgateData.find(data=>data.Id == selectedOptions);
    //     //update the data in the state array with the new information
    //     console.log(gateNumber,"gateNumber")
    //     const newGate = {
    //         "GateId": Number(selectedOptions),
    //         "GateName": gateNumber.Name,
    //         "CreatedDate": formattedDateTime,
    //         "CreatedBy": "SK"
    //     };       
    //      console.log(newGate,"updateData")
    //      updateData.Gates.push(newGate)
    //     // Find the index of the vehicle to be updated
    //     const index = homeDataAPI.findIndex(vehicle => vehicle.VehicleId === updateData.VehicleId);

    //     // If the vehicle is found, update it
    //     if (index !== -1) {
    //         homeDataAPI[index] = updateData;
    //     }  
    //            console.log(homeDataAPI,"update stae")
    //            updateParentState(homeDataAPI)
    // }


    function AddToState() {
        selectedOptions.forEach(selectedOption => {
            let updateData = homeDataAPI.find(data => data.VehicleName == selectedVeh);
            console.log(selectedOption, "selected option");
    
            let gateNumber = AllgateData.find(data => data.Id == selectedOption);
            console.log(gateNumber, "gateNumber");
            const date = new Date(); // Current date and time
            const formattedDate = formatDate(date);
            const newGate = {
                "GateId": Number(selectedOption),
                "GateName": gateNumber.Name,
                "CreatedDate": formattedDate,
                "CreatedBy": "SK"
            };
    
            console.log(newGate, "newGate");
    
            // Update the data in the state array with the new information
            updateData.Gates.push(newGate);
    
            // Find the index of the vehicle to be updated
            const index = homeDataAPI.findIndex(vehicle => vehicle.VehicleId === updateData.VehicleId);
    
            // If the vehicle is found, update it
            if (index !== -1) {
                homeDataAPI[index] = updateData;
            }
        });
    
        console.log(homeDataAPI, "updated state");
        updateParentState(homeDataAPI);
    }
    
    
    function approveGate (){
        if(selectedOptions.length=== 0)
            {
                alert("Selected Option is empty")
                return
            }
        let vehData = homeDataAPI.find(data=> data.VehicleName === selectedVeh)
        // console.log(selectedOptions,"asa")
 
        console.log(vehData,"veh data")       
        var raw = JSON.stringify({
            "companyId": 110909,
            "vehicleId": vehData.VehicleId,
            "vehicleName": vehData.VehicleName,
            "tagId": "",
            "gateIds": selectedOptions,
            "action": "ADD",
            "createdBy": "SK"
          });
          console.log(raw,"raw")
        AddDelGAte(raw);
        setSuccesModal(true)
        AddToState()
        console.log(selectedOptions,"cahach")
        console.log(AllgateData,"cahach")
        const chacha = AllgateData.filter(gate => selectedOptions.includes(gate.Id.toString()));
        setModalData(chacha);
    }

    
    const handleOptionChange = (event) => {
        const optionValue = event.target.value;
        if (selectedOptions.includes(optionValue)) {
            setSelectedOptions(selectedOptions.filter(option => option !== optionValue));
        } else {
            setSelectedOptions([...selectedOptions, optionValue]);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="container-main" style={{borderTop:"1px solid #868686",borderBottom:"1px solid #868686",padding: "25px 35px"}}>
        <div>
            <div className="heading-gates" style={{fontWeight:"600"}}>Grant Permission</div>
        </div>
        <div className="container-home" style={{width:"60%",alignItems:"flex-end",justifyContent:"space-between",height:"80px"}}>
    <div className="container-main">
        <span className="subHeading-gates" style={{margin:"10px 20px",fontWeight:"500"}}>Vehicle/VIN No.</span>
        <input placeholder="Enter Vehicle Name" onChange={handelVehChange} value={selectedVeh}
            style={{...stylebox,height:"30px",width:"300px",padding:"0px 20px"}}/>
    </div>
        <div className="dropdown-container">
            <span className="subHeading-gates" style={{margin:"10px 20px",fontWeight:"500"}}>Select Gate</span>
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    {selectedOptions.length? `${selectedOptions.length} Gate Selected` :"Select Gate"}                
                 </button>
                <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
                    {gateData.map((gate) => (
                        <label key={gate.Id} className="checkbox-label">
                            <input
                                type="checkbox"
                                value={gate.Id}
                                checked={selectedOptions.includes(String(gate.Id))}
                                onChange={handleOptionChange}
                            />
                            {gate.Name}
                        </label>
                    ))}
                </div>
            </div>
        </div>
        <div style={{display:"flex",alignItems:"flex-end"}}>
                <button style={{
                                ...stylebox,
                                color: "white",
                                width: "100px",
                                background:selectedOptions.length?"#E4990F" :"#F6F7FB",
                                border: selectedOptions.length? '1px solid black':'transparent'
                                
                                }} onClick={()=>{approveGate()}} 
                >Approve</button>
            </div>
            </div>
            {succesModal && <ModalGate warn={true} data={modalData} modalclose={modalclose}/>}
            </div>
    );
};

export default DropdownWithCheckboxes;
