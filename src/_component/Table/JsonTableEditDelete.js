import React, { useState, useEffect, useContext } from "react";
// import './JsonToTable.css'
import EditForm from "../Edit Form/EditForm";
import filterPng from "../../Filter.png";
import TableToExcel, { excelDownload } from "../../_helpers/excel";
import Iframe from "../Iframe/Iframe";
import EditWin from "../Edit Win/EditWin";
import { getEditWinAPi } from "../../API";
import {
  replaceKeysWithHeadings,
  replaceHeadingWithKey,
  storeEditdata,
  getDocType,
  getDocTypeForUpload,
  getfilterType,
  filterTable,
  addSerialNumber,
  dateDisplay,
  findVehicleRcNoByName,
  filterTabletry,
  
} from "../../_helpers/common";
import { FinnalEditWin } from "../../_constants/DemoData";
import Modal from "../Modal/Modal";
import Pagination from "./Pagination";
import CustomDropdownContext from "../../Newcontext";

function JsonTableEditDelete({
  data,
  entriesPerPageOptions,
  heading,
  searchEnable,
  icons,
  filter,
  TableFotter,
  downloadBtn,
  editOrignlResp,
}) {
  // console.log(data, "datatable");
  //#region useState
  const contextUse = useContext(CustomDropdownContext);

  const [docDetailsFlag, setDocDetailsFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(
    entriesPerPageOptions[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [modaledit, setModaledit] = useState(false);
  const [showImage, setShowImage] = useState();
  const [iframeLink, setIframeLink] = useState();
  const [showEditWin, setShowEditWin] = useState();
  const [EditWinData, setEditWinData] = useState();

  const [showFilter, setShowFilter] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [editAPIResponse, setEditAPIResponse] = useState();
  const [dateedit, setDateedit] = useState(false);

  const [filteredData, setFilteredData] = useState(data);
  const [filterByType, setFilterByType] = useState();

  const [ typeFilterSelected , setTypeFilterSelected ] = useState('')
  const [ statusFilterSelected , setStatusFilterSelected ] = useState('')

  const[ uploadtype , setUploadtype] = useState(false)

  //#endregion

  //#region Functions

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  async function fetchData(vehname, doctype) {
    let rcNum = findVehicleRcNoByName(contextUse.data["docList"], vehname);
    
    alert(rcNum);
    try {
      const responseJson = await getEditWinAPi(vehname, rcNum, doctype);
      console.log("Response:", responseJson);
      // storeEditdata(responseJson);

      const data = responseJson;
      setEditAPIResponse(data);
      const { docdetail, ...prefinaldata } = data;
      Object.assign(prefinaldata, docdetail);
      const {
        id,
        cid,
        vehicle_rcno,
        vehicle_id,
        created_date,
        update_date,
        ...finaldata
      } = prefinaldata;
      setEditWinData(finaldata);
      // console.log(finaldata,"tuv imp h ")
      setShowEditWin(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleEditWin(editData, index) {
    console.log(editData, "edit");
    setEditWinData(editData);
    setShowEditWin(true);
    setEditAPIResponse(editOrignlResp[index]);
  }

  // useEffect(() => {
  //   setSelectedFilters([...appliedFilters]);
  // }, [appliedFilters, showFilter]);

  // const headers = Array.isArray(data) ? Object.keys(data[0]) : Object.keys(data);
  const headers = Object.keys(data[0]).filter(
    (header) =>
      header !== "Vehicle Registration Number" &&
      header !== "Document ID" &&
      header !== "vehicle_id" &&
      header !== "docType"
  );

  // let filteredData = Array.isArray(data)
  // ? data.filter((row) =>
  //     Object.values(row).some((value) => {
  //       const stringValue =
  //         typeof value === "number" || (typeof value === "string" && value !== null)
  //           ? value.toString()
  //           : "";
  //       return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
  //     })
  //   )
  // : [data].filter((row) =>
  //     Object.values(row).some((value) => {
  //       const stringValue =
  //         typeof value === "number" || (typeof value === "string" && value !== null)
  //           ? value.toString()
  //           : "";
  //       return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
  //     })
  //   );

  if (Object.keys(filteredData).length === 0) {
    console.log("nofound")
  }

  // const headings= heading;

  // const typeFilter = [
  //   "Permit",
  //   "State Permit",
  //   "Fitness",
  //   "Insurance",
  //   "RC",
  //   "Road Tax ",
  //   "PUC",
  //   "Danda Tax",
  //   "Other",
  // ];
  const typeFilter = ["Permit", "Fitness", "Insurance", "Registration Certificate (RC)", "Other", "Road Tax", "PUC", "Dandatax","State Permit"];
  const statusesFilter = [
    "Normal",
    "No Record",
    "Expired",
    "Expiring in 30 Days",
    "Incomplete"
  ];

  // Check if filteredData is empty and selectedFilters contains "-401"

  // sort the data based on sortConfig
  if (sortConfig !== null) {
    const { key, direction } = sortConfig;
    filteredData.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const pageCount = Math.ceil(filteredData.length / entriesPerPage);

  function modalClose() {
    setModaledit(false);
    // setShowChild(false)
  }

  // function handleSearch(event) {
  //   setSearchTerm(event.target.value.trim());
  //   setCurrentPage(1);
  //   if (event.target.value.trim() === '')
  //     setFilteredData(data);
  //   else{let filteredData = Array.isArray(data)
  //   ? data.filter((row) =>
  //       Object.values(row).some((value) => {
  //         const stringValue =
  //           typeof value === "number" || (typeof value === "string" && value !== null)
  //             ? value.toString()
  //             : "";
  //         return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
  //       })
  //     )
  //   : [data].filter((row) =>
  //       Object.values(row).some((value) => {
  //         const stringValue =
  //           typeof value === "number" || (typeof value === "string" && value !== null)
  //             ? value.toString()
  //             : "";
  //         return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
  //       })
  //     );
  //     setFilteredData(filteredData)
  //   }
  // }
  function handleSearch(event) {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  }

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      let filteredData = Array.isArray(data)
        ? data.filter((row) =>
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
        : [data].filter((row) =>
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
  }, [searchTerm, data]);


  // Dropdown functionality
  function handleEntriesPerPage(event) {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  }

  function handlePageChange(event) {
    setCurrentPage(parseInt(event));
  }

  function handleSort(key) {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  }

  function filterUI() {
    setShowFilter(!showFilter);
  }

  console.log(appliedFilters,"doc ka sbse imp")
  function applyFilter() {
    setAppliedFilters(      
     statusFilterSelected+
    typeFilterSelected)
    setShowFilter(false);

    // If there are no records and filter 401 is selected, filter out records with -401
    const finalFilteredData = statusFilterSelected.length || typeFilterSelected.length
      // ? filterTabletry(filteredData, statusFilterSelected , typeFilterSelected)
      ? filterTabletry(data, statusFilterSelected , typeFilterSelected)
      : filteredData;
    // const finalFilteredData = selectedFilters.length
    //   ? filterTable(filteredData, selectedFilters)
    //   : filteredData;
    // alert(selectedFilters)
    setFilteredData(finalFilteredData);
    console.log(filteredData, "filteredData");
  }

  const handleTypeFilterClick = (filter) => {
    setTypeFilterSelected((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filter)) {
        // Remove the filter if already selected
        return prevSelectedFilters.filter(
          (selectedFilter) => selectedFilter !== filter
        );
      } else {
        // Add the filter if not already selected
        return [...prevSelectedFilters, filter];
      }
    });

    console.log(selectedFilters, "selectedFilters TypeFilter");
    // if (Object.values(selectedFilters).includes(typeFilter)) {
    //   alert("Ll");
    // }
    // alert(count)
  };

  const handlestatusFilterClick = (filter) => {
    setStatusFilterSelected((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filter)) {
        // Remove the filter if already selected
        return prevSelectedFilters.filter(
          (selectedFilter) => selectedFilter !== filter
        );
      } else {
        // Add the filter if not already selected
        return [...prevSelectedFilters, filter];
      }
    });

    console.log(selectedFilters, "selectedFilters statusFilter");
    // if (Object.values(selectedFilters).includes(typeFilter)) {
    //   alert("Ll");
    // }
    // alert(count)
  };
  // const handleFilterClick = (filter) => {
  //   setSelectedFilters((prevSelectedFilters) => {
  //     if (prevSelectedFilters.includes(filter)) {
  //       // Remove the filter if already selected
  //       return prevSelectedFilters.filter(
  //         (selectedFilter) => selectedFilter !== filter
  //       );
  //     } else {
  //       // Add the filter if not already selected
  //       return [...prevSelectedFilters, filter];
  //     }
  //   });

  //   console.log(selectedFilters, "selectedFilters as");
  //   if (Object.values(selectedFilters).includes(typeFilter)) {
  //     alert("Ll");
  //   }
  //   // alert(count)
  // };

  function filterData() {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div>
            <h2 className="main heading">Sort Vehicle List by</h2>
          </div>
          <div>
            <p className="sub heading" style={{ color: "#201F27" }}>
              <b>Type({(typeFilterSelected.length ? typeFilterSelected.length : '-')})</b>
            </p>
            <div>
              {typeFilter.map((type) => {
                return (
                  <>
                    {/* <button style={{margin:"1%"}}>{type}</button> */}
                    <button
                      key={type}
                      className=" sub heading"
                      style={{
                        borderRadius: "10px",
                        margin: "1%",
                        backgroundColor: typeFilterSelected.includes(type)
                          ? "#FDF4E7"
                          : "#FAFBFE",
                        color: typeFilterSelected.includes(type)
                          ? "#E59515"
                          : "#868686",
                      }}
                      onClick={() => handleTypeFilterClick(type)}
                    >
                      {type}
                    </button>
                  </>
                );
              })}
            </div>
            <p className="sub heading" style={{ color: "#201F27" }}>
              <b>Status({(statusFilterSelected.length ? statusFilterSelected.length : '-')}) </b>
            </p>
            <div>
              {statusesFilter.map((status) => {
                return (
                  <>
                    {/* <button style={{margin:"1%"}}>{status}</button> */}
                    <button
                      key={status}
                      className=" sub heading"
                      style={{
                        borderRadius: "10px",
                        margin: "1%",
                        backgroundColor: statusFilterSelected.includes(status)
                          ? "#FDF4E7"
                          : "#FAFBFE",
                        color: statusFilterSelected.includes(status)
                          ? "#E59515"
                          : "#868686",
                      }}
                      onClick={() => handlestatusFilterClick(status)}
                    >
                      {status}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => {
                applyFilter();
              }}
            >
              Apply
            </button>
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                appliedFilters.length && setSelectedFilters([]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handeleframe(link) {
    setIframeLink(link);
    setShowImage(true);
  }

  const modalclose = () => {
    if (showImage) setShowImage(false);
    if (showEditWin) setShowEditWin(false);
  };

  const handleUpload = (e, veh, header) => {
    contextUse.handlleVehchange(veh);
    const vehDropDownn = document.getElementById("vechDropdown");
    // vehDropDownn.value=veh;
    // alert(header)
    // vehDropDownn.placeholder=veh;
    // alert(getDocTypeForUpload(header))
    if (contextUse.selectedDocOption == getDocTypeForUpload(header)) {
      document.getElementById("fileType").value = getDocTypeForUpload(header);
    } else {
      contextUse.handlleDocchange(getDocTypeForUpload(header));
    }

    // document.getElementById('fileType').placeholder=header;

    vehDropDownn.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  //#endregion

  const startIndex = (currentPage - 1) * entriesPerPage;
  const visibleData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );
  const date = new Date();


  // TableFotter=visibleData.length > 9 ? true : false

  
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;


  return (
    <div>
      <div className="table-box"
      style={icons == "hyperlink"?{margin:"0px"}:{}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "48%" }}>
            {/* <p><b>Vehicle List</b></p> */}
            <p className="main heading">
              <b>{heading ? heading["main"] : ""}</b>
            </p>
            <p className="sub heading marginSub">
              {heading ? heading["sub"] : ""}
            </p>
            {/* <p>List of all vehicles with submitted/not submitted documents</p> */}
          </div>
          {downloadBtn ? <TableToExcel data={data} filename={currentDate} 
           flag={icons=== "normal" ? true: false}/> : ""}
          {filter ? (
            <div>
              {/* {appliedFilters.length?<button>Remove Filters{appliedFilters.length?appliedFilters.length:""}</button>:""} */}

              <button
                className="btn1 sub heading"
                onClick={() => {
                  appliedFilters.length && setAppliedFilters([]);
                  statusFilterSelected.length && setStatusFilterSelected([]);
                  typeFilterSelected.length && setTypeFilterSelected([]);

                  setFilteredData(data);
                }}
                style={{
                  marginRight: "10px",
                  padding: "12px 16px",
                  ...(appliedFilters.length
                    ? {
                        background: statusFilterSelected.length || typeFilterSelected.length
                          ? "#E59515"
                          : "#F6F7FB",
                        color:
                          statusFilterSelected.length || typeFilterSelected.length
                            ? "#FFF"
                            : undefined,
                        cursor:
                          statusFilterSelected.length || typeFilterSelected.length
                            ? "pointer"
                            : "auto",
                      }
                    : {}),
                }}
                
              >
                Remove Filters (
                {statusFilterSelected.length || typeFilterSelected.length? statusFilterSelected.length + typeFilterSelected.length:""})
              </button>
              {/* <button onClick={filterUI} >filter</button> */}
              <img
                style={{ marginBottom: "-17px", cursor: "pointer" }}
                src={filterPng}
                alt="Filter"
                onClick={filterUI}
              />
            </div>
          ) : (
            ""
          )}
          <div>
            {/* <input className='form-control '  aria-label="Text input with dropdown button" 
        type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} /> */}

            {/* <div className='input-group'>
  <input className='form-control' aria-label="Text input with dropdown button" 
         type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
  <div className='input-group-append'>
    <span className='input-group-text'>
      <i className='fa fa-search' aria-hidden='true'></i>
    </span>
  </div>
</div> */}
            {searchEnable ? (
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
            ) : (
              ""
            )}
          </div>
        </div>
        {visibleData.length == 0 ? (
          <div style={{ textAlign: "center" }}>No Result Found</div>
        ) : (
          <>
            <div
              className="table-container"
              style={icons === "normal" ? { height: "400px" } : {}}
            >
              <table className="table ">
                <thead style={{ position: "sticky", top: "0%", zIndex: "3" }}>
                  <tr>
                    {headers.map((header) => (
                      <th
                        className="sub heading"
                        style={{ color: "#201F27", textAlign: "center" }}
                        scope="col"
                        key={header}
                        onClick={() => handleSort(header)}
                      >
                        {header === "imgpath" ? "Edit" : header}{" "}
                        {sortConfig &&
                          sortConfig.key === header &&
                          (sortConfig.direction === "ascending" ? "▲" : "▼")}
                      </th>
                    ))}
                    {/* <th scope='col'>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((row, i) => (
                    <>
                      {/* <th scope="row"></th> */}
                      <tr key={i}
                      // style={{height:"50px"}}
                      >
                        {headers.map((header) => (
                          <>
                            <td
                              className="sub heading"
                              style={{
                                fontWeight: '600',
                                color: header === "Expiry Date" ? "#E22929" : "#201F27"
                            }}
                              key={header}
                            >
                              {icons == "plane" ? (
                                <>
                                  {row[header] === -1 ? (
                                    <i
                                      className="clickable fa-solid fa-clock-rotate-left fa-flip-horizontal"
                                      onClick={() => {
                                        fetchData(row["Vehicle Name"], header);
                                      }}
                                      style={{
                                        color: "#201F27",
                                        background: "#F6F7FB",
                                        padding: "10px",
                                        borderRadius: "7.5px",
                                      }}
                                    ></i>
                                  ) : row[header] >= 31  &&
                                      header != "Serial No."? (
                                    <i
                                      className="fa-solid fa-check "
                                      style={{
                                        background: "rgb(246, 247, 251)",
                                        padding: "10px",
                                        fontSize: "1.05rem",
                                        borderRadius: "7.5px",
                                      }}
                                      title="Completed"
                                      onClick={() => {
                                        fetchData(row["Vehicle Name"], header);
                                        setDateedit(true);
                                      }}
                                    ></i>
                                  ) : row[header] === 0 ? (
                                    <i
                                      className="clickable fa-solid fa-pen"
                                      style={{
                                        background: "#F6F7FB",
                                        padding: "10px",
                                        borderRadius: "7.5px",
                                      }}
                                      onClick={() => {
                                        fetchData(row["Vehicle Name"], header);
                                        setDateedit(true);
                                        setUploadtype(true)

                                      }}
                                      title="Edit"
                                    />
                                  ) : row[header] === -401 ? (
                                    <i
                                      className={`clickable fa-solid fa-arrow-up-from-bracket `}
                                      style={{
                                        borderRadius: "7.5px",
                                        padding: "10px",
                                        background: "#F6F7FB",
                                      }}
                                      onClick={(event) => {
                                        handleUpload(
                                          event,
                                          row["Vehicle Name"],
                                          header
                                        );
                                      }}
                                      title="Upload"
                                    />
                                  ) : /\d/.test(row[header]) &&
                                    header != "Serial No." &&
                                    header != "Vehicle Name" ? (
                                    <span
                                      className="clickable fa-stack "
                                      style={{
                                        background: "#F6F7FB",
                                        borderRadius: "7.5px",
                                      }}
                                      onClick={() => {
                                        fetchData(row["Vehicle Name"], header);
                                        setDateedit(true);
                                      }}
                                      title="Expiring soon"
                                    >
                                      <i
                                        className=" fas  fa-stack-1x"
                                        style={{ color: "#F6F7FB" }}
                                      ></i>
                                      <i
                                        className="fas fa-stack-1x"
                                        style={{ color: "black" }}
                                      >
                                        {/* {row[header]} */}
                                        30
                                      </i>
                                    </span>
                                  ) : (
                                    row[header]
                                  )}
                                  {/* {row[header]} */}
                                </>
                              ) : icons == "hyperlink" ? (
                                <>
                                  {header != "docName" &&
                                  header != "Document Type" && 
                                  header != "Serial No." &&
                                  row[header] != 0 ? (
                                    <a
                                      onClick={() => {
                                        contextUse.getDocDetailDataByType(
                                          row["docType"],
                                          header
                                        );
                                        alert(
                                          `${row["docType"]} and ${header}`
                                        );
                                      }}
                                      href="#"
                                      style={{
                                        color: "#3A63BB",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {row[header]}
                                    </a>
                                  ) : header == "imgpath" ? (
                                    <i
                                      class="fa-solid fa-image"
                                      onClick={() => {
                                        handleEditWin(row);
                                        alert(row);
                                      }}
                                    />
                                  ) : (
                                    row[header]
                                  )}
                                </>
                              ) : (
                                <>
                                  {icons == "normal" ? (
                                    <>
                                      {header === "imgpath" ? (
                                        <i
                                          className="clickable fa-solid fa-pen"
                                          style={{
                                            background: "#F6F7FB",
                                            padding: "10px",
                                            borderRadius: "7.5px",
                                          }}
                                          onClick={() => {
                                            // alert(i)
                                            handleEditWin(row, i);
                                            setDateedit(true);
                                            setDocDetailsFlag(true);
                                          }}
                                        />
                                      ) : header === "Issue Date" ? (
                                        dateDisplay(row[header])
                                      ) : header === "WEF Date" ? (
                                        dateDisplay(row[header])
                                      ) : header === "Expiry Date" ? (
                                        dateDisplay(row[header])
                                      ) : header === "Document Type" ? (
                                        row[header] === null ? (
                                          ""
                                        ) : (
                                          getDocType(row[header])
                                        )
                                      ) 
                                        // :(row[header] === null || row[header] === '' ||row[header] === 'Invalid Date	' ) ?""
                                      
                                       : (
                                        row[header]
                                      )}
                                    </>
                                  ) : (
                                    row[header]
                                  )}
                                </>
                              )}
                            </td>
                          </>
                        ))}
                        {/* demo data imp */}
                        {/* <td >
                        <span className="fa-stack fa-sm" onClick={()=>{alert('clicked')}}>
                            <i className="fas fa-circle fa-stack-2x" style={{color:"#E59515"}}></i>
                            <i className="fas fa-stack-1x" style={{ color: 'white' }}>1</i>
                        </span>   
                        <i className="fa fa-circle-check fa-lg" onClick={()=>{alert('clicked red')}}style={{color:"red"}} ></i>
                        <i className="fa fa-circle-check fa-lg" style={{color:"green"}}></i>
                        <i className="fa fa-circle-check fa-lg" style={{color:"#E59515"}}></i>
                        <i className="fa fa-image fa-lg" style={{color:"#E22929"}}></i>

                        <button type="button"  className='btn1' style={{background:"#E22929"}}
                        onClick={(event)=>{handleUpload(event,row['Vehicle No'])}}>Upload</button>
                        <button type="button"  className='btn1' style={{background:"#15A7E5"}}>Edit</button>
                        </td> */}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {TableFotter ? (
          <div style={{ display: "flex", marginTop: "1%",alignItems:"center"}}>
            {visibleData.length > 0 ? (
              <>
                <div className="sub heading" style={{ width: "24%" }}>
                  showing {visibleData[0]["Serial No."]}-
                  {
                    visibleData[
                      Object.keys(visibleData)[
                        Object.keys(visibleData).length - 1
                      ]
                    ]["Serial No."]
                  }{" "}
                  of {data.length} results
                </div>

                {/* <div className='pagination'> 
                <i className={`fa fa-chevron-left ${currentPage == 1 ? 'disabled-arow' : ''}`} style={{border: '5px solid #ffffff00'}}
                onClick={currentPage === 1 ? null :()=>{setCurrentPage(parseInt(currentPage)-1)}}></i>
          
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                    <div className='"page-item'>
                    <button 
                      className={`page-link ${page === currentPage ? 'active' : 'disabled'}`}
                      key={page} value={page} onClick={handlePageChange} disabled={page === currentPage}
                    >
                      {page}
                    </button>
                    </div>
                  ))}
                <i className={`fa fa-chevron-right ${currentPage === pageCount ? 'disabled-arow' : ''}`} style={{border: '5px solid #ffffff00'}}
                onClick={currentPage === pageCount ? null : ()=>{setCurrentPage(parseInt(currentPage)+1)}}></i>
                </div> */}

                <Pagination
                  pageCount={pageCount}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
                <div className="pagination">
                  <span className="sub heading">Items per page</span>
                  <select
                    className="btn btn-outline-secondary dropdown-toggle"
                    value={entriesPerPage}
                    onChange={handleEntriesPerPage}
                  >
                    {entriesPerPageOptions.map((option) => (
                      <option
                        className="dropdown-option"
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {showFilter && <>{filterData()}</>}

      {showImage && <Iframe pictureUrls={iframeLink} />}
      {/* {showImage &&  < EditWin data={iframeLink} editWindow={false} modalclose={modalclose} />} ->Not using this for now*/}

      {showEditWin && (
        <EditWin
          data={replaceKeysWithHeadings(EditWinData)}
          calender={dateedit}
          editWindow={true}
          modalclose={modalclose}
          jsonreponse={editAPIResponse}
          flag={docDetailsFlag}
          upploadUpdateFlag = {uploadtype}
        />
      )}

      {modaledit && (
        <Modal
          errorUI={true}
          subheading={"No Data FOound"}
          modalclose={modalClose}
        />
      )}
      {/* { showFilter && <EditForm  show={true} modalClose={modalClose}/>} */}
      {/* { modaledit && <EditForm selectedData={data[EditFormdata]} show={true} modalClose={modalClose}/>} */}
    </div>
  );
}

//Default props....
JsonTableEditDelete.defaultProps = {
  entriesPerPageOptions: [10, 20, 50],
  data: [],
  icons: false,
  searchEnable: true,
  filter: false,
  TableFotter: false,
  downloadBtn: true,
  editOrignlResp: {},
  heading: {},
};

export default JsonTableEditDelete;
