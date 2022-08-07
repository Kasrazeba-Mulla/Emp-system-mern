import React,{useEffect,useState} from 'react'
import {Link,useParams} from "react-router-dom"

import classes from "./LandingPage.module.css"


function LandingPage() {
 const eid= useParams().eid;
const [employeeData, setEmployeeData]=useState();
const [isLoading, setIsLoading]=useState(false);

// here we get the data from our backend 
useEffect(()=>{

  const fetchEmployees =async()=>{
    
try{
  setIsLoading(true);
    const response = await fetch("http://localhost:5000/get");
    const responseData= await response.json();
    setEmployeeData(responseData.employees);
    console.log(employeeData);
}
catch(e){
  alert(e);
}
  setIsLoading(false);
  };
fetchEmployees();


},[]);

const updateEmployeeHandler = ()=>{

};



  return (
    <div>
      {isLoading &&  <p className={classes.loadingSpinner}>
               Loading... 
                </p>}
      {!isLoading &&          
    <table className={classes.table}>

          <tbody>
          <tr className={classes.heading}>
            <th >
              Employee Name
            </th>
            <th>Employee Age</th>
            <th>Employee Salary</th>
            <th>Update Record</th>
          </tr>
          </tbody>
          {employeeData && employeeData.map(emp=><tbody className={classes.data}><tr key={emp.mobile} >
            <td>{emp.name}</td>
            <td>{emp.age}</td>
            <td>{emp.salary}</td>
            <td><Link to={`/update/${emp.id}`}><button className={classes.submitBtn} onClick={updateEmployeeHandler} type="button">UPDATE</button></Link></td>
          </tr></tbody>)}
        </table>}
    </div>
  );
}

export default LandingPage


  //  <table className={classes.tableDiv}>

  //         <tbody>
  //         <tr className={classes.headingRow}>
  //           <th className={classes.th1}>
  //             Employee Name
  //           </th>
  //           <th>Employee Age</th>
  //           <th>Employee Salary</th>
  //         </tr>
  //         </tbody>
  //         {employeeData.map(emp=><tbody><tr className={classes.dataRow} key={emp.mobile}>
  //           <td>{emp.name}</td>
  //           <td>{emp.age}</td>
  //           <td>{emp.salary}</td>
  //         </tr></tbody>)}
  //       </table>


 {/* <table className={classes.tableDiv}>
          <tbody>
          <tr className={classes.headingRow}>
            <th className={classes.th1}>
              Employee Name
            </th>
            <th>Employee Age</th>
            <th>Employee Salary</th>
          </tr>
          </tbody>
          {employeeData.map(emp=><tbody><tr className={classes.dataRow} key={emp.mobile}>
            <td>{emp.name}</td>
            <td>{emp.age}</td>
            <td>{emp.salary}</td>
          </tr></tbody>)}
        </table> */}


//           {isLoading &&  <p className={classes.loadingSpinner}>
//               Loading... 
//                 </p>}
//       { !isLoading && 
//         employeeData && <div className={classes.wrapper}>
//           <div className={classes.row}>
//   <div className={classes.box}>Employee Name</div>
  
//   <div className={classes.box}>Employee Salary</div>
//   <div className={classes.box}>Update Employee Record</div>
//    </div>
// {employeeData.map(emp=><div className={classes.row} key={emp.mobile}>
//             <div className={classes.box}>{emp.name}</div>
            
//             <div className={classes.box}>{emp.salary}</div>
//             <div className={classes.box}><button className={classes.submitBtn}>UPDATE</button></div>
//           </div>)}

//   </div>
  // }