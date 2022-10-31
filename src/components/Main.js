import React, { useState, useEffect, useRef } from "react";
import { TfiReload } from "react-icons/tfi";
import "./Main.css";
export default function Main() {
  const [result, setResult] = useState([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const rotate = useRef();
  async function callApi() {
    setLoading(true);
    rotate.current.style.animation = "animate 1s linear forwards";
    const response = await fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((json) => {
        setResult(json.results);
        setLoading(false);
        rotate.current.style.animation = "";
      });
  }
  useEffect(() => {
    callApi();
  }, [reload]);

  return (
    <>
      <div className="main">
        <div className="head mainHead">
          <h1>Fetched details from Api</h1>
        </div>
        <div className="detContainer">
          {!loading ? (
            <div className="mainContainer">
              <div className="Name">
                <div className="nameSpace">
                  <span className="Dets">Name : </span>
                  <span className="Dets">{result[0].name["title"]} </span>
                  <span className="Dets">{result[0].name["first"]} </span>
                  <span className="Dets">{result[0].name["last"]} </span>
                </div>
              </div>
              <div className="Name">
                <div className="nameSpace">
                  <span className="Dets">Email : </span>
                  <span className="Dets">{result[0].email} </span>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="head">Loading...</h1>
          )}
        </div>
        <div className="buttonDiv" onClick={callApi}>
          <div className="wheel" ref={rotate}>
            <TfiReload />
          </div>
        </div>
      </div>
    </>
  );
}
