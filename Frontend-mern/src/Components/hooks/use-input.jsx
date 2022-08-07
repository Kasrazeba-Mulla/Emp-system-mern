import React,{useState} from 'react'

export default function useInput(validateValue) {
  const [enteredValue,setEnteredValue] =useState('');
  const [isTouched,setIsTouched] =useState(false);

  const valueIsVaild =validateValue(enteredValue);
  const hasError = !valueIsVaild && isTouched;

  const valueChangeHandler = e=>{
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = e=>{
    setIsTouched(true);
  }

  const reset =()=>{
setEnteredValue('');
setIsTouched(false);
  };

  return {
   value:enteredValue, hasError,valueChangeHandler, inputBlurHandler ,isValid:valueIsVaild,reset
  };
}

