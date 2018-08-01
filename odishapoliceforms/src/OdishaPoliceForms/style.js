import styled from 'styled-components';
import { White, Grey,  UserButtonText, UserButtonGray, UserButtonBackground, TopBarLeftBtnBackground, Menubar } from './common/Theme/defaultTheme';

export const ReportUserButtonWrapper = styled.div`
  padding: 0.5em 1em 6em 1em;
  width: 100%;
  position: relative;
  position: -webkit-sticky;
  top: 0; /* required */
  & > button{
    float: left;
    width: 25%;
    margin-left: 0em !important;
    padding: 1.5em 0em;
  }

  @media (max-width: 1366px) {
      padding: 1em 1em 9em 1em;
      & > button{
      width: 50%;
      border: 1px solid;
      letter-spacing: 0em;
      &:hover{
        letter-spacing: 0em;
      }
    }
  }

  @media (max-width: 1024px) {
      letter-spacing: 0em;
      padding: 1em 1em 11em 1em;
      & > button{
      width: 50%;
      border: 1px solid;
      &:hover{
        letter-spacing: 0em;
      }
    }
  }

  @media (max-width: 768px) {
      padding: 1em 1em 10em 1em;
      & > button{
      font-size: 0.8em;
      letter-spacing: 0em;
    }
  }

  @media (max-width: 425px) {
    padding: 1em 1em 5em 1em;
    // padding: 0.5em;
    & > button{
      border: 1px solid;
      float: left;
      width: 50%;
      margin-left: 0em !important;
      padding: 0.5em 0em;
      letter-spacing: 0em;
      &:hover{
        letter-spacing: 0em;
      }
  }
`;

export const TitleWrapper = styled.div`
  height: 3em;
  padding: 0em 1em;
  background: ${TopBarLeftBtnBackground};

  @media (max-width: 1024px) {
    padding : 0em 0.5em;
  }

  @media (max-width: 768px) {
    & > h4{
      font-size: 14px;
    }
  }
`;
export const ReportTitle = styled.h4`
  color: ${White};
  float: left;
  margin: 0.7em 0em 0em 0em;
`;
export const CloseButton = styled.h5`
  background-color: ${White};
  color: ${TopBarLeftBtnBackground};
  float: right;
  padding: 0.3em;

  &:hover{
    background-color: ${Menubar};
    color: ${White};
    cursor: pointer;
  }
`;

export const StickyHeader = styled.div`
  height: 15%;
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: ${White};

  @media (max-width: 1366px) {
    width: 26%;
  }
  @media (max-width: 1024px) {
    width: 26%;
  }
  @media (max-width: 768px) {
      width: 26%;
  }
`;

export const ReportContentWrapper = styled.div`
  margin-top: 25%;
  width: 100%;
  height: auto;
  padding: 4%;
  ${''/* border: 1px solid red; */}
  float: left;
  box-sizing: border-box;

  @media (max-width: 1366px) {
    margin-top: 45%;
    width: 100%;
    padding: 5%;
  }
  @media (max-width: 1024px) {
    margin-top: 75%;
    width: 100%;
    padding: 6%;
  }
  @media (max-width: 768px) {
    margin-top: 90%;
    width: 100%;
    padding: 7%;

  }
`;

export const ReportUserRadioButtonWrapper = styled.div`
  width: 100% !important;
  height: auto;
  clear: both;
  margin-top: 2%;
  margin-bottom: 13.5%;
  display: block;
`;
export const ReportCustomInput = styled.div`
  display: block;
  width: 100%;
  & > p{
    width: 50%;
    margin: 0.8em 0em 0.2em 0;
    font-weight: normal;
    font-family: 'Arial', sans-serif, Helvetica Neue, Helvetica ;
    float: left;
  }
  & > input{
    width: 50%;
    margin: 1em 0;
    border: 0;
    padding: 0.3em 0.1em 0.3em 0.5em;
    font-size: 1em;
    -webkit-box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow:    0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    box-shadow:         0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background:${Grey};
    float: left;
    &:focus{
    outline: none;
    border-bottom:1px solid #13d816;
      }
  }
`;

export const ReportCustomInput2 = styled.div`
  display: block;
  width: 100%;
  & > button{
    width: 48%;
    background: ${TopBarLeftBtnBackground};
    color: ${White};
    margin: 1em 2% 0.5em 0;
    padding: 0.3em 0.1em 0.3em 0.5em;
  }
  & > input{
    width: 48%;
    margin: 1em 2% 1em 0px;
    border: 0;
    padding: 0.3em 0.1em 0.3em 0.5em;
    font-size: 1em;
    -webkit-box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow:    0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    box-shadow:         0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: ${Grey};
    &:focus{
    outline: none;
    border-bottom:1px solid #13d816;
      }
  }
`;

export const ReportCustomInput3 = styled.div`
  display: block;
  width: 100%;
  & > button{
    width: 31.3%;
    background: ${TopBarLeftBtnBackground};
    color: ${White};
    margin: 1em 2% 0.5em 0;
    padding: 0.3em 0.1em 0.3em 0.5em;
  }
  & > input{
    width: 31.2%;
    margin: 1em 2% 1em 0px;
    border: 0;
    padding: 0.3em 0.1em 0.3em 0.5em;
    font-size: 1em;
    -webkit-box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow:    0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    box-shadow:         0px 1px 0px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background:${Grey};
    &:focus{
    outline: none;
    border-bottom:1px solid #13d816;
      }
  }
`;

export const SubmitButton = styled.button`
  font-weight: bold;
  padding: 1em 0em;
  width: 44%;
  margin: 10% 3%;
  color: ${UserButtonText};
  background: ${TopBarLeftBtnBackground};
  &:hover{
    background: ${UserButtonBackground};
    color: ${White};
    letter-spacing: 0.3em;
  }
`;
export const ClearButton = styled.button`
background: #2b323e;
color: white;
padding: 0.5em 0em;
float: right;
width: 30%;
margin: 0 3%;
font-weight: bold;
`;

export const PlusMinusButton = {
  color: 'white',
  padding: '0 1em',
  border: '1px solid black',
  background: '#333',
};

export const PlusMinusWrapper = styled.div`
>p {
  width: 82%;
  display: inline-block;
  float: left;
}
`;


export const formStyle = {
  width: "100%",
  background: "rgb(255,255,255)",
  border: "0px",
  paddingLeft: "0.5em",
  margin: " 0.5em 0",
  height: "30px",
};

export const formHeaderStyle = {
  marginTop: "6%",
  paddingLeft: "0%",
  fontWeight: "normal",
};

export const BoldWrapper = styled.div`
>p {
    margin: 1.2em 0em;
    font-size: 1em;
    font-weight: bold;
    font-family: 'Arial', sans-serif, Helvetica Neue, Helvetica ;
}
  `;
