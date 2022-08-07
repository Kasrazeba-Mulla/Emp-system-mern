const express = require('express');

const HttpError = require('../models/ErrorModel');
const Employee = require("../models/employee-schema");
const { update } = require('../models/employee-schema');

const DUMMY_EMP =[{
    id:1,
    name:"Zeba Mulla",
    age:20,
    salary:23000,
    email:'zebamulla05@gmail.com',
    mobile:7350610056
  },];

const reqBodyIsValid =(empname,age,salary,email,mobile)=>{
let isValid=false;
let emailIsValid = false;
let mobileIsValid = false;

const mailformat=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        emailIsValid = String(email).toLowerCase().match(mailformat);

 const validatePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        mobileIsValid =  validatePhone.test(mobile);

if(empname.trim()!=="" && (age>0 && age<125) && (salary>1000) &&emailIsValid && mobileIsValid)
 isValid= true;

return isValid;
}

const getEmployees=async(req,res,next)=>{
//send a get request to the server
try{
        storedEmployees= await Employee.find({});

       }
       catch(e){
        const error=new HttpError("Cannot store the data in the backend",500);
        return next(error);
       }
res.status(200).json({employees:storedEmployees.map(e=>e.toObject({getters:true}))});

};

const newEmployee =async(req, res, next)=>{
const { name,
            age,
            salary,
            email,
            mobile}=req.body;

//validation on backend 
 const isValid = reqBodyIsValid(name,
            age,
            salary,
            email,
            mobile);

 
          if(!isValid){
        //   return res.status(422).json({message:"Invalid user input. Cannot store the data!"})
            const error = new HttpError("Invalid user input. Cannot store the data",422);
            return next(error);
          }

//if isValid send the data to mongodb server
const createdEmployee =new Employee({
            name,
            age,
            salary,
            email,
            mobile
});

// DUMMY_EMP.push(newEmployee);
// return res.status(200).json({message:"NEW DATA ADDITION SUCCESSFUL!",...DUMMY_EMP});
let storedEmployees;       
try{
   await createdEmployee.save();
}
catch(e){
   const error = new HttpError("Something went wrong! Could not store the data",422);
            return next(error);
}
res.status(200).json({employee:createdEmployee.toObject({getters:true})});

};

const updateEmployee =async(req, res, next)=>{
const { name,
            age,
            salary,
            email,
            mobile}=req.body;

const eid = req.params.eid;



//validation on backend 
 const isValid = reqBodyIsValid(name,
            age,
            salary,
            email,
            mobile);

 

if(!isValid){
            const error = new httpError("Invalid user input. Cannot update the existing data",422);
            return next(error);
          }

          //if isValid send the data to mongodb server patch req 
let updatedEmployee;
try{
  updatedEmployee = await Employee.findById(eid);
}
catch(e){
  const error = new HttpError("Something went wrong! Could not update the data",500);
            return next(error);
}

updatedEmployee.name= name;
updatedEmployee.age= age;
updatedEmployee.salary= salary;
updatedEmployee.email= email;
updatedEmployee.mobile= mobile;


    try{
          await updatedEmployee.save();
       }
       catch(e){
        const error=new HttpError("Cannot update the data in the backend",500);
        return next(error);
       }

res.status(200).json({employee:updatedEmployee.toObject({getters:true})});
};



exports.getEmployees = getEmployees;
exports.newEmployee = newEmployee;
exports.updateEmployee = updateEmployee;
