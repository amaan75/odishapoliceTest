import styled, { css } from 'styled-components';
import { White } from '../Theme/defaultTheme';

const InputWrapper = styled.input`
    width: 100%;
    margin: 0.5em 0;
    border: 0;
    padding: 0.3em 0.1em 0.3em 0.5em;
    font-size: 1em;
    -webkit-box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow:    0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    box-shadow:         0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #eee;
    border-bottom:${props => props.invalidInput ? "1px solid #ff0000" : null};
    &:focus{
    outline: none;
    border-bottom:1px solid;
    border-bottom-color:${props => props.invalidInput ? "#ff0000" : "#13d816"};
      }
    @media screen and (max-width: 425px) {
    &:focus{
    outline: none;
    background: ${White};
    border-bottom-color:${props => props.invalidInput ? "#ff0000" : "#13d816"};
      }
    }
    @media screen and (max-width: 375px) {
    &:focus{
    outline: none;
    background: ${White};
    border-bottom-color:${props => props.invalidInput ? "#ff0000" : "#13d816"};
      }
    }
    @media screen and (max-width: 320px) {
    &:focus{
    outline: none;
    background: ${White};
    border-bottom-color:${props => props.invalidInput ? "#ff0000" : "#13d816"};
      }
    }
    & > text{
      display: none;
    }

`;

export default InputWrapper;
