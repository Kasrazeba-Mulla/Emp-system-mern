import React,{useEffect,useState} from 'react'
import {Chart as ChartJS, BarElement,CategoryScale, LinearScale} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import classes from "./ViewChartFromBackend.module.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);


// bar graph, line graph
const ViewChartFromBackend = () => {
  
   const [loadedEmployees, setLoadedEmployees]=useState();
   const [isLoading, setIsLoading]=useState(false);

// here we get the data from our backend 
useEffect(()=>{

  const fetchEmployees =async()=>{
try{
    setIsLoading(true);
    const response = await fetch("http://localhost:5000/get");
    const responseData= await response.json();
    setLoadedEmployees(responseData.employees);


    }
catch(e){
  alert(e);
}

setIsLoading(false);
  };
fetchEmployees();


},[]);

let data = {
  labels: loadedEmployees?.map(emp => emp.name),
  datasets: [{
      label: 'Employee Salary',
      data: loadedEmployees?.map(emp => emp.salary),
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
    plugins:{
            title:{
              display:true,
              text:'Employee Salary in Rupees',
              // fontSize:20
            }, 
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

export default ViewChartFromBackend