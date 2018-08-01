import styled from 'styled-components';
import { UserButtonGray, ButtonOrange, ButtonTextColor } from '../Theme/defaultTheme';

const UserButtonWrapper = styled.button`
  width: 95%;
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase !important;
  letter-spacing:0.1em;
  color: ${ButtonTextColor};
  background: ${props => props.isActive ? ButtonOrange : UserButtonGray};
  opacity:${props => props.disabled ? "0.5" : "1"}
  cursor:${props => props.disabled ? "not-allowed" : "pointer"} ;
  border: 1;
  margin-left: 2.5%;
  margin-top: 1.5%;
  bottom: 3%;
  padding: 1em 0em;
  -webkit-box-shadow: 0px 2px 1px 0px rgba(163,158,163,1);
  -moz-box-shadow: 0px 2px 1px 0px rgba(163,158,163,1);
  box-shadow: 0px 2px 1px 0px rgba(163,158,163,1);
  &:hover{
    letter-spacing:0.1em;
    background: ${props => props.disabled ? UserButtonGray : ButtonOrange};
    color: ${ButtonTextColor};
    cursor:${props => props.disabled ? "not-allowed" : null};
    opacity:${props => props.disabled ? "0.5" : "1"}
  }
  @media (max-width: 1366px) {
    padding: 0.9em 0em;
  }
  @media (max-width: 425px) {
    padding: 0.7em 0em;
  }
`;
export default UserButtonWrapper;
