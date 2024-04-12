
const baseUrl = "https://api-locate.com/api/v1.0/indenting/gateaccess"

export async function homeData(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "companyId": 110909
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    try{
    const response = await fetch(`${baseUrl}/companyvehiclegates`,requestOptions);
    const result = await response.json();
    return result
    }
    catch(error){
        return { error: error.message };
    }

// fetch("https://api-locate.com/api/v1.0/indenting/gateaccess/companyvehiclegates", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
}

export async function GetGates(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "companyId": 110909
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    try{
        const request = await fetch(`${baseUrl}/companygates`,requestOptions);
        const response = await request.json();
        return response;
    }
    catch(error){
        console.log("Error in getting Gates : ", error);
    }
    
// fetch("https://api-locate.com/api/v1.0/indenting/gateaccess/companygates", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
}

export async function AddDelGAte(raw){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "companyId": 110909,
//   "vehicleId": 0,
//   "vehicleName": "MEEBBA003K8685592",
//   "tagId": "",
//   "gateIds": [
//     1
//   ],
//   "action": "remove",
//   "createdBy": "SK"
// });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

    try{
        const request = await fetch(`${baseUrl}/manangevehicleaccess`,requestOptions)
        const response = await request.text();
    }
    catch(e){
        console.error(e,"Add del API")

    }
}

let baseUrL2 = "https://api.punkapi.com/v2/"

export async function DemoAPI2(){
    var headers = new Headers();

    headers.append("Content-Type","application/json");

    var requestOptions={
        method:"GET",
        headers:headers,
        redirect:'follow'
    }

    try{
        let dataResponse = await fetch(`${baseUrL2}/beers`,requestOptions);
        let response = await response.json();
        return response;
    }
    catch(e){
        console.error(e)
    }

}

export async function DemoAPI(){
    var headers= new Headers();

    headers.append("Content-Type","application/json")

    var requestOptions={
        method:"GET",
        headers:headers,
        redirect:'follow'
    };

    try{
        let request = await fetch(`${baseUrL2}/beers`,requestOptions);
        let response = await request.json();
        return response;
    }
    catch(e){
        console.error(e)
    }
}

export const formatDate = (date) => {
    const padZero = (num) => (num < 10 ? '0' + num : num); // Add leading zero if needed
  
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // Months are zero-indexed
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  
  