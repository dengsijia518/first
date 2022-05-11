
import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    isValid: enteredFirstNameIsValid,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredLastName,
    hasError: lastNameInputHasError,
    isValid: enteredLastNameIsValid,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@'))

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredEmailIsValid && enteredLastNameIsValid) {
    formIsValid = true
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    
    resetFirstNameInput()
    resetEmailInput()
    resetLastNameInput()


  }

  const firstNameInputClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='fname'>First Name</label>
          <input
            type='text'
            id='fname'
            value={enteredFirstName}
            onBlur={firstNameBlurHandler}
            onChange={firstNameChangedHandler} />
          {firstNameInputHasError && <p className="error-text">Name must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='lname'>Last Name</label>
          <input
            id='lname'
            type='text'
            value={enteredLastName}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && <p className="error-text">Name must not be empty</p>}
        </div>
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          id='email'
          type='email'
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && <p className="error-text">Email must contain @</p>}
      </div>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
