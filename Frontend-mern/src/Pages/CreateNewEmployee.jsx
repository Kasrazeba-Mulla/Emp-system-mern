import React,{useState} from "react";

import useInput from "../Components/hooks/use-input";
import classes from "../Components/Form.module.css";


export const CreateNewEmployee = (validateValue) => {
  const [resMsg,setResMsg] = useState();
  
let formIsValid = false;

 const {value:enteredName, hasError:nameInputHasError, valueChangeHandler:nameChangeHandler, inputBlurHandler: nameBlurHandler, isValid:enteredNameIsValid,reset:resetNameInput }= useInput(value =>value.trim()!=='');
 
 const {value:enteredAge, 
    hasError:ageInputHasError, 
    valueChangeHandler:ageChangeHandler, 
    inputBlurHandler: ageBlurHandler, 
    isValid:enteredAgeIsValid,
    reset:resetAgeInput }= useInput(value =>(value.trim()>0 && value.trim()<125 ));
 
const {value:enteredSalary, 
    hasError:salaryInputHasError, 
    valueChangeHandler:salaryChangeHandler, 
    inputBlurHandler: salaryBlurHandler, 
    isValid:enteredSalaryIsValid,
    reset:resetSalaryInput }= useInput(value =>(value.trim()>1000));
 
const {value:enteredEmail, 
    hasError:emailInputHasError, 
    valueChangeHandler:emailChangeHandler, 
    inputBlurHandler: emailBlurHandler, 
    isValid:enteredEmailIsValid,
    reset:resetEmailInput }= useInput(value =>{
   const mailformat=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return String(value).toLowerCase().match(mailformat);
    });

const {value:enteredMobile, 
    hasError:mobileInputHasError, 
    valueChangeHandler:mobileChangeHandler, 
    inputBlurHandler: mobileBlurHandler, 
    isValid:enteredMobileIsValid,
    reset:resetMobileInput }= useInput(value =>{
        const validatePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return validatePhone.test(value);
    });
    
if(enteredNameIsValid && enteredAgeIsValid && enteredEmailIsValid && enteredMobileIsValid && enteredSalaryIsValid){
    formIsValid = true;
}


 const formSubmissionHandler =async(e)=>{
    e.preventDefault();
    
    if(formIsValid){
       const formData ={
            name:enteredName,
            age:enteredAge,
            salary:enteredSalary,
            email:enteredEmail,
            mobile:enteredMobile,
        }

    //    DUMMY_EMP.push(formData); 
    //   console.log(DUMMY_EMP);

      try{
      const response =  await fetch("http://localhost:5000/create",{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        });
     
        const resData =await response.json();
         
        console.log(resData);
        setResMsg('Congratulations, employee data added successfully!')
        
        
      }catch(e){
        setResMsg('Sorry, could not add the employee record!')

      }
     
    } 
    else{

    }
  

    resetNameInput();
    resetAgeInput();
    resetEmailInput();
    resetMobileInput();
    resetSalaryInput();
 };

 const resetHandler=()=>{
   resetNameInput();
    resetAgeInput();
    resetEmailInput();
    resetMobileInput();
    resetSalaryInput();
 };



  return (
    <>
      <h1 className={classes.infoHeading}>PLEASE ENTER NEW EMPLOYEE RECORD</h1>

      <form className={classes.formDiv} onSubmit={formSubmissionHandler}>
        <div className={classes.fields}>
          <div className={classes.input}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter employee name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
          </div>
          {
            nameInputHasError && (
                <p className={classes.errorText}>Name must not be empty!</p>
            )
          }
          <div className={classes.input}>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              placeholder="Enter employee age"
              onChange={ageChangeHandler}
              onBlur={ageBlurHandler}
              value={enteredAge}
            />
          </div>
           {
            ageInputHasError && (
                <p className={classes.errorText}>Enter a valid age!</p>
            )
          }
          <div className={classes.input}>
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              placeholder="Enter salary in Rupees"
              onChange={salaryChangeHandler}
              onBlur={salaryBlurHandler}
              value={enteredSalary}
            />
          </div>
           {
            salaryInputHasError && (
                <p className={classes.errorText}>Enter a valid salary amount!</p>
            )
          }
          <div className={classes.input}>
            <label htmlFor="email">E-mail Id</label>
            <input
              type="email"
              id="email"
              placeholder="Enter e-mail address"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
            />
          </div>
           {
            emailInputHasError && (
                <p className={classes.errorText}>Enter a valid email address!</p>
            )
          }
          <div className={classes.input}>
            <label htmlFor="mobile">Mobile No.</label>
            <input
              type="number"
              id="mobile"
              placeholder="Enter mobile number"
              onChange={mobileChangeHandler}
              onBlur={mobileBlurHandler}
              value={enteredMobile}
            />
          </div>
           {
            mobileInputHasError && (
                <p className={classes.errorText}>Enter a valid 10 digit phone number!</p>
            )
          }
          <div className={classes.buttons}>
            <button className={classes.submitBtn} type="submit" disabled={!formIsValid}>
              ADD
            </button>
            <button
              className={classes.submitBtn}
              type="button"
              onClick={resetHandler}
            >
              CANCEL
            </button>
          </div>
       {resMsg && <div className={classes.resMsg}>{resMsg}</div>} 
        </div>
      </form>
    </>
  );
};
