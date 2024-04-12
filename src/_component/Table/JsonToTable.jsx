import React, { useState } from 'react';
import './JsonToTable.css'
// import 'font-awesome/css/font-awesome.min.css';
// import EditForm from '../Edit Form/EditForm'

function JsonTOTable({ data, entriesPerPageOptions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(entriesPerPageOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [modaledit ,setModaledit ] = useState(false);
  const[EditFormdata , setEditFormdata] = useState();

  const headers = Object.keys(data[0]);
  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if( Object.keys(filteredData).length == 0 ){
    console.log("nofound")
}

  // sort the data based on sortConfig
  if (sortConfig !== null) {
    const { key, direction } = sortConfig;
    filteredData.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const pageCount = Math.ceil(filteredData.length / entriesPerPage);

  function modalClose() {
    setModaledit(false);
    // setShowChild(false)
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value.trim());
    setCurrentPage(1);
  }

    // Dropdown functionality
  function handleEntriesPerPage(event) {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  }

  function handlePageChange(event) {
    setCurrentPage(parseInt(event.target.value));
  }

  function handleSort(key) {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  // function editPopPup(e,rowss){
  //   setModaledit(true);
  //   setEditFormdata(rowss);
  //   console.log(rowss)

  // }

  const startIndex = (currentPage - 1) * entriesPerPage;
  const visibleData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div>
    <div  className='table-box'>
      <div style={{display:'flex' ,justifyContent: 'flex-end'}}>
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
        <div className='input-group'>
        {/* <span className='input-group-addon'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </span> */}
          <input
            className='form-control icon-search'
            aria-label="Text input with dropdown button"
            type="text"
            placeholder="Search Vehicle..."
            value={searchTerm}
            onChange={handleSearch}
          />

        </div>


        {/* <select className='btn btn-outline-secondary dropdown-toggle' value={entriesPerPage} onChange={handleEntriesPerPage}>
          {entriesPerPageOptions.map(option => (
            <option  key={option} value={option}>{option}</option>
          ))}
        </select> */}
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            {headers.map(header => (
              <th scope='col' key={header} onClick={() => handleSort(header)}>
                {header} {sortConfig && sortConfig.key === header && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, i) => (
            <>
                  {/* <th scope="row"></th> */}
            <tr key={i}>
              {headers.map(header => (
                <>
                <td key={header}>{row[header]}</td>
                </>
              ))}
             
            </tr>
            </>
          ))}
        </tbody>
      </table>
        <div style={{display:'flex'}}>
        <div className='pagination'> 
        
        {/* <i className="fa fa-chevron-right" style={{color:"green"}}></i> */}
        <i className={`fa fa-chevron-left ${currentPage == 1 ? 'disabled-arow' : ''}`} style={{border: '5px solid #e595150d'}}
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
        <i className={`fa fa-chevron-right ${currentPage == pageCount ? 'disabled-arow' : ''}`} style={{border: '5px solid #e595150d'}}
        onClick={currentPage === pageCount ? null : ()=>{setCurrentPage(parseInt(currentPage)+1)}}></i>
        </div>
        <div className='pagination'>
        <span>Items per page</span>
          <select className='btn btn-outline-secondary dropdown-toggle' value={entriesPerPage} onChange={handleEntriesPerPage}>
            {entriesPerPageOptions.map(option => (
              <option  key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
          {/* { modaledit && <EditForm selectedData={data[EditFormdata]} show={true} modalClose={modalClose}/>} */}
          </div>

  );
}


//Default props....
JsonTOTable.defaultProps = {
  entriesPerPageOptions: [10, 20, 50],
  data: [],
};


export default JsonTOTable;
