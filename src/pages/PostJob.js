import React, { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import PostJobForm from "../components/PostJob/PostJobForm";
import YourJobs from "../components/PostJob/YourJobs";
import { db } from "../data/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../data/auth";

const PostJob = () => {
  const [myJobs, setMyJobs] = useState([]);
  const colRef= collection(db, "postedJobs");
  const {user}=useAuthContext();

  useEffect(()=>{
    const temp = [];
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef)
        .then((doc) => {
          return doc.data().array;
        })
        .then((jobs) => {
          jobs.forEach((jid) => {
            getDoc(doc(colRef, jid)).then((snap) => {
              temp.push(snap.data());
            });
          });
        });
      setMyJobs(temp);
   },[user]);
   
  return (
    <div className="postJob">
      <Navbar />
      <div className="mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="ps-5 postjobform" style={{ margin: "50px" }}>
              <PostJobForm />
            </div>
          </div>
          <div className="col-lg-6 postjobtext">
            <div className="text-center" style={{ margin: "50px" }}>
              <p className="textField" style={{ fontSize: "21px" }}>
                Post a Job and recruit easily!
              </p>
              <p style={{ fontSize: "18px" }}>
                Need staff? Spread the word among aspiring women employees and artisans via Gruhini. 
              </p>
              <YourJobs myJobs={myJobs}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
