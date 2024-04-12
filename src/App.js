import logo from './logo.svg';
import './App.css';
import Home from './_component/screen/Home'
import './gates.css';
import { useState } from 'react';

const filesStructure = {
  childern: [
    {
      name: "node_modules",
      childern: [
        {
          name: "1st layer",
          childern: [
            {
              name: "2nd layer"
            }
          ]
        }
      ]
    },
    {
      name: "jsfile",
      childern: [
        {
          name: "kaka"
        }
      ]
    },
    {
      name: "mama"
    }
  ]
};

function EntryList({name,childern,depth}){
  //console.log(name,"aja")
  const [isOpen , setIsOpen ] = useState(false)
  
  return(
    <div>
      <div style={{paddingLeft:`${depth*10}px`}}>
        <button onClick={()=>{setIsOpen(!isOpen)}}>
        {name}
        </button>
        {isOpen && (
          <div style={{paddingLeft:`${depth*10}px`}}>
        {childern && childern.length > 0 &&  childern.map(data=> <EntryList {...data} depth={depth+1} />) }
        </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    // <Home />

    <div>
      {filesStructure.childern.map(data=> <EntryList {...data} depth={1} />)}
    </div>

  );
}

export default App;
