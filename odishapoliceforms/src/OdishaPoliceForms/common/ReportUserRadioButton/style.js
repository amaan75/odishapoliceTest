import styled from 'styled-components';
import { White } from '../Theme/defaultTheme';

export const RadioButtonWrapper = styled.input`
    ${''/* width: 100%; */}
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
    background: ${White};
    float: left;
    margin-right: 2%;
`;

export const ReportUserLabel = styled.text`
  display: block;
  margin: 0.2em 4% 0.2em 4%;
  font-size: 1em;
  font-weight: normal;
  float: left;
  font-family: 'Arial', sans-serif, Helvetica Neue, Helvetica ;
`;
