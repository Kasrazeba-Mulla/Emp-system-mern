import React,{useEffect,useState} from 'react'
import {Chart as ChartJS, BarElement,CategoryScale, LinearScale} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import classes from "./ViewChartFromThirdPartyAPI.module.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);


// bar graph, line graph
const ViewChartThirdPartyAPI = () => {
 
   const [loadedEmployees, setLoadedEmployees]=useState();
   const [isLoading, setIsLoading]=useState(false);

// here we get the data from 3rd party api
useEffect(()=>{

  const fetchEmployees =async()=>{
try{
    setIsLoading(true);
    const response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
    const responseData= await response.json();
    setLoadedEmployees(responseData.data);


    }
catch(e){
  alert("The request was unsuccessful! Pls try again later. (429)");
}

setIsLoading(false);
  };
fetchEmployees();


},[]);

let data = {
  labels: loadedEmployees?.map(emp => emp.employee_name),
  datasets: [{
      label: 'Employee Salary',
      data: loadedEmployees?.map(emp => emp.employee_salary),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
};

  let options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

    return ( <div>
            {isLoading && 
            <p className={classes.loadingSpinner}>
               Loading... 
                </p>}
            {!isLoading && loadedEmployees  && 
            <div className={classes.centerDiv}>  
        <Bar
        data={data}
        height={400}
        options={options}

      />
         </div>  
                }
        </div>    )
         
}

export default ViewChartThirdPartyAPI