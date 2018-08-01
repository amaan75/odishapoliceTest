/*
 Presentational Component Which receives props and renders the form accordingly


*/
import React from 'react';

import ReportUserInput from '../common/ReportUserInput';
import ReportUserLabel from '../common/ReportUserLabel';
import ReportUserRadioButton from '../common/ReportUserRadioButton';

import {

  ReportContentWrapper,
  ReportUserRadioButtonWrapper,
  ReportCustomInput,
  ReportCustomInput2,
  ReportCustomInput3,
  SubmitButton,

  PlusMinusButton,
  PlusMinusWrapper,
  BoldWrapper
} from '../common/style';
import DropDown from '../common/DropDown';
import {
  //id to identify dropdowns.
  OBSERVATION_REPORT_NAME_OF_DISTRICT,
  FEEDBACK_REPORT_NAME_OF_DISTRICT,
  OBSERVATION_REPORT_NAME_OF_POLICE_STATION,
  OBSERVATION_REPORT_TYPE_OF_OPERATION,
  FEEDBACK_REPORT_TYPE_OF_OPERATION,
  CHECKLIST_FORM_MODE_OF_TRANSPORTATION,
  CHECKLIST_FORM_CONDITION_OF_COMMUNICATION_EQUIPMENT,
  DEBRIEFING_FORM_COMMUNICATION_EQUIPMENT_TITLE_DROPDOWN,
  DEBRIEFING_FORM_STATUS_OF_SATELLITE_PHONE_DROPDOWN,
  DEBRIEFING_FORM_MODE_OF_TRAVEL_TO_DP_DROPDOWN,
  DEBRIEFING_FORM_MODE_OF_TRAVEL_FROM_PP_DROPDOWN,
  DEBRIEFING_FORM_TYPES_OF_VEGETATION_DROPDOWN,
  DEBRIEFING_FORM_TYPES_OF_TERRAIN_DROPDOWN,
  FEEDBACK_REPORT_ATTITUDE_OF_POPULATION_TOWARDS_GOVT_DROPDOWN,
  FEEDBACK_REPORT_TYPES_OF_VEGETATION_DROPDOWN,
  FEEDBACK_REPORT_TYPES_OF_WEAPONS_DROPDOWN,
  FEEDBACK_REPORT_TYPES_OF_WEAPONS_ADD_BUTTON_NAME,
  DEBRIEFING_FORM_LIST_OF_NEARBY_VILLAGES_DROPDOWN,
  DEBRIEFING_FORM_LIST_OF_HOSTILE_VILLAGES_DROPDOWN,
  DEBRIEFING_FORM_LIST_OF_FRIENDLY_VILLAGES_DROPDOWN,
  DEBRIEFING_FORM_TYPES_OF_OPERATION_DROPDOWN,
} from '../constants';
import {
  //imports for radio button
  DEBRIEFING_FORM_FIRST_AID_MEDICAL_ITEMS_TITLE_CARRIED_RADIO_BUTTON_YES,
  DEBRIEFING_FORM_FIRST_AID_MEDICAL_ITEMS_TITLE_CARRIED_RADIO_BUTTON_NO,
  DEBRIEFING_FORM_FRIENDLY_FORCES_IN_AREA_RADIO_BUTTON_NO,
  DEBRIEFING_FORM_FRIENDLY_FORCES_IN_AREA_RADIO_BUTTON_YES,
  DEBRIEFING_FORM_ELECTRICITY_RADIO_BUTTON_YES,
  DEBRIEFING_FORM_ELECTRICITY_RADIO_BUTTON_NO,
} from '../constants';

import {
  //imports for input type=text and number
  DEBRIEFING_FORM_NAME_OF_MAOIST_GROUP_TITLE,
  DEBRIEFING_FORM_NAME_OF_MAOIST_GROUP_COUNT,
  DEBRIEFING_FORM_NAME_OF_QUACKS_IN_VILLAGE_COUNT,
  DEBRIEFING_FORM_NAME_OF_QUACKS_IN_VILLAGE_TITLE,
  DEBRIEFING_FORM_ACTIVITIES_OF_MAOISTS_COUNT,
  DEBRIEFING_FORM_ACTIVITIES_OF_MAOISTS_TITLE,
} from '../constants';

import {
  //importing form ids
  OBSERVATION_REPORT_FORM_ID,
  CHECKLIST_REPORT_FORM_ID,
  DEBRIEF_REPORT_FORM_ID,
  FEEDBACK_REPORT_FORM_ID,
} from '../constants';
const styles = {
  width: "100%",
  background: "#eeeeee",
  border: "0px",
  paddingLeft: "0.5em",
  margin: " 0.5em 0",
  height: "30px",
};

const headerStyle = {
  marginTop: "6%",
  paddingLeft: "0%",
  fontWeight: "normal",
};





const FormHolder = (props) => {

  const observationReport = (
    <form onSubmit={props.formSubmitHandler}
      id={OBSERVATION_REPORT_FORM_ID}
      name="observationReport"
      onInput={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
      onFocus={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
      onChange={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
      >


     
      <ReportContentWrapper>
        {/* form name field */}
        <ReportUserInput
          label="Name of Operation"
          type="text"
          name="operationName"
          placeholder="Enter the name of the operation"
          required={true}
          onInput={props.functionSetOperationName}
        />
        {/*Drop Down for name of districts list.*/}
        <DropDown
          //label for the dropdown
          header={"Name of district"}
          //unique id to be used in onChange
          id={OBSERVATION_REPORT_NAME_OF_DISTRICT}
          //style of the dropdown        
          styles={styles}
          //options passed to it
          children={props.namesOfDistrict}
          //universal dropDown Handler for forms
          onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
          //headerStyle to be passed to the header of dropdown
          headerStyle={headerStyle}
          //name to be given to the formdata entries
          name={"district"}
        />
        <DropDown
          //label for the dropDown
          header={"Name of Police Station"}
          //style for the dropDown
          styles={styles}
          //options passed to it
          children={props.namesOfPoliceStation}
          //unique id to be used in onChange
          id={OBSERVATION_REPORT_NAME_OF_POLICE_STATION}
          //universal handler
          onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
          //headerStyle to be passed to the header of dropdown
          headerStyle={headerStyle}
          //name to be given to the formdata entries
          name={"nameOfPoliceStation"}
        />
        <DropDown
          //label for the dropdown
          header={"Type of Operation"}
          //styles passed to it
          styles={styles}
          //options for the seelect option
          children={props.fTypesOfOperations}
          //unique id of the dropDown
          id={OBSERVATION_REPORT_TYPE_OF_OPERATION}
          //universal handler
          onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
          //headerStyle to be passed to the header of dropdown
          headerStyle={headerStyle}
          //name 
          name={"operationType"}
        />
        <PlusMinusWrapper>
          <ReportUserLabel
            label="Strength of the Party"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={parseInt(props.parties.length) + 1 + "-" + "parties"} style={PlusMinusButton}> + </button>
        <button type="button" onClick={props.deleteItem} id={0 + '-' + "parties"} style={PlusMinusButton}> - </button>
        <ReportCustomInput>
          <ReportUserLabel
            label="Party 1"

          />
          <input type="number" id="parties[0].partystrength" placeholder="Number field" name="parties[0].partystrength" onChange={props.computeTotalParyStrength} min={0} required={true} />
        </ReportCustomInput>

        {/* To make a field withMark Lineaccept multiple value use this */}

        <div>

          {
            props.parties.map((item, index) => {
              let itemLabel = `Party ${(index + 2)}`;
              let itemName = `parties[${(index + 1)}].partystrength`;
              return (
                <div>
                  <ReportCustomInput>
                    <ReportUserLabel
                      label={itemLabel}
                    />
                    <input type="number" id={itemName} placeholder="Number field" name={itemName} onChange={props.computeTotalParyStrength} min={0} required={true} />
                  </ReportCustomInput>
                </div>);
            })

          }
        </div>

        {/* end HERE */}





        <ReportCustomInput>
          <ReportUserLabel
            label="Total Strength"
          />
          <input type="number"  name="strength" id="totalStrength" min="0" disabled={true} />
        </ReportCustomInput>

        <ReportUserInput
          label="Map No."
          type="text"
          name="address.mapnumber"
          placeholder="Enter the map number"
          maxLength="5"
          required={true}
          pattern={"^[a-zA-Z0-9 ]*$"}
          errorMessage={"Special Symbols are not allowed here"}
        />

        <ReportUserLabel
          label="Duration of Operation"
        />
        <ReportCustomInput>
          <ReportUserLabel
            label="Start Date"
          />
          <input type="date" name="startDate" max={"9999-12-31"}/>
        </ReportCustomInput>
        <ReportCustomInput>
          <ReportUserLabel
            label="End Date"
          />
          <input type="date" name="endDate" max={"9999-12-31"}/>
        </ReportCustomInput>

        <ReportUserInput
          label="Total Distance Covered in the Operation (km)"
          type="number"
          name="distanceCovered"
          placeholder="Number field"
          required={true}
          min="0"
        />

        <ReportUserInput
          label="Call sign of Operation"
          type="text"
          name="callSign"
          placeholder="Text field"
          required={true}
        />

        <ReportUserInput
          label="Counter Password"
          type="password"
          name="counterPassword"
          placeholder="Text field"
          required={true}
        />

        <ReportUserInput
          label="Name of the Officer briefing and Place"
          type="text"
          name="officerBriefing"
          placeholder="Text field"
          required={true}
          pattern={"^[a-zA-Z][a-zA-Z ]*$"}
          isAlpha={true}
          errorMessage={"Only alphabets are expected in this field"}
        />
        <ReportUserLabel
          label="Whether the team leader involved in planning"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="teamLeaderInvolved"
            required={true}
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="teamLeaderInvolved"
            required={true}
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserInput
          label="Name of the local officer / guide of the party"
          type="text"
          name="localOfficerGuideOfParty"
          placeholder="Text field"
          required={true}
        />

        <ReportUserLabel
          label="Whether arms and ams issued to local officer"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="armsIssuedToLocalGuide"
            required={true}
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="armsIssuedToLocalGuide"
            required={true}
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserInput
          label="Total Distance Covered in the Operation (km)"
          type="number"
          name="distanceCovered"
          placeholder="Number field"
          required={true}
          min="0"
        />
        <ReportUserInput
          label="Password of Operation"
          type="password"
          name="operationPassword"
          placeholder="Text field"
          required={true}
        />
        
        
        <ReportUserInput
          label="Name of the Officer briefing and Place"
          type="text"
          name="officerBriefing"
          placeholder="Text field"
          required={true}
          pattern={"^[a-zA-Z ]*$"}
          errorMessage={"Only alphabets are expected in this field"}
        />
        <ReportUserInput
          label="Name of the local officer / guide of the party"
          type="text"
          name="localOfficerGuideOfParty"
          placeholder="Text field"
          required={true}
        />
        <ReportUserLabel
          label="Operation plan provided to team or not"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="operationPlanProvidedToTeam"
            required={true}
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="operationPlanProvidedToTeam"
            required={true}
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="Map/Sketch map provided to team or not"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="mapProvidedToTeam"
            required={true}
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="mapProvidedToTeam"
            required={true}
          />
        </ReportUserRadioButtonWrapper>


        <ReportUserInput
          label="Strength of backup team (Head Count)"
          type="number"
          name="backupTeam.strength"
          placeholder="Number field"
          required={true}
          min="0"
        />

        <ReportUserInput
          label="Distance of backup team (km)"
          type="number"
          name="distanceOfBackupTeam"
          placeholder="Number field"
          required={true}
          min="0"
        />
        

        <ReportUserInput
          label="Probable departure date of party from base"
          type="date"
          name="partyDepartureFromBase"
          placeholder="Date"
          required={true}
          max={"9999-12-31"}
        />
        
        <ReportUserLabel
          label="Name and Phone no of in-charge"
        />
        <ReportCustomInput2>

          <input type="text" placeholder="Name" name="backupTeam.nameOfIncharge" />
          <input type="number" placeholder="Phone" name="backupTeam.contactNumberOfIncharge" />

        </ReportCustomInput2>

        <ReportUserInput
          label="Issue of Command Certificate"
          type="text"
          name="commandCertificateIssued"
          placeholder="Text field"
          required={true}
        />
        <ReportUserInput
          label="Time schedule of Operation SITREP to SCC"
          type="time"
          name="SITREPToSSC"
          placeholder="Enter the schedule"
          required={true}
        />
        
      </ReportContentWrapper>
      <SubmitButton type="submit">Save</SubmitButton>
      {/* this is the button to download the form */}
      <SubmitButton type="button" onClick={props.functionHandleDownloadForms}>Download</SubmitButton>
    </form>);


  const checklistformReport = (
    <form onSubmit={props.checklistFormSubmitHandler} id={CHECKLIST_REPORT_FORM_ID}
      onInput={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
      onFocus={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
      onChange={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
    >

      <ReportContentWrapper>
        {/* name of the operation, disabled, will be retrieved, based on */}
        <ReportUserInput
          label="Name of the Operation"
          type="text"
          id="operationName_checkList"
          disabled={true}
        />
        <ReportUserLabel
          label="NVD with Battery"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="nvdWithBattery"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="nvdWithBattery"
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="Search Light Provided"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="searchLight"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="searchLight"
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="Torch"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="torch"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="torch"
          />
        </ReportUserRadioButtonWrapper>
        <ReportUserLabel
          label="First Aid Kits"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="firstAidKit"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="firstAidKit"
          />
        </ReportUserRadioButtonWrapper>
        <ReportUserLabel
          label="Bullet-proof Jacket and Helmet"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="bulletProofJacketWithHelmet"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="bulletProofJacketWithHelmet"
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="Communication Equipment (Satellite Phone)"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="communicationEquipments"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="communicationEquipments"
          />

        </ReportUserRadioButtonWrapper>


        <ReportUserLabel
          label="Pen / Pencil"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="penPencil"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="penPencil"
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="Camera"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            name="camera"
            defaultValue="true"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            name="camera"
            defaultValue="false"
          />
        </ReportUserRadioButtonWrapper>


        <ReportUserLabel
          label="Snake bit kit/Anti-Venom kit"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="antiVenomKit"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="antiVenomKit"
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="Weapon/Ammunition/UBGL"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="weapon"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="weapon"
          />
        </ReportUserRadioButtonWrapper>

        <DropDown
          //the label for the dropdown
          header={"Mode of Transportation"}
          //style to match the styled.input
          styles={styles}
          //the options passed down to it
          children={props.fModesOfTransportation}
          //id to uniquely identify this dropdown.
          id={CHECKLIST_FORM_MODE_OF_TRANSPORTATION}
          //universal handler for dropdown based on the id.
          onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
          //this is the name using which form data will get it value
          name={"modeOfTransportation"}
          //headerStyle to be passed to the header of dropdown
          headerStyle={headerStyle}
        />
        <ReportUserLabel
          label="GPS"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="gps"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="gps"
          />
        </ReportUserRadioButtonWrapper>


        <ReportUserLabel
          label="Dry Ration / Cooked Ration"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Dry"
            type="radio"
            defaultValue="true"
            name="ration"
          />
          <ReportUserRadioButton
            label="Cooked"
            type="radio"
            defaultValue="false"
            name="ration"
          />
        </ReportUserRadioButtonWrapper>
        <ReportUserLabel
          label="Cooking Utensils"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Yes"
            type="radio"
            defaultValue="true"
            name="cookingUtensils"
          />
          <ReportUserRadioButton
            label="No"
            type="radio"
            defaultValue="false"
            name="cookingUtensils"
          />
        </ReportUserRadioButtonWrapper>

        <ReportUserLabel
          label="DVD (Binocular / Telescope)"
        />
        <ReportUserRadioButtonWrapper>
          <ReportUserRadioButton
            label="Binocular"
            type="radio"
            defaultValue="true"
            name="dvd"
          />
          <ReportUserRadioButton
            label="Telescope"
            type="radio"
            defaultValue="false"
            name="dvd"
          />
        </ReportUserRadioButtonWrapper>

        <DropDown
          //the label for the dropdown
          header={"Condition of Communication Equipment"}
          //style to match the styled.input
          styles={styles}
          //the options passed down to it
          children={props.fConditionOfEquipments}
          //id to uniquely identify this dropdown.
          id={CHECKLIST_FORM_CONDITION_OF_COMMUNICATION_EQUIPMENT}
          //universal handler for dropdown based on the id.
          onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
          //headerStyle to be passed to the header of dropdown
          headerStyle={headerStyle}
          //name using which form data entries will retrive this
          name={"conditionOfEquipments"}
        />
      </ReportContentWrapper>
      <SubmitButton type="submit">Submit</SubmitButton>
      {/* Download button for the form */}
      <SubmitButton type="button" onClick={props.functionHandleDownloadForms}>Download</SubmitButton>
    </form>);


  const deBriefFormat = (<form onSubmit={props.deBriefFormSubmitHandler} id={DEBRIEF_REPORT_FORM_ID}
    onInput={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
    onFocus={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
    onChange={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}>

    <ReportContentWrapper>
      {/* form name field */}

      <BoldWrapper>
      <ReportUserLabel
          label="A. Details of the Opeartion"
      />
      </BoldWrapper>
      
      <ReportUserInput
        label="Name of the operation"
        type="text"
        id="operationName_debrief"
        disabled={true}
      />
       <ReportUserInput
        label="No. of team participated"
        type="text"
        name="noOfTeamParticipated"
        placeholder="Text & Number field"
      />
      <ReportUserInput
        label="Area of Operation"
        type="text"
        name="Area of operation"
        placeholder="Text field"
        id="areaOfOperation"
      />
      {/* added a wrapper around the button, to make it look like a button */}
      <ReportCustomInput2>
        <button type="button" onClick={props.pickLatLong} id="btn-areaOfOperation">Mark Area</button>
      </ReportCustomInput2>
      <ReportUserInput
        label="PS limit/Sub-division/CAPF-Area of Responsibility"
        type="text"
        name="PS limit/Sub-division/CAPF-Area of Responsibility"
        placeholder="Text  field"
      />
       <ReportUserLabel
        label="Coordinates of DP/PP"
      />
      <ReportUserLabel
        label="Deploy Point (DP)"
      />
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="deploypoint.latitude[0]-deploypoint.longitude[0]">Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title="Latitude" name="deploypoint.latitude" id="deploypoint.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude " name="deploypoint.longitude" id="deploypoint.longitude[0]" />

      </ReportCustomInput3>

      <ReportUserLabel
        label="Pickup Point (PP)"
      />
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="pickuppoint.latitude[0]-pickuppoint.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="pickuppoint.latitude" id="pickuppoint.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude" name="pickuppoint.longitude" id="pickuppoint.longitude[0]" />

      </ReportCustomInput3>
      <ReportUserInput
       label="Map No."
       type="text"
       name="mapNo"
       placeholder="Enter the map Number"
       maxLength={5}
       pattern={"^[a-zA-Z0-9 ]*$"}
       errorMessage={"Special Symbols are not allowed"} 
      />
      <ReportUserInput
        label="Date of the operation"
        type="date"
        name="Date of the operation"
        placeholder="Date"
        max={"9999-12-31"}
      />
 
      <ReportUserInput
        label="Duration of the operation"
        type="text"
        name="Duration of the operation"
        placeholder="Text & Number field"
      />
      <DropDown
        //label of the dropdown
        header={"Type of Operation"}
        //style that is passed to it
        styles={styles}
        //options given in the dropdown
        children={props.fTypesOfOperations}
        //universal on Change handler for dropDown
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //unique id of this drop down
        id={DEBRIEFING_FORM_TYPES_OF_OPERATION_DROPDOWN}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name to be given to the formdata entries
        name={"Type of the operation"}
      />
      
      <BoldWrapper>
      <ReportUserLabel
        label="B. Details of Terrain"
      />
      </BoldWrapper>
      

      <DropDown
        //label for the dropdown
        header={"Type of terrain"}
        //unique id to be used in onChange
        id={DEBRIEFING_FORM_TYPES_OF_TERRAIN_DROPDOWN}
        //style of the dropdown        
        styles={styles}
        //options passed to it
        children={props.fTypesOfTerrain}
        //universal dropDown Handler for forms
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //this name will be used to retreives its value in formdata entries
        name={"terrain.terrainType"}
      />
      <DropDown
        //label for the dropdown
        header={"Type of terrain including types of vegetation"}
        //unique id to be used in onChange
        id={DEBRIEFING_FORM_TYPES_OF_VEGETATION_DROPDOWN}
        //style of the dropdown        
        styles={styles}
        //options passed to it
        children={props.fTypeOfTerrainIncludingTypesOfVegetation}
        //universal dropDown Handler for forms
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //this name will be used to retreives its value in formdata entries
        name={"terrain.vegetationType"}
      />
       <PlusMinusWrapper>
        <ReportUserLabel
          label="Water points (Seasonal)"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "tSeasonalWaterPoints"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={1 + '-' + "tSeasonalWaterPoints"} style={PlusMinusButton}> - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.seasonalWaterPoints.latitude[0]-terrain.seasonalWaterPoints.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title="Latitude" name="terrain.seasonalWaterPoints.latitude" id="terrain.seasonalWaterPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude" name="terrain.seasonalWaterPoints.longitude" id="terrain.seasonalWaterPoints.longitude[0]" />

      </ReportCustomInput3>

      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tSeasonalWaterPointsay*/}

        {
          props.tSeasonalWaterPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>
                <button type="button" onClick={props.pickLatLong} id={"terrain.seasonalWaterPoints.latitude[" + (index + 1) + "]-terrain.seasonalWaterPoints.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.seasonalWaterPoints.latitude" id={"terrain.seasonalWaterPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.seasonalWaterPoints.longitude" id={"terrain.seasonalWaterPoints.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>
            </div>
          })
        }
      </div>

       <PlusMinusWrapper>
        <ReportUserLabel
          label="Water point (Perennial)"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "tPerenialWaterPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "tPerenialWaterPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.perrenialWaterPoints.latitude[0]-terrain.perrenialWaterPoints.longitude[0]">Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="terrain.perrenialWaterPoints.latitude" id="terrain.perrenialWaterPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="terrain.perrenialWaterPoints.longitude" id="terrain.perrenialWaterPoints.longitude[0]" />

      </ReportCustomInput3>

      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

        {
          props.tPerenialWaterPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"terrain.perrenialWaterPoints.latitude[" + (index + 1) + "]-terrain.perrenialWaterPoints.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.perrenialWaterPoints.latitude" id={"terrain.perrenialWaterPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.perrenialWaterPoints.longitude" id={"terrain.perrenialWaterPoints.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Ambush Points"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={3 + 1 + "-" + "tambushPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "tambushPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" id={"terrain.ambushPoints.latitude[0]-terrain.ambushPoints.longitude[0]"} onClick={props.pickLatLong} name={"Point"} >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title="Latitude" name="terrain.ambushPoints.latitude" id="terrain.ambushPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude " name="terrain.ambushPoints.longitude" id="terrain.ambushPoints.longitude[0]" />

      </ReportCustomInput3>

      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the array*/}

        {
          props.arr.map((item, index) => {
            return <div>

              <ReportCustomInput3>

                <button type="button" id={"terrain.ambushPoints.latitude[" + (index + 1) + "]-terrain.ambushPoints.longitude[" + (index + 1) + "]"} onClick={props.pickLatLong} name={"Point"}>Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.ambushPoints.latitude" id={"terrain.ambushPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.ambushPoints.longitude" id={"terrain.ambushPoints.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Possible hideouts"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "tHideOuts"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "tHideOuts"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.possibleHideOuts.latitude[0]-terrain.possibleHideOuts.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title="Latitude" name="terrain.possibleHideOuts.latitude" id="terrain.possibleHideOuts.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude " name="terrain.possibleHideOuts.longitude" id="terrain.possibleHideOuts.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tHideOutsay*/}

        {
          props.tHideOuts.map((item, index) => {
            return <div>
              <ReportCustomInput3>
                <button type="button" onClick={props.pickLatLong} id={"terrain.possibleHideOuts.latitude[" + (index + 1) + "]-terrain.possibleHideOuts.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.possibleHideOuts.latitude" id={"terrain.possibleHideOuts.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.possibleHideOuts.longitude" id={"terrain.possibleHideOuts.longitude[" + (index + 1) + "]"} />
              </ReportCustomInput3>

            </div>
          })
        }
      </div>
      <DropDown
        //label for the drop Down
        header={"Near by villages"}
        //unique id for the dropdown.
        id={DEBRIEFING_FORM_LIST_OF_NEARBY_VILLAGES_DROPDOWN}
        //style for the dropdown
        styles={styles}
        //options provided to this dropdown.
        children={props.fNamesOfVillages}
        //universal on Change handler handles based on id
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
      />
      <DropDown
        //label for the drop Down
        header={"Hostile villages"}
        //unique id for the dropdown.
        id={DEBRIEFING_FORM_LIST_OF_HOSTILE_VILLAGES_DROPDOWN}
        //style for the dropdown
        styles={styles}
        //options provided to this dropdown.
        children={props.fNamesOfVillages}
        //universal on Change handler handles based on id
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
      />
      <DropDown
        //label for the drop Down
        header={"Friendly villages"}
        //unique id for the dropdown.
        id={DEBRIEFING_FORM_LIST_OF_FRIENDLY_VILLAGES_DROPDOWN}
        //style for the dropdown
        styles={styles}
        //options provided to this dropdown.
        children={props.fNamesOfVillages}
        //universal on Change handler handles based on id
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
      />
     
      <ReportUserLabel
        label="Approach Road"
      />
      <ReportCustomInput3>

        <button type="button" id={"approachRoad.latitude[0]-approachRoad.longitude[0]"} onClick={props.pickLatLong}  >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="approachRoad.latitude" id="approachRoad.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="approachRoad.longitude" id="approachRoad.longitude[0]" />


      </ReportCustomInput3>
      
      <ReportUserLabel
        label={"Electricity"}
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="false"
          name="debriefElectricity"
          id={DEBRIEFING_FORM_ELECTRICITY_RADIO_BUTTON_YES}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="true"
          name="debriefElectricity"
          id={DEBRIEFING_FORM_ELECTRICITY_RADIO_BUTTON_NO}
        />
      </ReportUserRadioButtonWrapper>

      <ReportUserLabel
        label="Sandy/Market location"
      />
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id={"terrain.marketLocation.latitude[0]-terrain.marketLocation.longitude[0]"} >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="terrain.marketLocation.latitude" id={"terrain.marketLocation.latitude[0]"} />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="terrain.marketLocation.longitude" id={"terrain.marketLocation.longitude[0]"} />


      </ReportCustomInput3>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Frequently used track by police"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.frequentlyUsedTracksByPolice.length) + 1 + "-" + "frequentlyUsedTracksByPolice"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "frequentlyUsedTracksByPolice"} style={PlusMinusButton} > - </button>

      <ReportCustomInput2>

        <button type="button" onClick={props.pickLatLong} id="btn-terrain.frequentlyUsedTracksByPolice[0]">Mark Line</button>
        <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="terrain.frequentlyUsedTracksByPolice" id="terrain.frequentlyUsedTracksByPolice[0]" />

      </ReportCustomInput2>


      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.frequentlyUsedTracksByPolice.map((item, index) => {
            return (
              <div>
                <ReportCustomInput2>

                  <button type="button" id={"btn-terrain.frequentlyUsedTracksByPolice[" + (index + 1) + "]"} onClick={props.pickLatLong} >Mark Line</button>
                  <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="terrain.frequentlyUsedTracksByPolice" id={"terrain.frequentlyUsedTracksByPolice[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>);
          })

        }
      </div>

      {/* end HERE */}

<PlusMinusWrapper>
        <ReportUserLabel
          label="Frequently used track by Maoists"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.frequentlyUsedTracksByMaoists.length) + 1 + "-" + "frequentlyUsedTracksByMaoists"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "frequentlyUsedTracksByMaoists"} style={PlusMinusButton} > - </button>

      <ReportCustomInput2>

        <button type="button" onClick={props.pickLatLong} id="btn-terrain.frequentlyUsedTracksByMaoists[0]">Mark Line</button>
        <input type="text" placeholder="North,East" title="Latitude,Longitude" name="terrain.frequentlyUsedTracksByMaoists" id="terrain.frequentlyUsedTracksByMaoists[0]" />

      </ReportCustomInput2>
      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.frequentlyUsedTracksByMaoists.map((item, index) => {
            return (
              <div>
                <ReportCustomInput2>

                  <button type="button" onClick={props.pickLatLong} id={"btn-terrain.frequentlyUsedTracksByMaoists[" + (index + 1) + "]"}  >Mark Line</button>
                  <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="terrain.frequentlyUsedTracksByMaoists" id={"terrain.frequentlyUsedTracksByMaoists[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>);
          })

        }
      </div>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Frequently used track by cattle"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.frequentlyUsedTracksByCattle.length) + 1 + "-" + "frequentlyUsedTracksByCattle"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "frequentlyUsedTracksByCattle"} style={PlusMinusButton}> - </button>
      <ReportCustomInput2>

        <button type="button" onClick={props.pickLatLong} id="btn-terrain.frequentlyUsedTracksByCattle[0]">Mark Line</button>
        <input type="text" placeholder="North,East" title=" Latitude" name="terrain.frequentlyUsedTracksByCattle" id="terrain.frequentlyUsedTracksByCattle[0]" />

      </ReportCustomInput2>

      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.frequentlyUsedTracksByCattle.map((item, index) => {
            return (
              <div>
                <ReportCustomInput2>

                  <button type="button" onClick={props.pickLatLong} id={"btn-terrain.frequentlyUsedTracksByCattle[" + (index + 1) + "]"}  >Mark Line</button>
                  <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="terrain.frequentlyUsedTracksByCattle" id={"terrain.frequentlyUsedTracksByCattle[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>);
          })

        }
      </div>


      <PlusMinusWrapper>
        <ReportUserLabel
          label="Dominating points"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "tDominatingPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "tDominatingPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.dominatingPoints.latitude[0]-terrain.dominatingPoints.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title="Latitude" name="terrain.dominatingPoints.latitude" id="terrain.dominatingPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude " name="terrain.dominatingPoints.longitude" id="terrain.dominatingPoints.longitude[0]" />
      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tDominatingPointsay*/}

        {
          props.tDominatingPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"terrain.dominatingPoints.latitude[" + (index + 1) + "]-terrain.dominatingPoints.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.dominatingPoints.latitude" id={"terrain.dominatingPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.dominatingPoints.longitude" id={"terrain.dominatingPoints.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Possible LUPs"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "tPossibleLups"} style={PlusMinusButton}> + </button>
      <button type="button" id={2 + '-' + "tPossibleLups"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.possibleLUPs.latitude[0]-terrain.possibleLUPs.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="terrain.possibleLUPs.latitude" id="terrain.possibleLUPs.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="terrain.possibleLUPs.longitude" id="terrain.possibleLUPs.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the  tPossibleLupsay */}

        {
          props.tPossibleLups.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"terrain.possibleLUPs.latitude[" + (index + 1) + "]-terrain.possibleLUPs.longitude[" + (index + 1) + "]"}>Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.possibleLUPs.latitude" id={"terrain.possibleLUPs.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.possibleLUPs.longitude" id={"terrain.possibleLUPs.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>
            </div>
          })
        }
      </div>
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Bridges and Culverts"
        />
      </PlusMinusWrapper>
      {/* button id should contain both the stateVariable name and the length of the elments in the  tBridgesAndCulvertsay*/}
      <button type="button" onClick={props.createNewField} id={parseInt(props.tBridgesAndCulverts.length) + 1 + "-" + "tBridgesAndCulverts"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + " tBridgesAndCulverts"} onClick={props.deleteItem} style={PlusMinusButton}> - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.bridgeAndCulverts.latitude[0]-terrain.bridgeAndCulverts.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="terrain.bridgeAndCulverts.latitude" id={"terrain.bridgeAndCulverts.latitude[0]"} />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="terrain.bridgeAndCulverts.longitude" id={"terrain.bridgeAndCulverts.longitude[0]"} />

      </ReportCustomInput3>
      <div>

        {
          props.tBridgesAndCulverts.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"terrain.bridgeAndCulverts.latitude[" + (index + 1) + "]-terrain.bridgeAndCulverts.longitude[" + (index + 1) + "]"} >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.bridgeAndCulverts.latitude" id={"terrain.bridgeAndCulverts.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.bridgeAndCulverts.longitude" id={"terrain.bridgeAndCulverts.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Possible ferry points in case of water bodies"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "tFerryPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "tFerryPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.ferryPoints.latitude[0]-terrain.ferryPoints.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title="Latitude" name="terrain.ferryPoints.latitude" id="terrain.ferryPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title="Longitude" name="terrain.ferryPoints.longitude" id="terrain.ferryPoints.longitude[0]" />

      </ReportCustomInput3>

      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tFerryPointsay*/}

        {
          props.tFerryPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"terrain.ferryPoints.latitude[" + (index + 1) + "]-terrain.ferryPoints.longitude[" + (index + 1) + "]"} >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="terrain.ferryPoints.latitude" id={"terrain.ferryPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="terrain.ferryPoints.longitude" id={"terrain.ferryPoints.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Harbour points"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={3 + 1 + "-" + "tHarbourPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={3 + '-' + "tHarbourPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="terrain.harbourPoints.latitude[0]-terrain.harbourPoints.longitude[0]">Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="terrain.harbourPoints.latitude" id="terrain.harbourPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="terrain.harbourPoints.longitude" id="terrain.harbourPoints.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the  tHarbourPointsay*/}

        {
          props.tHarbourPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>
                <button type="button" onClick={props.pickLatLong} id={"terrain.harbourPoints.latitude[" + (index + 1) + "]-terrain.harbourPoints.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name=" terrain.harbourPoints.latitude" id={"terrain.harbourPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name=" terrain.harbourPoints.longitude" id={"terrain.harbourPoints.longitude[" + (index + 1) + "]"} />
              </ReportCustomInput3>
            </div>
          })
        }
      </div>

      
      <BoldWrapper>
      <ReportUserLabel
        label="C. About the Participants"
      />
      </BoldWrapper>
      

       <ReportUserInput
        label="Name of Team Leader"
        type="text"
        name="participants.teams.nameOfIncharge"
        placeholder="Text field"
      />
      
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Contact numbers of Team Leader"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.contactNumberOfIncharge.length) + 1 + "-" + "contactNumberOfIncharge"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "contactNumberOfIncharge"} style={PlusMinusButton}> - </button>

      <ReportUserInput
        type="number"
        name="participants.teams.contactNumberOfIncharge"
        id="participants.teams.contactNumberOfIncharge[0]"
        placeholder="Enter Mobile Number"
      />

      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.contactNumberOfIncharge.map((item, index) => {
            return (
              //no need for the div around this, also, for consistency the same component should be used
              <ReportUserInput
                type="number"
                placeholder="Mobile Number"
                title="Mobile number" name="participants.teams.contactNumberOfIncharge"
                id={"participants.teams.contactNumberOfIncharge[" + (index + 1) + "]"}
              />
            );
          })

        }
      </div>

      {/* end HERE */}

     
       {/* Friendly forces available in the area radio buttons*/}
       <ReportUserLabel
        label={"Friendly forces available in the area"}
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="false"
          name="friendlyForces"
          id={DEBRIEFING_FORM_FRIENDLY_FORCES_IN_AREA_RADIO_BUTTON_YES}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="true"
          name="friendlyForces"
          id={DEBRIEFING_FORM_FRIENDLY_FORCES_IN_AREA_RADIO_BUTTON_NO}
        />
      </ReportUserRadioButtonWrapper>

       <ReportUserInput
        label="Strength of individual team"
        type="number"
        min={0}
        name="participants.StrengthOfIndividualTeam"
        placeholder="Number field"
      />

     
        <ReportUserLabel
          label="Weapons"
        />

        {/* types of weapons title and count */}
        <DropDown
          //label for the dropdown
          header={"Title"}
          //unique id to be used in onChange
          id={FEEDBACK_REPORT_TYPES_OF_WEAPONS_DROPDOWN}
          //style of the dropdown        
          styles={styles}
          //options passed to it
          children={props.fTypesOfWeapons}
          //universal dropDown Handler for forms
          onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
          //headerStyle to be passed to the header of dropdown
          headerStyle={headerStyle}
          //this name will be used to retreives its value in formdata entries
          name={"participants.weapons.datanode"}
        />
        <PlusMinusWrapper>
          <ReportUserLabel
            label="Count"
          />
        </PlusMinusWrapper>
        {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}
        <button type="button" onClick={props.functionCreateNewDropDown} name={FEEDBACK_REPORT_TYPES_OF_WEAPONS_ADD_BUTTON_NAME} id={2 + 1 + "-" + "pweapons"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "pweapons"} name={FEEDBACK_REPORT_TYPES_OF_WEAPONS_ADD_BUTTON_NAME} onClick={props.functionDeleteExistingDropDown} style={PlusMinusButton} > - </button>
        <ReportUserInput
          type="number"
          name="participants.weapons.datacount"
          placeholder="Count"
          pattern="[0-9]+"
          title="Count"
        />


        <div>
          
          {props.dRVariableDropdownIds[`${FEEDBACK_REPORT_TYPES_OF_WEAPONS_ADD_BUTTON_NAME}`] ?
            props.dRVariableDropdownIds[`${FEEDBACK_REPORT_TYPES_OF_WEAPONS_ADD_BUTTON_NAME}`].map((item) => {
              return (<div key={item + "_PARENT_DIV"}>
                <DropDown
                  //label for the dropdown
                  header={"Title"}
                  //unique id to be used in onChange
                  id={item + "_DROPDOWN"}
                  //style of the dropdown        
                  styles={styles}
                  //options passed to it
                  children={props.fTypesOfWeapons}
                  //universal dropDown Handler for forms
                  onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
                  //headerStyle to be passed to the header of dropdown
                  headerStyle={headerStyle}
                  //this name will be used to retreives its value in formdata entries
                  name={"participants.weapons.datanode"}
                />

                <ReportUserInput
                  label="Count"
                  type="number"
                  id={item + "_INPUT_NUMBER"}
                  name="participants.weapons.datacount"
                  placeholder="Count"
                  pattern="[0-9]+"
                  title="Count"
                />
              </div>)
            }) : null
          }
        </div>


       <ReportUserInput
        label="Ammunition Title"
        type="text"
        name="participants.ammunitions.datanode"
        id="participants.ammumitions.datanode[0]"
        placeholder="Text Field" pattern="[A-Za-z]+" title="Name"
      />
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Ammunition Count"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "pammunitions"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "pammunitions"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportUserInput
        type="number"
        name="participants.ammunitions.datacount"
        id="participants.ammumitions.datacount[0]"
        placeholder=" Number Field" pattern="[0-9]+" title="Count"
      />
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

        {
          props.pammunitions.map((item, index) => {
            return <div>
              <ReportCustomInput2>

                <input type="text" placeholder="Title" title="Name" name="participants.ammunitions.datanode" id={"participants.ammunitions.datanode[" + (index + 1) + "]"} />
                <input type="text" placeholder="Count" title="Count" name="participants.ammunitions.datacount" id={"participants.ammunitions.datacount[" + (index + 1) + "]"} />

              </ReportCustomInput2>
            </div>
          })
        }
      </div> 

       <ReportUserLabel
        label="Equipments"
      />

      <ReportCustomInput>
        <ReportUserLabel
          label="Navigation"
        />
        <input type="text" placeholder="Text field" name="participants.navigationEquipment" />
      </ReportCustomInput>

      <ReportCustomInput>
        <ReportUserLabel
          label="Observation"
        />
        <input type="text" placeholder="Text field" name="participants.observationEquipement" />
      </ReportCustomInput>

      <ReportUserLabel
        label="Photography"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="participants.photographyEquipment"
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="participants.photographyEquipment"
        />
      </ReportUserRadioButtonWrapper>
      <ReportUserLabel
        label="When photo taken GR of Strategic points be mentioned"
      />
      <ReportCustomInput3>
      
        <button type="button" onClick={props.pickLatLong} id="participants.GROfStrategicPoints.latitude[0]-participants.GROfStrategicPoints.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="participants.GROfStrategicPoints.latitude" id="participants.GROfStrategicPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="participants.GROfStrategicPoints.longitude" id="participants.GROfStrategicPoints.longitude[0]" />

      </ReportCustomInput3>

       <DropDown
        //label for the dropDown
        header={"Communication equipment - Title"}
        //style for the dropDown
        styles={styles}
        //options passed to it
        children={props.fTypesOfCommunicationEquipments}
        //unique id to be used in onChange
        id={DEBRIEFING_FORM_COMMUNICATION_EQUIPMENT_TITLE_DROPDOWN}
        //universal handler
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name will be used to retrieve this forms data in the formdata entries
        name={"participants.communicationEquipment.datanode"}
      />
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Communication equipment - Count"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "pcommunicationEquipment"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "pcommunicationEquipment"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportUserInput
        type="number"
        name="participants.communicationEquipment.datacount"
        id="participants.communicationEquipment.datacount[0]"
        placeholder="Number Field" pattern="[0-9]+" title="Count"
      />
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

        {
          props.pcommunicationEquipment.map((item, index) => {
            return <div>
              <ReportCustomInput2>

                <input type="text" placeholder="Title" title="Name" name="participants.communicationEquipment.datanode" id={"participants.communicationEquipment.datanode[" + (index + 1) + "]"} />
                <input type="text" placeholder="Count" title="Count" name="participants.communicationEquipment.datacount" id={"participants.communicationEquipment.datacount[" + (index + 1) + "]"} />

              </ReportCustomInput2>
            </div>
          })
        }
      </div>

       <ReportUserInput
        label="Food items carried - Title"
        type="text"
        name="participants.foodItem.datanode"
        id="participants.foodItem.datanode[0]"
        placeholder="Text Field"
      />
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Food items carried - Count"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "pfoodItems"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "pfoodItems"} onClick={props.deleteItem} style={PlusMinusButton}> - </button>
      <ReportUserInput
        type="number"
        name="participants.foodItem.datacount"
        id="participants.foodItem.datacount[0]"
        placeholder="Number Field"
      />
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

        {
          props.pfoodItems.map((item, index) => {
            return <div>
              <ReportCustomInput2>

                <input type="text" placeholder="Title" title="Name" name="participants.foodItem.datanode" id={"participants.foodItem.datanode[" + (index + 1) + "]"} />
                <input type="text" placeholder="Count" title="Count" name="participants.foodItem.datacount" id={"participants.foodItem.datacount[" + (index + 1) + "]"} />

              </ReportCustomInput2>
            </div>
          })
        }
      </div>

         <ReportUserLabel
        label="First aid and Medical items carried"
      />
      {/* radio button wrapper */}
      <ReportUserRadioButtonWrapper>
        {/* yes radio button */}
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="participants.firstAid.datanode"
          id={DEBRIEFING_FORM_FIRST_AID_MEDICAL_ITEMS_TITLE_CARRIED_RADIO_BUTTON_YES}
        />
        {/* no radio button */}
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="participants.firstAid.datanode"
          id={DEBRIEFING_FORM_FIRST_AID_MEDICAL_ITEMS_TITLE_CARRIED_RADIO_BUTTON_NO}
        />
      </ReportUserRadioButtonWrapper>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="First aid and Medical items carried - Count"
        />
      </PlusMinusWrapper>
       {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}
      <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "pfirstAid"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "pfirstAid"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>

      <ReportUserInput
        type="number"
        name="participants.firstAid.datacount"
        placeholder="Number Field" pattern="[0-9]+" title="Count"
      />
     
      <div>
       

        {
          props.pfirstAid.map((item, index) => {
            return <div>
              <ReportCustomInput2>

                <input type="text" placeholder="Title" title="Name" name="participants.firstAid.datanode" id={"participants.firstAid.datanode[" + (index + 1) + "]"} />
                <input type="text" placeholder="Count" title="Count" name="participants.firstAid.datacount" id={"participants.firstAid.datacount[" + (index + 1) + "]"} />

              </ReportCustomInput2>
            </div>
          })
        }
      </div>


      <ReportUserInput
        label="Strength of Backup Team"
        type="number"
        name="participants.teams.strengthOfBackupTeam"
        placeholder="Number field"
      />
      
      <BoldWrapper>
        <ReportUserLabel
          label="D. Quality"
        />
      
      </BoldWrapper>
      <ReportUserInput
        label="Quality of Intelligence "
        type="text"
        name="qualityOfIntelligence"
        placeholder="Text field"
      />
      
      <ReportUserInput
        label=" Quality of guide"
        type="text"
        name="qualityOfGuide"
        placeholder="Text field"
      />
      
      <BoldWrapper>
      <ReportUserLabel
        label="E. Information gathered"
      />
      </BoldWrapper>
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="informationGathered"
          id="infoT-target1"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="informationGathered"
          id="infoF-target1"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target1">

        <PlusMinusWrapper>
          <ReportUserLabel
            label="Name of the Maoist groups operating"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "imaoistgroup"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "imaoistgroup"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>

        <ReportCustomInput2>

          <input
            //type of the value to be stored       
            type="text"
            //placeholder for title
            placeholder="Title"
            //title of the nfield
            title="Name"
            //name for formdata.entries()
            name="information.maoistGroups.datanode"
            //unique id for the field
            id={DEBRIEFING_FORM_NAME_OF_MAOIST_GROUP_TITLE} />

          <input
            //type of the field
            type="number"
            //placeholder
            placeholder="Head Count"
            //title
            title="Count"
            //name for formdata.entries()
            name="information.maoistGroups.datacount"
            //unique id 
            id={DEBRIEFING_FORM_NAME_OF_MAOIST_GROUP_COUNT} />

        </ReportCustomInput2>


        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.imaoistgroup.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="information.maoistGroups.datanode" id={"information.maoistGroups.datanode[" + (index + 1) + "]"} />
                  <input type="number" placeholder="Head Count" title="Count" name="information.maoistGroups.datacount" id={"information.maoistGroups.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>

        <ReportUserLabel
          label="Last visit by Maoists Group"
        />

        <ReportUserInput
          label="Which group"
          type="text"
          name="information.lastMaoistGroupVisited"
          placeholder="Text & Number field"
        />
        <ReportUserInput
          label="When"
          type="date"
          name="information.lastMaoistVisitDate"
          placeholder="date field"
          max={"9999-12-31"}
        />
        <ReportUserInput
          label="Duration of Stay"
          type="time"
          name="information.durationOfStay"
          placeholder="Text Field"
        />

        <ReportUserInput
          label="Usual place of stay of Maoist and duration of stay"
          type="text"
          name="information.placeOfStay"
          placeholder="Text & Number field"
        />

        <PlusMinusWrapper>
          <ReportUserLabel
            label="Activities of Maoists"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "activitiesOfMaoists"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "activitiesOfMaoists"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
        <ReportCustomInput2>
          <input
            //type of the input
            type="text"
            //place holder for it
            placeholder="Title"
            //title for the input
            title="Name"
            //name used for formdata entries()
            name="information.activitiesOfMaoists.datanode"
            //unique id of the for this input
            id={DEBRIEFING_FORM_ACTIVITIES_OF_MAOISTS_TITLE} />

          <input
            //type of the input
            type="number"
            //placeholder value head count
            placeholder="Head Count"
            title="Count"
            //name used for formData.entries()
            name="information.activitiesOfMaoists.datacount"
            //unique id for this input
            id={DEBRIEFING_FORM_ACTIVITIES_OF_MAOISTS_COUNT} />

        </ReportCustomInput2>

        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.activitiesOfMaoists.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="information.activitiesOfMaoists.datanode" id={"information.activitiesOfMaoists.datanode[" + (index + 1) + "]"} />
                  <input type="number" placeholder="Head Count" title="Count" name="information.activitiesOfMaoists.datacount" id={"information.activitiesOfMaoists.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>


        <ReportUserInput
          label="Telephone no.(People representative of villages) - Name"
          type="text"
          name="information.villageRepresentativesContactNumber.datanode"
          id="information.villageRepresentativesContactNumber.datanode[0]"
          placeholder="Text Field, Number Field" pattern="[A-Za-z]+" title="Name"
        />
        <PlusMinusWrapper>
          <ReportUserLabel
            label="Contact No.- People representative of villages"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "ivillageRepresentativesCountNumber"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "ivillageRepresentativesCountNumber"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
        <ReportUserInput
          type="number"
          name="information.villageRepresentativesContactNumber.datacount"
          id="information.villageRepresentativesContactNumber.datacount[0]"
          placeholder="Number Field" pattern="[0-9]+" title="Count"
        />
        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.ivillageRepresentativesCountNumber.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="information.villageRepresentativesContactNumber.datanode" id={"information.villageRepresentativesContactNumber.datanode[" + (index + 1) + "]"} />
                  <input type="text" placeholder="Count" title="Count" name="information.villageRepresentativesContactNumber.datacount" id={"information.villageRepresentativesContactNumber.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>

          <ReportUserInput
          label="Name and details of villagers supporting Naxal - Name"
          type="text"
          name="information.naxalSupportingVillagers.datanode"
          placeholder="Text Field" pattern="[A-Za-z]+" title="Name"
        />
        <PlusMinusWrapper>
          <ReportUserLabel
            label="Name and details of villagers supporting Naxal - HeadCount"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "inaxalSupportingVillagers"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "inaxalSupportingVillagers"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
        <ReportUserInput
          type="number"
          name="information.naxalSupportingVillagers.datacount"
          placeholder="Number Field" pattern="[0-9]+" title="Count"
        />
        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.inaxalSupportingVillagers.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="information.naxalSupportingVillagers.datanode" id={"information.naxalSupportingVillagers.datanode[" + (index + 1) + "]"} />
                  <input type="text" placeholder="Count" title="Count" name="information.naxalSupportingVillagers.datacount" id={"information.naxalSupportingVillagers.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>
      


        <PlusMinusWrapper>
          <ReportUserLabel
            label="Name of Quacks/Shopkeepers in the Village"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "ishopKeepersInVillage"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "ishopKeepersInVillage"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
        <ReportCustomInput2>
          <input
            //type of the input
            type="text"
            //place holder for it
            placeholder="Title"
            //title for the input
            title="Name"
            //name used for formdata entries()
            name="information.shopKeepersInVillage.datanode"
            //unique id of the for this input
            id={DEBRIEFING_FORM_NAME_OF_QUACKS_IN_VILLAGE_TITLE} />

          <input
            //type of the input
            type="number"
            //placeholder value head count
            placeholder="Head Count"
            title="Count"
            //name used for formData.entries()
            name="information.shopKeepersInVillage.datacount"
            //unique id for this input
            id={DEBRIEFING_FORM_NAME_OF_QUACKS_IN_VILLAGE_COUNT} />
     

        </ReportCustomInput2>

        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.ishopKeepersInVillage.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="information.shopKeepersInVillage.datanode" id={"information.shopKeepersInVillage.datanode[" + (index + 1) + "]"} />
                  <input type="number" placeholder="Head Count" title="Count" name="information.shopKeepersInVillage.datacount" id={"information.shopKeepersInVillage.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>


        <ReportUserLabel
          label="If come across the person in Jungle"
        />
        <ReportCustomInput>
          <ReportUserLabel
            label="Details of him to be examined"

          />
          <input type="text" placeholder="Name & Text field" name="information.suspectedPeople[0].details" />
        </ReportCustomInput>

        <ReportCustomInput>
          <ReportUserLabel
            label="Follow up action to be taken"

          />
          <input type="text" placeholder="Text  field" name="information.suspectedPeople[0].followUpActions" />
        </ReportCustomInput>
        <ReportUserInput
          label="Name of the Suspect"
          type="text"
          name="information.suspectedPeople[0].name"
          placeholder="Text & Number field"
        />
        <ReportUserInput
          label="Contact Number of the Suspect"
          type="number"
          name="information.suspectedPeople[0].contactNumber"
          placeholder="Text & Number field"
        />

      </div>
      <BoldWrapper>
      <ReportUserLabel
        label="F. Safety"
      />
      </BoldWrapper>
      
      <ReportUserInput
        label="How was the route covered up to DP"
        type="text"
        name="routeCoveredUpToDP"
        placeholder="Text field"
      />
      <ReportUserLabel
        label="Was the DP and PP safe"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          value="true"
          name="dpAndppSafe"
          // !the part after hyphen in these ids should
          // !match the field they are trying to hide
          id="dpAndPPSafeT-dpAndPPSafeIssueTextField"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          value="false"
          name="dpAndppSafe"
          // !the part after hyphen in these ids should
          // !match the field they are trying to hide
          id="dpAndPPSafeF-dpAndPPSafeIssueTextField"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>
      <ReportUserInput
        type="text"
        name="safetyIssue"
        placeholder="Describe the Safety issue"
        id="dpAndPPSafeIssueTextField"
      />
      <ReportUserLabel
        label="Was the time of DP & PP safe"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="timeOfdpAndppSafe"
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="timeOfdpAndppSafe"
        />
      </ReportUserRadioButtonWrapper>
      <ReportUserInput
        type="text"
        name="timeIssue"
        placeholder="Describe the issue"
      />
      
      <BoldWrapper>
      <ReportUserLabel
        label="G. Mode of travel"
      />
      </BoldWrapper>
      
      <DropDown
        //label for the dropdown
        header={"To DP"}
        //unique id to be used in onChange
        id={DEBRIEFING_FORM_MODE_OF_TRAVEL_TO_DP_DROPDOWN}
        //style of the dropdown        
        styles={styles}
        //options passed to it
        children={props.fModesOfTransportation}
        //universal dropDown Handler for forms
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name using which this will be retrieved from formData entries
        name={"modeOfTraveltoDP"}
      />
      <DropDown
        //label for the dropdown
        header={"From PP"}
        //unique id to be used in onChange
        id={DEBRIEFING_FORM_MODE_OF_TRAVEL_FROM_PP_DROPDOWN}
        //style of the dropdown        
        styles={styles}
        //options passed to it
        children={props.fModesOfTransportation}
        //universal dropDown Handler for forms
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name using which this will be retrieved from formData entries
        name={"modeOfTravelfromPP"}
      />
      
      <BoldWrapper>
      <ReportUserLabel
        label="H. Communication Monitoring"
      />
      </BoldWrapper>
      
      <ReportUserInput
        label="Password"
        type="password"
        name="password"
        placeholder="Password field"
      />
      <ReportUserInput
        label="Counter Password"
        type="password"
        name="counterPassword"
        placeholder="Password field"
      />
      <PlusMinusWrapper>
        <ReportUserLabel
          label="Time of reporting to TCC/SCC"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.timeOfReporting.length) + 1 + "-" + "timeOfReporting"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "timeOfReporting"} style={PlusMinusButton} > - </button>
      <ReportUserInput
        type="time"
        name="timeOfReporting"
        id="timeOfReporting[0]"
        placeholder="Time field (24hrs)"
      />
      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.timeOfReporting.map((item, index) => {
            return (
              <div>
                <input type="time" placeholder="Time field (24hrs)" title="Mobile number" name="timeOfReporting" id={"timeOfReporting[" + (index + 1) + "]"} />
              </div>);
          })

        }
      </div>

      {/* end HERE */}

      

      <BoldWrapper>
      <ReportUserLabel
        label="I. Connectivity Mapping"
      />
      </BoldWrapper>
      
      <ReportUserInput
        label="Which service provider is getting Connected"
        type="text"
        name="serviceProviderConnected"
        placeholder="Text field"
      />
      <ReportUserLabel
        label="Identify the area(GR) with mobile Connectivity"
      />
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="areaWithMobileConnectivity.latitude[0]-areaWithMobileConnectivity.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="areaWithMobileConnectivity.latitude" id="areaWithMobileConnectivity.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="areaWithMobileConnectivity.longitude" id="areaWithMobileConnectivity.longitude[0]" />

      </ReportCustomInput3>

    
      <BoldWrapper>
        <ReportUserLabel
          label="J. Status"
        />
       
      </BoldWrapper>
      <DropDown
        //label for the dropDown
        header={"Status of satellite phone"}
        //style for the dropDown
        styles={styles}
        //options passed to it
        children={props.fStatusOfSatellitePhoneDropDownChildren}
        //unique id to be used in onChange
        id={DEBRIEFING_FORM_STATUS_OF_SATELLITE_PHONE_DROPDOWN}
        //universal handler
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name will be used to retrieve this inputs data in formData entries
        name={"statusOfSatellitePhone"}
      />
      
      <BoldWrapper>
      <ReportUserLabel
        label="K. ShortComings observed"
      />
      </BoldWrapper>
      
      <ReportUserLabel
        label="In planning"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="shortComingInPlanning"
          id="planningT-target4"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="shortComingInPlanning"
          id="planningF-target4"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target4">

        <ReportUserInput
          type="text"
          name="shortComingIssueInPlanning"
          placeholder="Text  field"
        />
      </div>

      <ReportUserLabel
        label="In briefing"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="shortComingInBriefing"
          id="BriefingT-target5"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="shortComingInBriefing"
          id="BriefingF-target5"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target5">

        <ReportUserInput
          type="text"
          name="shortComingIssueInBriefing"
          placeholder="Text  field"
        />
      </div>

      <ReportUserLabel
        label="In execution of Ops"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="shortComingInExecution"
          value="true"
          id="ExecutionT-target6"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="shortComingInExecution"
          id="ExecutionF-target6"
          value="false"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target6">

        <ReportUserInput
          type="text"
          name="shortComingIssueInExecution"
          placeholder="Descrinbe the short Comings"
        />

      </div>
      
      <BoldWrapper>
        <ReportUserLabel
          label="L. Detail"
        />
        
      </BoldWrapper>
      <ReportUserInput
        label="Details of Achievements"
        type="text"
        name="achievements"
        placeholder="Text field"
      />
   
     
      <BoldWrapper>
      <ReportUserLabel
        label="M. Exchange of Fire"
      />
      </BoldWrapper>
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="exchangeOfFire"
          id="fireT-target2"
          onChange={props.hideOtherFields}

        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="exchangeOfFire"
          id="fireF-target2"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target2">

        <ReportUserInput
          label="Date"
          type="date"
          name="fireExchange.date"
          placeholder="Date"
          max={"9999-12-31"}
        />
         <ReportUserInput
          label="Time"
          type="time"
          name="fireExchange.timeDuration"
          placeholder="Number field "
        />
         <ReportUserInput
          label="Place"
          type="text"
          name="fireExchange.place"
          placeholder="Text & Number field"
        />
        <ReportUserInput
          label="Maoist group - Title"
          type="text"
          name="fireExchange.maoistgroup.datanode"
          id="fireExchange.maoistgroup.datanode[0]"
          placeholder="Number Field" pattern="[A-Za-z]+" title="Name"
        />
        <PlusMinusWrapper>
          <ReportUserLabel
            label="Maoist group - HeadCount"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "fmaoistgroup"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "fmaoistgroup"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
        <ReportUserInput
          type="number"
          name="fireExchange.maoistgroup.datacount"
          id="fireExchange.maoistgroup.datacount[0]"
          placeholder="Number Field" pattern="[0-9]+" title="Count"
        />

        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.fmaoistgroup.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="fireExchange.maoistgroup.datanode" id={"fireExchange.maoistgroup.datanode[" + (index + 1) + "]"} />
                  <input type="text" placeholder="Count" title="Count" name="fireExchange.maoistgroup.datacount" id={"fireExchange.maoistgroup.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>
        <ReportUserInput
          label="No. of Casualities"
          type="number"
          name="fireExchange.numberOfCasualties"
          placeholder="Number field"
        />
        <ReportUserInput
          label="Injured"
          type="number"
          name="fireExchange.numberOfInjured"
          placeholder=" Number field"
        />
        <ReportUserInput
          label="Arrested"
          type="number"
          name="fireExchange.numberOfArrested"
          placeholder=" Number field"
        />
         <ReportUserInput
          label="Escaped"
          type="number"
          name="fireExchange.numberOfEscaped"
          placeholder=" Number field"
        />
        <ReportUserInput
          label="No of Weapons siezed"
          type="number"
          name="fireExchange.numberOfWeaponSeized"
          placeholder="Number field"
        />
        <ReportUserInput
          label="Ammunition"
          type="number"
          name="fireExchange.numberOfAmmunations"
          placeholder=" Number field"
        />
        <ReportUserInput
          label="Equipment"
          type="number"
          name="fireExchange.numberOfEquipements"
          placeholder=" Number field"
        />
        <ReportUserInput
          label="Cash"
          type="text"
          name="fireExchange.cashSeized"
          placeholder="Text & Number field"
        />
        <ReportUserInput
          label="No of Rounds fired by Maoists"
          type="number"
          name="fireExchange.numberOfRoundsFiredByMaoists"
          placeholder=" Number field"
        />
        <ReportUserInput
          label="No of rounds fired by Security force"
          type="number"
          name="fireExchange.numberOfRoundsFiredBySecurityForce"
          placeholder=" Number field"
        /> 
        <ReportUserInput
          label="Casuality / Injury of Security Force - Title"
          type="text"
          name="fireExchange.casualtyOfSecurityForces.datanode"
          placeholder=" Text Field"
        />
        <PlusMinusWrapper>
          <ReportUserLabel
            label="Casuality / Injury of Security Force - HeadCount"
          />
        </PlusMinusWrapper>
        <button type="button" onClick={props.createNewField} id={2 + 1 + "-" + "fcasuality"} style={PlusMinusButton}> + </button>
        <button type="button" id={1 + '-' + "fcasuality"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
        <ReportUserInput
          type="number"
          name="fireExchange.casualtyOfSecurityForces.datacount"
          placeholder="Number Field"
        />
        <div>
          {/* button id should contain both the stateVariable name and the length of the elments in the tPerenialWaterPointsay*/}

          {
            props.fcasuality.map((item, index) => {
              return <div>
                <ReportCustomInput2>

                  <input type="text" placeholder="Title" title="Name" name="fireExchange.casualtyOfSecurityForces.datanode" id={"fireExchange.casualtyOfSecurityForces.datanode[" + (index + 1) + "]"} />
                  <input type="text" placeholder="Count" title="Count" name="fireExchange.casualtyOfSecurityForces.datacount" id={"fireExchange.casualtyOfSecurityForces.datacount[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>
            })
          }
        </div>
      </div>
      
    </ReportContentWrapper>


    <SubmitButton type="submit">Submit</SubmitButton>
    {/* Download button for the form */}
    <SubmitButton type="button" onClick={props.functionHandleDownloadForms}>Download</SubmitButton>
  </form>);


  const feedBackReport = (<form
    onSubmit={props.feedbackFormSubmitHandler}
    id={FEEDBACK_REPORT_FORM_ID}
    onInput={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
    onFocus={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
    onChange={_ => props.functionSaveFormDataToLocalStorage(props.fActiveForm)}
  >

    <ReportContentWrapper>
      {/* this is the name of the operation */}
      <ReportUserInput
        label="Name of the operation"
        type="text"
        id="operationName_feedBack"
        disabled={true}
      />
      <DropDown
        //label for the drop Down
        header={"Name of the district"}
        //unique id for the dropdown.
        id={FEEDBACK_REPORT_NAME_OF_DISTRICT}
        //style for the dropdown
        styles={styles}
        //options provided to this dropdown.
        children={props.namesOfDistrict}
        //universal on Change handler handles based on id
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name to be used for formData entries()
        name="Name of the district"
      />

       <ReportUserInput
        label="Name of the PS"
        type="text"
        name="Name of the PS"
        placeholder="Name of Police Station"
      />

       <ReportUserInput
        label="Map No."
        type="number"
        name="Map No."
        placeholder="Enter the map number"
      />

      <ReportUserInput
        label="Area of operation"
        type="text"
        name="Area of operation"
        placeholder="Text & Number field"
      />

       <ReportUserInput
        label="Date & Duration of operation"
        type="date"
        name="Date & Duration of operation"
        placeholder="Date"
        max={"9999-12-31"}
      />

       <DropDown
        //label of the dropdown
        header={"Type of Operation"}
        //style that is passed to it
        styles={styles}
        //options given in the dropdown
        children={props.fTypesOfOperations}
        //universal on Change handler for dropDown
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //unique id of this drop down
        id={FEEDBACK_REPORT_TYPE_OF_OPERATION}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name to be given to the formdata entries
        name={"operationType"}
      />

       <ReportUserInput
        label="Operation strength"
        type="number"
        name="Operation strength"
        placeholder="Operation Strength"
      />

       <ReportUserInput
        label="Party In-charge (Name)"
        type="text"
        name="partyInCharge"
        placeholder="Text field"
      />

       <ReportUserInput
        label="Total Distance covered"
        type="number"
        name="Total Distance covered"
        placeholder="Enter Distance covered"
      />

     

      <DropDown
        //label of the dropdown
        header={"Type of vegetation & cross country march"}
        //style that is passed to it
        styles={styles}
        //options given in the dropdown
        children={props.fTypeOfTerrainIncludingTypesOfVegetation}
        //universal on Change handler for dropDown
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //unique id of this drop down
        id={FEEDBACK_REPORT_TYPES_OF_VEGETATION_DROPDOWN}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name used for formdata entries
        name={"vegetationTypeAndCrossCountryMarch"}
      />

       <ReportUserLabel
        label="Cell Coverage"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="CellCoverage"
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="CellCoverage"
        />
      </ReportUserRadioButtonWrapper>

      
      <ReportUserLabel
        label="Type of Population"
      />
      <ReportCustomInput>
        <ReportUserLabel
          label="Title of population"

        />
        <input type="text" placeholder="Title" name="typeOfPopulation.dataname" />
      </ReportCustomInput>

      <ReportCustomInput>
        <ReportUserLabel
          label="Head Count of population"

        />
        <input type="number" placeholder="Head Count" name="typeOfPopulation.datacount" />
      </ReportCustomInput>

      <DropDown
        //label of the dropdown
        header={"Attitude of the population towards government"}
        //style that is passed to it
        styles={styles}
        //options given in the dropdown
        children={props.fAttitudeOfPeopleTowardsGovt}
        //universal on Change handler for dropDown
        onChange={props.onDropDownChangeOdishaPoliceFormsUniversal}
        //unique id of this drop down
        id={FEEDBACK_REPORT_ATTITUDE_OF_POPULATION_TOWARDS_GOVT_DROPDOWN}
        //headerStyle to be passed to the header of dropdown
        headerStyle={headerStyle}
        //name used for formdata entries
        name={"attitudeOfPopulationTowardsGovernment"}
      />

      <ReportUserInput
        label="Development Activities in the area"
        type="text"
        name="developmentActivitiesInArea"
        placeholder="Names Of Activities"
      />

      <ReportUserLabel
        label="Deploy Point"
      />
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="deployPoint.latitude[0]-deployPoint.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="deployPoint.latitude" id="deployPoint.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="deployPoint.longitude" id="deployPoint.longitude[0]" />

      </ReportCustomInput3>

       <ReportUserLabel
        label="Pickup Point"
      />
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="pickupPoint.latitude[0]-pickupPoint.longitude[0]">Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="pickupPoint.latitude" id="pickupPoint.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="pickupPoint.longitude" id="pickupPoint.longitude[0]" />

      </ReportCustomInput3>

      <ReportUserInput
        label="Name of the stronghold villages (Naxals)"
        type="text"
        name="naxalStrongHoldVillage"
        placeholder="Names of Villages"
      />

       <PlusMinusWrapper>
        <ReportUserLabel
          label="Sandy/Market location"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.marketLocation.length) + 1 + "-" + "marketLocation"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "marketLocation"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="marketLocation.latitude[0]-marketLocation.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="marketLocation.latitude" id="marketLocation.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="marketLocation.longitude" id="marketLocation.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fambushPointsay*/}

        {
          props.marketLocation.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"marketLocation.latitude[" + (index + 1) + "]-marketLocation.longitude[" + (index + 1) + "]"} >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="marketLocation.latitude" id={"marketLocation.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="marketLocation.longitude" id={"marketLocation.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>


            </div>
          })
        }
      </div>

       <PlusMinusWrapper>
        <ReportUserLabel
          label="Frequently used track by cattle"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.ffrequentlyUsedTracksByCattle.length) + 1 + "-" + "ffrequentlyUsedTracksByCattle"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "ffrequentlyUsedTracksByCattle"} style={PlusMinusButton} > - </button>

      <ReportCustomInput2>

        <button type="button" onClick={props.pickLatLong} id="btn-frequentlyUsedTracksByCattle[0]">Mark Line</button>
        <input type="text" placeholder="North,East" title=" Latitude, Longitude" name="frequentlyUsedTracksByCattle" id="frequentlyUsedTracksByCattle[0]" />

      </ReportCustomInput2>

      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.ffrequentlyUsedTracksByCattle.map((item, index) => {
            return (
              <div>
                <ReportCustomInput2>

                  <button type="button" onClick={props.pickLatLong} id={"btn-ffrequentlyUsedTracksByCattle[" + (index + 1) + "]"}>Mark Line</button>
                  <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="frequentlyUsedTracksByCattle" id={"ffrequentlyUsedTracksByCattle[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>);
          })

        }
      </div>


      <PlusMinusWrapper>
        <ReportUserLabel
          label="Frequently used track by Maoists"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.ffrequentlyUsedTracksByMaoists.length) + 1 + "-" + "ffrequentlyUsedTracksByMaoists"} style={PlusMinusButton} > + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "ffrequentlyUsedTracksByMaoists"} style={PlusMinusButton} > - </button>
      <ReportCustomInput2>

        <button type="button" onClick={props.pickLatLong} id="btn-frequentlyUsedTracksByMaoists[0]" >Mark Line</button>
        <input type="text" placeholder="North,East" title=" Latitude,Longitude" name="frequentlyUsedTracksByMaoists" id="frequentlyUsedTracksByMaoists[0]" />

      </ReportCustomInput2>

      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.ffrequentlyUsedTracksByMaoists.map((item, index) => {
            return (
              <div>
                <ReportCustomInput2>

                  <button type="button" onClick={props.pickLatLong} id={"btn-ffrequentlyUsedTracksByMaoists[" + (index + 1) + "]"}>Mark Line</button>
                  <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="frequentlyUsedTracksByMaoists" id={"ffrequentlyUsedTracksByMaoists[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>);
          })

        }
      </div>

      {/* end HERE */}

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Frequently used track by police"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.ffrequentlyUsedTracksByPolice.length) + 1 + "-" + "ffrequentlyUsedTracksByPolice"} style={PlusMinusButton}> + </button>
      <button type="button" onClick={props.deleteItem} id={0 + '-' + "ffrequentlyUsedTracksByPolice"} style={PlusMinusButton}> - </button>
      <ReportCustomInput2>

        <button type="button" onClick={props.pickLatLong} id="btn-ffrequentlyUsedTracksByPolice[0]">Mark Line</button>
        <input type="text" placeholder="North,East" title=" Latitude ,Longitude" name="frequentlyUsedTracksByPolice" id="ffrequentlyUsedTracksByPolice[0]" />

      </ReportCustomInput2>

      {/* To make a field withMark Lineaccept multiple value use this */}

      <div>

        {
          props.ffrequentlyUsedTracksByPolice.map((item, index) => {
            return (
              <div>
                <ReportCustomInput2>

                  <button type="button" onClick={props.pickLatLong} id={"btn-ffrequentlyUsedTracksByPolice[" + (index + 1) + "]"} >Mark Line</button>
                  <input type="text" placeholder="North, East" title=" Latitude,Longitude " name="frequentlyUsedTracksByPolice" id={"ffrequentlyUsedTracksByPolice[" + (index + 1) + "]"} />

                </ReportCustomInput2>
              </div>);
          })

        }
      </div>

       <PlusMinusWrapper>
        <ReportUserLabel
          label="Dominating high important landmarks"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.fDominatingPoints.length) + 1 + "-" + "fDominatingPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "fDominatingPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="landMark.latitude[0]-landMark.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="landMark.latitude" id="landMark.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="landMark.longitude" id="landMark.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fDominatingPointsay*/}

        {
          props.fDominatingPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"landMark.latitude[" + (index + 1) + "]-landMark.longitude[" + (index + 1) + "]"} >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="landMark.latitude" id={"landMark.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="landMark.longitude" id={"landMark.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>
            </div>
          })
        }
      </div>

      <ReportUserLabel
        label="Railway track"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="railWayTrack"
          id="railT-target3"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="railWayTrack"
          id="railF-target3"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target3">

        <ReportUserInput
          type="text"
          name="railWayTrackDetail"
          placeholder="Text & Number field"
        />

      </div>

        <PlusMinusWrapper>
        <ReportUserLabel
          label="Likely Ambush/IED suites"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.fambushPoints.length) + 1 + "-" + "fambushPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "fambushPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="ambushSite.latitude[0]-ambushSite.longitude[0]">Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude" name="ambushSite.latitude" id="ambushSite.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="ambushSite.longitude" id="ambushSite.longitude[0]" />

      </ReportCustomInput3>


      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fambushPointsay*/}

        {
          props.fambushPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>
                <button type="button" onClick={props.pickLatLong} id={"ambushSite.latitude[" + (index + 1) + "]-ambushSite.longitude[" + (index + 1) + "]"} >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="ambushSite.latitude" id={"ambushSite.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="ambushSite.longitude" id={"ambushSite.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>

        <PlusMinusWrapper>
        <ReportUserLabel
          label="Forest Checkposts"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.fCheckPoints.length) + 1 + "-" + "fCheckPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "fCheckPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="checkPosts.latitude[0]-checkPosts.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="checkPosts.latitude" id="checkPosts.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="checkPosts.longitude" id="checkPosts.longitude[0]" />


      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fCheckPointsay*/}

        {
          props.fCheckPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"checkPosts.latitude[" + (index + 1) + "]-checkPosts.longitude[" + (index + 1) + "]"} >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="checkPosts.latitude" id={"checkPosts.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="checkPosts.longitude" id={"checkPosts.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Bridges and Culverts"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.fBridgesAndCulverts.length) + 1 + "-" + "fBridgesAndCulverts"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "fBridgesAndCulverts"} onClick={props.deleteItem} style={PlusMinusButton}> - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="bridgeAndCulverts.latitude[0]-bridgeAndCulverts.longitude[0]"  >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="bridgeAndCulverts.latitude" id="bridgeAndCulverts.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="bridgeAndCulverts.longitude" id="bridgeAndCulverts.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fBridgesAndCulvertsay*/}

        {
          props.fBridgesAndCulverts.map((item, index) => {
            return <div>
              <input type="text" placeholder="North" title=" Latitude" name="bridgeAndCulverts.latitude" id={"bridgeAndCulverts.latitude[" + (index + 1) + "]"} />
              <input type="text" placeholder="East" title=" Longitude " name="bridgeAndCulverts.longitude" id={"bridgeAndCulverts.longitude[" + (index + 1) + "]"} />
              <button type="button" onClick={props.pickLatLong} id={"bridgeAndCulverts.latitude[" + (index + 1) + "]-bridgeAndCulverts.longitude[" + (index + 1) + "]"} > Mark </button>

            </div>
          })
        }
      </div>

       <PlusMinusWrapper>
        <ReportUserLabel
          label="Possible ferry points in case of water bodies"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.fFerryPoints.length) + 1 + "-" + "fFerryPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={0 + '-' + "fFerryPoints"} onClick={props.deleteItem} style={PlusMinusButton}> - </button>

      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="ferryPoints.latitude[0]-ferryPoints.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="ferryPoints.latitude" id="ferryPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="ferryPoints.longitude" id="ferryPoints.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fFerryPointsay*/}

        {
          props.fFerryPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"ferryPoints.latitude[" + (index + 1) + "]-ferryPoints.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title=" Latitude" name="ferryPoints.latitude" id={"ferryPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title=" Longitude " name="ferryPoints.longitude" id={"ferryPoints.longitude[" + (index + 1) + "]"} />


              </ReportCustomInput3>


            </div>
          })
        }
      </div>

     
     
      <ReportUserInput
        label="Which Service Provider"
        type="text"
        name="serviceProvider"
        placeholder="Text  field"
      />

      <PlusMinusWrapper>
        <ReportUserLabel
          label="Harbour points"
        />
      </PlusMinusWrapper>
      <button type="button" onClick={props.createNewField} id={parseInt(props.fHarbourPoints.length) + "-" + "fHarbourPoints"} style={PlusMinusButton}> + </button>
      <button type="button" id={1 + '-' + "fHarbourPoints"} onClick={props.deleteItem} style={PlusMinusButton} > - </button>
      <ReportCustomInput3>

        <button type="button" onClick={props.pickLatLong} id="harbourPoints.latitude[0]-harbourPoints.longitude[0]" >Mark Point</button>
        <input type="text" placeholder="North" pattern="[0-9]+.[0-9]*" title=" Latitude " name="harbourPoints.latitude" id="harbourPoints.latitude[0]" />
        <input type="text" placeholder="East" pattern="[0-9]+.[0-9]*" title=" Longitude " name="harbourPoints.longitude" id="harbourPoints.longitude[0]" />

      </ReportCustomInput3>
      <div>
        {/* button id should contain both the stateVariable name and the length of the elments in the fHarbourPointsay*/}

        {
          props.fHarbourPoints.map((item, index) => {
            return <div>
              <ReportCustomInput3>

                <button type="button" onClick={props.pickLatLong} id={"harbourPoints.latitude[" + (index + 1) + "]-harbourPoints.longitude[" + (index + 1) + "]"}  >Mark Point</button>
                <input type="text" placeholder="North" title="Latitude" name="harbourPoints.latitude" id={"harbourPoints.latitude[" + (index + 1) + "]"} />
                <input type="text" placeholder="East" title="Longitude " name="harbourPoints.longitude" id={"harbourPoints.longitude[" + (index + 1) + "]"} />

              </ReportCustomInput3>

            </div>
          })
        }
      </div>

      <ReportUserLabel
        label="ShortComings observed in planning"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="shortComingInPlanning"
          id="planY-target10"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="shortComingInPlanning"
          id="planN-target10"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>
      <div id="target10">
        <ReportUserInput
          type="text"
          name="shortComingIssueInPlanning"
          placeholder="Text field"
        />
      </div>

       <ReportUserLabel
        label="ShortComings observed in briefing"
      />

      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          id="shortBriefingT-target8"
          name="shortComingInBriefing"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="shortComingInBriefing"
          id="shortBriefingF-target8"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target8">
        <ReportUserInput
          type="text"
          name="shortComingIssueInBriefing"
          placeholder="Describe the issue"
        />
      </div>

       <ReportUserLabel
        label="ShortComings observed during/after operation"
      />
      <ReportUserRadioButtonWrapper>
        <ReportUserRadioButton
          label="Yes"
          type="radio"
          defaultValue="true"
          name="shortComingInExecution"
          id="shortT-target9"
          onChange={props.hideOtherFields}
        />
        <ReportUserRadioButton
          label="No"
          type="radio"
          defaultValue="false"
          name="shortComingInExecution"
          id="shortF-target9"
          onChange={props.hideOtherFields}
        />
      </ReportUserRadioButtonWrapper>

      <div id="target9">

        <ReportUserInput
          type="text"
          name="shortComingIssueInExecution"
          placeholder="Text  field"
        />

      </div>

      <ReportUserLabel
        label="Details of achievements/loss/fire"
      />
      <ReportCustomInput>
        <ReportUserLabel
          label="Name of the  affected group"
        />
        <input type="text" placeholder="Text field" name="detailsOfAchivementOrLoss.dataname" />
      </ReportCustomInput>

      <ReportCustomInput>
        <ReportUserLabel
          label="Head count of victims"

        />
        <input type="number" placeholder="HeadCount" name="detailsOfAchivementOrLoss.datacount" />
      </ReportCustomInput>

    </ReportContentWrapper>

    <SubmitButton type="submit">Submit</SubmitButton>
    {/* Download button for the form */}
    <SubmitButton type="button" onClick={props.functionHandleDownloadForms}>Download</SubmitButton>
  </form>);



  // const formDownload = (
  //   <ReportContentWrapper>
  //     <ReportUserLabel
  //       label="Thank you submiting the form . Download the form data by click on the download button"
  //     />
  //     <UserButton label={' Download Form Data '} onClick={props.handleDownloadForms} />

  //   </ReportContentWrapper>
  // );

  let parentEle;
  let formValues;

  switch (props.data) {
    case 'CheckList Report': parentEle = checklistformReport;
      formValues = props.checkListReportobj;
      break;
    case 'Observation Report': parentEle = observationReport;
      formValues = props.observationReportObj;
      break;
    case 'De-brief Report': parentEle = deBriefFormat;
      formValues = props.deBriefFormatObj;
      break;
    case 'Feedback Report': parentEle = feedBackReport;
      formValues = props.feedBackReportObj;
      break;
    // case 'formDownload': parentEle = formDownload;
    // break;

  }

  {/* This part of the code is for repopulating the form on clicking on the icon from data store */ }

  // switch (parentEle) {
  //   case checklistformReport: props.populateChecklistReport(formValues);
  //     break;
  //   case observationReport: props.populateObservationReport(formValues);
  //     break;
  //   case deBriefFormat: props.populateDebriefFormat(formValues);
  //     break;
  //   case feedBackReport: props.populateFeebackReport(formValues);
  //     break;
  // }

  return (
    <div>
      {parentEle}
    </div>
  );



}

export default FormHolder;
