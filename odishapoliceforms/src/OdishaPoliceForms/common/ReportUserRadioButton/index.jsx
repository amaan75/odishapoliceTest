import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonWrapper, ReportUserLabel } from './style';

export default function ReportUserRadioButton(props) {
  return (
    <div>
      <RadioButtonWrapper
        type={props.type}
        name={props.name}
        //to show the user, if default is checked
        defaultChecked={props.defaultValue}
        //this is needed default value should be passed using defaultChecked
        defaultValue={props.defaultValue}
        //this is to get the value if user changes the value manually
        value={props.value}
        onChange={props.onChange}
        id={props.id}
      />
      <ReportUserLabel>
        {props.label}
      </ReportUserLabel>
    </div>
  );
}

ReportUserRadioButton.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  textChangeHandler: PropTypes.func,
  required: PropTypes.string
};
