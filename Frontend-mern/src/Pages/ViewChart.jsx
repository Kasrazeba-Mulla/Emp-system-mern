import React,{useState} from 'react'

import ViewChartThirdPartyAPI from './ViewChartFromThirdPartyAPI';
import ViewChartFromBackend from './ViewChartFromBackend';
import classes from "./ViewChart.module.css"

const ViewChart = () => {
const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);    
const [backendChart,setBackendChart] = useState(false);
const [thirdPartyChart,setThirdPartyChart] = useState(false);

const backendChartHandler =()=>{
    setBackendChart((prevState)=>{
        setBackendChart(!prevState);
    });
    
};
const thirdPartyChartHandler =()=>{
     setThirdPartyChart((prevState)=>{
        setThirdPartyChart(!prevState);
    });
};

//check whether the window.innerWidth > 1450 and update the isDesktop state accordingly
const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

    return (
        <>
        <div className={classes.buttons}>
          <button className={classes.submitBtn} onClick={backendChartHandler}>View Chart made with data from Backend</button>
          <button className={classes.submitBtn} onClick={thirdPartyChartHandler}>View Chart made with data from 3rd party API</button>
        
        </div>
        <div >
          {backendChart && <div className={classes.chart}>
           <h1 className={classes.chartTitle}>Employee Salary Chart (From Backend)</h1>
            <ViewChartFromBackend/> 
            </div> }
          {thirdPartyChart && <div className={classes.chart}>
           <h1 className={classes.chartTitle}>Employee Salary Chart (From 3rd Party API)</h1>
            <ViewChartThirdPartyAPI/>
            </div> }
            </div>
            </>
    )
}

export default ViewChart