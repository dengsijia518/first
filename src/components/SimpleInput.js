import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName, 
    hasError: nameInputHasError, 
    isValid: enteredNameIsValid,
    valueChangeHandler:nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value:enteredEmail,
    hasError:EmailInputHasError,
    isValid:enteredEmailIsValid,
    valueChangeHandler:emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset:resetEmailInput
  } = useInput(value => value.includes('@'))

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }; 

  const formSubmissionHandler = event => {
    event.preventDefault();

    resetNameInput()
    resetEmailInput()

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = EmailInputHasError ?'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onBlur={nameBlurHandler}
          onChange={nameChangedHandler} />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div> 

      <div className={emailInputClasses}>
        <label htmlFor='email'>Email Address</label>
        <input
          id='email'
          type='email'
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
        />
        {EmailInputHasError && <p className="error-text">Email must contain @</p>}
      </div>
        
      
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
