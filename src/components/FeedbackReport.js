import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footbar from "./Footbar";
import './Search.js';
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'



export default function FeedbackReport(){
  const [feedbackInfo, setFeedbackInfo] = useState({});
  const { fid } = useParams();
  let navigate = useNavigate();

  useEffect(() => {


    try{
      async function getDocumentData(){

        const docRef = doc(db, "feedbackdb",  fid );
        const docSnap = await getDoc(docRef);      
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setFeedbackInfo({
            name : docSnap.data().name,
            company_name: docSnap.data().company_name,
            ctc: docSnap.data().ctc,
            experience:docSnap.data().experience,
            role :docSnap.data().role,
            usn :docSnap.data()?.usn,
            // email :docSnap.data().email,
            year : docSnap.data()?.year,
            word : docSnap.data()?.word
          });
        } else {
          console.log("No such document!");
        }
      }
      getDocumentData();

      // getDoc(docRef)
      //     .then( snapshot => {
      //         setSubtitles(snapshot.docs.map(doc =>({
      //             fid: doc.id,
      //             data: doc.data()
      //         })))
      //     })
    }
    catch(e){
        console.log(e);
    }   

}, []);
console.log(fid);
console.log(feedbackInfo);
return(
  <>
  <NavBar/>
  <Button variant="light" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={solid('circle-left')} size="2x"/></Button>
  <div className="feedbox" >
        
        <div className="feedreportbox">
        
            <p className="p1"><FontAwesomeIcon icon={solid('user')}/> Name : <strong className="s1">{ feedbackInfo.name }</strong> </p>
            <p className="p1"><FontAwesomeIcon icon={solid('building')}/> Company Name : <strong className="s1">{ feedbackInfo.company_name }</strong> </p>
            {feedbackInfo.usn?<p className="p1"><FontAwesomeIcon icon={solid('id-badge')}/> USN : <strong className="s1">{ feedbackInfo.usn  }</strong> </p>:""}
            <p className="p1"><FontAwesomeIcon icon={solid('user-graduate')}/> Role : <strong className="s1">{ feedbackInfo.role }</strong> </p>
            <p className="p1"><FontAwesomeIcon icon={solid('sack-dollar')}/> CTC : <strong className="s1">{ feedbackInfo.ctc }</strong> </p>
            {feedbackInfo.year?<p className="p1"><FontAwesomeIcon icon={solid('calendar-days')}/> Year : <strong className="s1">{ feedbackInfo.year }</strong> </p>:""}
            {/* <p className="p1"> Email : <strong className="s1">{ feedbackInfo.email }</strong> </p> */}
            <p className="p2"> <strong><FontAwesomeIcon icon={solid('comment')}/> Experience : </strong><span className="s2">{ feedbackInfo.experience }</span> </p>
            {feedbackInfo.word?<p className="p2"> <strong><FontAwesomeIcon icon={solid('comments')}/> Word of Advice : </strong><span className="s2">{ feedbackInfo.word }</span> </p>:""}
        </div>
  </div>
      
  <Footbar class="footBar-bottom"/>
  </>
)
}