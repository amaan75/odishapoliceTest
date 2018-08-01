import React from 'react';
import PropTypes from 'prop-types';
import ReportUserLabel from '../ReportUserLabel';
import InputWrapper from './style';
/**
 * If you want to do error Validation in the input type, please pass a,
 * regular expression to match the input and an errorMessage as props
 *  
 */

/**
 * TODO: the autofill has been disabled for now, it will be turned on later.
 * find a fix for that
 */
export default class ReportUserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invalidInput: false, errorMessage: null }
  }


  isInputValid = (event, regExpression, errorMessage) => {
    const value = event.target.value;
    //regular expression to only match for alphabets
    if (!value.match(regExpression)) {
      //set the error message and the input invalidated to true
      this.setState({ invalidInput: true, errorMessage });
    } else {
      //else set the invalidInput to false
      this.setState({ invalidInput: false, errorMessage: null });
    }
  }




  //changed this component to a class so we need a render method
  render() {
    const props = this.props;
    return (
      <div>
        <ReportUserLabel label={props.label} />
        <InputWrapper type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          //use state value if the alpha is on, and the value will then be maintained in its state.
          value={props.value}
          //aggresive validation on Change, this will give the value
          onChange={props.pattern ? e => {
            const regExpression = RegExp(props.pattern);
            const errorMessage = props.errorMessage;
            this.isInputValid(e, regExpression, errorMessage);
            if(props.onChange)
            //call props onChange with the event
            props.onChange(e);
          } : props.onChange}
          required={props.required}
          id={props.id}
          min={props.min}
          max={props.max}
          pattern={props.pattern}
          title={props.title}
          //props to disable the input
          disabled={props.disabled}
          //to check if the input is correct or not
          invalidInput={this.state.invalidInput}
          //maxlength to be used to restrict the number of chars in the input
          maxLength={props.maxLength}
          //disable auto fill
          autoComplete="new-password"//{props.type!=="password"?"new-password":"false"}
          //method to be fired on Input
          onInput={props.onInput}
        />
        <div className="alert alert-danger" role="alert"
          style={
            this.state.invalidInput ?
              { display: "block" } :
              { display: "none" }}>
          {this.state.errorMessage}
        </div>
      </div>
    );
  }
}

ReportUserInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  id: PropTypes.string,
  textChangeHandler: PropTypes.func,
  required: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string
};
