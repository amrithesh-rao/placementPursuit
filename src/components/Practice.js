import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import PracticeCard from "./PracticeCard";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import SelectSearch from "react-select-search";
import {Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Practice() {
  const [titles, setTitles] = useState([]);
  const [dept, setDept] = useState("CS");
  let navigate = useNavigate();
  useEffect(() => {
      try{
        const colRef = collection(db, "infodb");
        getDocs(query(colRef,where("dept","array-contains",dept),orderBy("priority")))
            .then( snapshot => {
              if(snapshot.docs.length === 0){
                alert("Yet to add")
                setTitles([])
              }
              else
                setTitles(snapshot.docs.map(doc =>({
                    id: doc.id,
                    data: doc.data()
                })))
            })
      }
      catch(e){
          console.log(e);
      }
        
  }, [dept]);

  return (
    <>
      <NavBar />
      <Button variant="light" onClick={()=>navigate('/home')}><FontAwesomeIcon icon={solid('circle-left')} size="2x"/></Button>
      <div className="container"> 
      <SelectSearch
      className="select-search dept-search"
       options={[
           { value: 'CS', name: 'Computer Science' },
           { value: 'EC', name: 'Electronics and Communication' },
           { value: 'IS', name: 'Information Science' },
           { value: 'MECH', name: 'Mechanical' },
       ]}
       onChange={setDept}
       value={dept}
       placeholder="Select department"
       />
       </div>
      <div className="container">
        <div className="row px-auto">
        {
        titles?.map( title  => (
          <div className="col-lg-3 p-5 mx-auto">
        <PracticeCard title={title.data.title} id = {title.id}/>
        </div>
      ))}
        </div>
        
      </div>
      
      <Footbar class="footBar-bottom"/>
    </>
  );
}
