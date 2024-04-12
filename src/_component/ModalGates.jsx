import iconPath from './../truckGateIcon.png'
import { formatDate } from './GatesAPI';

function ModalGate({warn,data,modalclose}){

    console.log(data,"mdoal gate data")
    let gateName;
    if(warn)
        gateName = data.map(gate=>gate.Name)
    else
     gateName = data.map(gate=>gate.GateName)


console.log(gateName,"gatename")
    const colorButton = {
        background:warn?"#0CC572":"#F44141",
        color:"white",
        border:"0px solid transparent",
        borderRadius:"10px",
        padding:"5px 20px"

    }

    const date = new Date(); // Current date and time
    const formattedDateTime = formatDate(date);
    

    
    return(
        <div className="modal-overlay" >
            <div className="modal-content spcl" style={{width:"400px"}}>
                <div>
                <div style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
                    <div>
                        <img style={{...colorButton,borderRadius:"50%",padding:"15px"}}src={iconPath} alt="Icon"/>
                    </div>
                    {warn ? (
                        <span>
                            The vehicle has been approved at <strong>
                                {gateName.length > 1?gateName.join(" and "): gateName }
                                </strong> by Rahul M on {formattedDateTime}
                        </span>
                    ) : (
                        <h3>
                            Access to <strong>{gateName.join(" and ")} </strong>has been successfully removed by Rahul M on {formattedDateTime}
                        </h3>
                    )}
                    <button onClick={()=>{modalclose()}} style={{...colorButton}}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalGate;