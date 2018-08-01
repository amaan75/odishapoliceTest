import React from 'react';
import PropTypes from 'prop-types';
import UserButtonWrapper from './style';

export default function UserButton(props) {
  return (
    <UserButtonWrapper
      //this props is used to disable the button  
      disabled={props.disabled}
      key={props.id}
      id={props.id}
      name={props.label}
      onClick={props.onClick}
      //prop to specify if the tab is active or not
      isActive={props.isActive}
      >
      {props.label}
    </UserButtonWrapper>
  );
}

UserButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};
