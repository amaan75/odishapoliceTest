/*
      OdishaPoliceForms Controller Component
      ===========================================
      author : Sreenivasa. B
      ===========================================
      Workflow :  1)  Initially there are 4 buttons each for a particular form.
      ========    2)  We maintain a state variable called formData. to hold the forms .
                  3)  On clicking on any of the 4 buttons the formData stateVariable will get updated.
                  4)  When the state gets updated . We invoke a Presentational Component Which will render the form related to the stateVariable.
                  5)  Coming to the submitting part of the form . We are using FormData API for fetching the form data.
                  6)  There form submit handler functions are written accordingly with the respective form names.
                  7)  The same holds good for form populating functioanlity also.
                  8)  The conventions followed for naming the elements are commented in the code.
*/

import React from 'react';
import PropTypes from 'prop-types';
import UserButton from './common/UserButton';
import axios from 'axios';
import FormHolder from './SubComponents/FormHolder';
import {
    //helper methods for data parsing and making children of dropdowns
    prepareDistrictNameList,
    preparePoliceStationNamesList,
    //helper method for making children of dropdown
    makeChildrenForDropDownHelperMethod,
    //helper method to create an immutable list from recieved server data
    prepareImmutableDataListHelperMethod,
    host,
    parseJSON,
    getJWTToken
} from "./common/utils"
import {
    //constant for dropdowns
    OBSERVATION_REPORT_NAME_OF_DISTRICT,
    FEEDBACK_REPORT_NAME_OF_DISTRICT,
    OBSERVATION_REPORT_NAME_OF_POLICE_STATION,
    OBSERVATION_REPORT_TYPE_OF_OPERATION,
    FEEDBACK_REPORT_TYPE_OF_OPERATION,
    CHECKLIST_FORM_CONDITION_OF_COMMUNICATION_EQUIPMENT,
    CHECKLIST_FORM_MODE_OF_TRANSPORTATION,
    DEBRIEFING_FORM_COMMUNICATION_EQUIPMENT_TITLE_DROPDOWN,
    DEBRIEFING_FORM_STATUS_OF_SATELLITE_PHONE_DROPDOWN,
    DEBRIEFING_FORM_MODE_OF_TRAVEL_TO_DP_DROPDOWN,
    DEBRIEFING_FORM_MODE_OF_TRAVEL_FROM_PP_DROPDOWN,
    DEBRIEFING_FORM_TYPES_OF_VEGETATION_DROPDOWN,
    DEBRIEFING_FORM_TYPES_OF_TERRAIN_DROPDOWN,
    FEEDBACK_REPORT_TYPES_OF_VEGETATION_DROPDOWN,
    FEEDBACK_REPORT_ATTITUDE_OF_POPULATION_TOWARDS_GOVT_DROPDOWN,
    DEBRIEFING_FORM_LIST_OF_NEARBY_VILLAGES_DROPDOWN,
    DEBRIEFING_FORM_LIST_OF_HOSTILE_VILLAGES_DROPDOWN,
    DEBRIEFING_FORM_LIST_OF_FRIENDLY_VILLAGES_DROPDOWN,
    DEBRIEFING_FORM_TYPES_OF_OPERATION_DROPDOWN,

} from './constants'
import {FloatingPane} from "./common/style"

import {
    ReportUserButtonWrapper,
    StickyHeader,
    ReportTitle,
    ClearButton
} from './style';

import {
    // import for dummy data
    STATUS_OF_SATELITE_PHONE,
    TYPES_OF_TERRAIN_INCLUDING_VEGETATION,
    TYPES_OF_TERRAIN,
    ATTITUDE_OF_POPULATION_TOWARDS_GOVT,
    TYPES_OF_WEAPONS,
    DUMMY_LIST_OF_VILLAGES,
    COMMUNICATION_EQUIPMENT_TITLE,
    CONDITION_OF_COMMUNICATION_EQUIPMENT,
    MODE_OF_TRANSPORTATION,
    TYPES_OF_OPERATION,
} from './common/dummyData';

//constant for odisha police id
import {
    ODISHA_POLICE_FORMS_FLOATING_PANE_ID,
    OBSERVATION_REPORT_FORM_ID,
    FEEDBACK_REPORT_FORM_ID,
    CHECKLIST_REPORT_FORM_ID,
    DEBRIEF_REPORT_FORM_ID
} from './constants';
import { saveInLocalStorage, retrieveFromLocalStorage } from './common/localstorage';
import downloader from './common/download';
class OdishaPoliceForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

            oROfficerBriefingNameAndPlace: '',
            //name of district dropdown option
            oRNameOfDistricts: [],
            //name of police Station dropdown options
            oRNameOfPoliceStation: [],
            //types of operation dropdown options
            oRTypesOfOperations: [],
            /** 
            this is a map which will contain arrays of addable ids
            the id of dropdown will be as follows
            { dropdownTypeName: [array of dropdown ids under that type]}
            */
            dRVariableDropdownIds: {},
            //this state variable will contain the currently selected name of Districts
            oRSelectedNameOfDistrict: '',
            //this will contain the currently selected name of police station
            oRSelectedNameOfPoliceStation: '',
            //this will contain the currently selected type of Operation
            oRSelectedTypeOfOperation: '',
            //these 2 state variables will contain the state of forms 
            //being saved or not
            //observ report saved or not
            oRSaved: false,
            //checklist report saved or not
            cRSaved: false,
            //chekclist report mode of transportation
            cRSelectedModeOfTransportation: '',
            //active form id, this is a enum of {0,1,2,3}
            //in the order of the buttons
            activeForm: 0,
            //this is the state variable which will hold the ids for
            //activities of Maoists
            activitiesOfMaoists: [],
            /**
             * map to store all the ids of the entities, corresponding to the ids of the buttons,
             * or evts targets
             */
            fMapOfCesiumIds: {
                //point will store the ids of points
                POINT: {},
                //lines will store the ids of lines
                LINE: {}
            },
            //variable to maintain the operation name
            operationName: '',
            formdata: '',
            operationId: 0,
            eventId: '',
            tambushPoints: [],
            tSeasonalWaterPoints: [],
            tPerenialWaterPoints: [],
            tDominatingPoints: [],
            tFerryPoints: [],
            tHarbourPoints: [],
            tPossibleLups: [],
            tHideOuts: [],
            tBridgesAndCulverts: [],
            frequentlyUsedTracksByPolice: [],
            markLineData: [],
            fambushPoints: [],
            fDominatingPoints: [],
            fFerryPoints: [],
            fHarbourPoints: [],
            fPossibleLups: [],
            fHideOuts: [],
            fBridgesAndCulverts: [],
            fCheckPoints: [],
            marketLocation: [],
            frequentlyUsedTracksByMaoists: [],
            frequentlyUsedTracksByCattle: [],
            ffrequentlyUsedTracksByCattle: [],
            ffrequentlyUsedTracksByPolice: [],
            ffrequentlyUsedTracksByMaoists: [],
            contactNumberOfIncharge: [],
            parties: [],
            pcommunicationEquipment: [],
            pammunitions: [],
            ivillageRepresentativesCountNumber: [],
            inaxalSupportingVillagers: [],
            imaoistgroup: [],
            fmaoistgroup: [],
            ishopKeepersInVillage: [],
            pweapons: [],
            pfirstAid: [],
            pfoodItems: [],
            fcasuality: [],
            timeOfReporting: []
        };

        this.formCreator = this.formCreator.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.computeTotalParyStrength = this.computeTotalParyStrength.bind(this);
        this.checklistFormSubmitHandler = this.checklistFormSubmitHandler.bind(this);
        this.hideOtherFields = this.hideOtherFields.bind(this);
        this.deBriefFormSubmitHandler = this.deBriefFormSubmitHandler.bind(this);
        this.feedbackFormSubmitHandler = this.feedbackFormSubmitHandler.bind(this);
        this.handleDownloadForms = this.handleDownloadForms.bind(this);
        //this.uploadKml = this.uploadKml.bind(this);
        this.populateObservationReport = this.populateObservationReport.bind(this);
        this.populateChecklistReport = this.populateChecklistReport.bind(this);
        this.populateDebriefFormat = this.populateDebriefFormat.bind(this);
        this.populateFeebackReport = this.populateFeebackReport.bind(this);
        this.createNewField = this.createNewField.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.pickLatLong = this.pickLatLong.bind(this);
        this.getGeoProcessingLineDataValue = this.getGeoProcessingLineDataValue.bind(this);
        this.createNewDataNameNode = this.createNewDataNameNode.bind(this);
        this.createLatLongField = this.createLatLongField.bind(this);
    }
    // Function to upload KML Files . Todo Get the proper url to upload the data
    // uploadKml(evt){
    //     let kmlFiles = evt.target.files;
    //     let url = '';
    //     axios.post(url,kmlFiles).then((response)=>{
    //         console.log("File uploaded Successfully");
    //     }).catch(function(error){
    //         console.log(error);
    //     });
    //
    // }


    componentWillMount() {
        const districtNames = prepareDistrictNameList();

        const namesOfPoliceStation = preparePoliceStationNamesList();


        //default form shown should be the first form.
        this.formCreator('Observation Report');
        this.setState({
            oRNameOfDistricts: districtNames,
            oRNameOfPoliceStation: namesOfPoliceStation,
            //setting the default value for district names
            oRSelectedNameOfDistrict: districtNames[0].name,
            //setting the default value for default poilce station
            oRSelectedNameOfPoliceStation: namesOfPoliceStation[0].name,
            //setting the default value for type of operation
            oRSelectedTypeOfOperation: 'Ambush',
        });

    }

    componentDidMount() {
        //if form data exists in local storage then fill it.
        const formData = retrieveFromLocalStorage(0);
        this.populateObservationReport(formData);
        if (formData != undefined) {
            if (formData.operation) {
                if (formData.operation.operationName != undefined)
                    this.setState({ operationName: formData.operation.operationName });
            } else if (formData.operationName != undefined)
                this.setState({ operationName: formData.operationName });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activeForm === 0) {
            //if form data exists in local storage then fill it.
            const formData = retrieveFromLocalStorage(0);
            this.populateObservationReport(formData);
        } else if (this.state.activeForm === 1 && prevState.activeForm !== 1) {
            //if form data exists in local storage then fill it.
            const formData = retrieveFromLocalStorage(1);
            this.populateChecklistReport(formData);
            //set the value for operation name using getelement by id
            const opName = document.getElementById("operationName_checkList");
            opName.value = this.state.operationName;
        } else if (this.state.activeForm === 2 && prevState.activeForm !== 2) {
            //if form data exists in local storage then fill it.
            const formData = retrieveFromLocalStorage(2);
            this.populateDebriefFormat(formData);

            //set the value for operation name using getelement by id
            const opName = document.getElementById("operationName_debrief");
            opName.value = this.state.operationName;
        } else if (this.state.activeForm === 3 && prevState.activeForm !== 3) {
            //if form data exists in local storage then fill it.
            const formData = retrieveFromLocalStorage(3);
            this.populateFeebackReport(formData);

            //set the value for operation name using getelement by id
            const opName = document.getElementById("operationName_feedBack");
            opName.value = this.state.operationName;
        }

    }

    componentWillUnmount() {
        //this.props.clearMarkings();
    }
    getGeoProcessingLineDataValue() {
        let { geometry: { coordinates = [] } = {} } = this.props.geoProcessingLineData || {};
        return coordinates.reduce((prev, current) => {
            prev.push({
                long: current[0],
                lat: current[1]
            });
            return prev;
        }, []);
    }

    //universal dropDown Change handler for all dropdowns in ODISHA POLICE FORMS
    //handle changes based on the id of the dropDown, note this makes passing an id to dropDown compulsory.
    onDropDownChangeOdishaPoliceFormsUniversal = (evt, id, header) => {

        //get the index of the selected value
        const selectedIndex = evt.target.selectedIndex;
        //get the text that is selected in the dropdown.
        const selectedValue = evt.target[selectedIndex].text;
        //the map in state object for dropDowns
        const dropDownIdMap = this.state.dRVariableDropdownIds;
        const selectedElementId = evt.target[selectedIndex].id;
        if (id === OBSERVATION_REPORT_NAME_OF_DISTRICT) {
            const namesOfPoliceStation = preparePoliceStationNamesList(selectedElementId);
            //setting the value of corresponding field in state.
            this.setState({
                oRNameOfPoliceStation: namesOfPoliceStation,
                oRSelectedNameOfDistrict: selectedValue,
            });
        } else if (id === FEEDBACK_REPORT_NAME_OF_DISTRICT) {
            //do something with this change
        } else if (id === OBSERVATION_REPORT_NAME_OF_POLICE_STATION) {
            //setting the value of corresponding field in local state
            this.setState({ oRSelectedNameOfPoliceStation: selectedValue });
        } else if (id === OBSERVATION_REPORT_TYPE_OF_OPERATION) {
            //setting the value of corresponding field in local state
            this.setState({ oRSelectedTypeOfOperation: selectedValue });
        } else if (id === FEEDBACK_REPORT_TYPE_OF_OPERATION) {
            //do something with this change
        } else if (id === CHECKLIST_FORM_MODE_OF_TRANSPORTATION) {
            //setting the checklist form mode of transportation to state;
            this.setState({ cRSelectedModeOfTransportation: selectedValue });
        } else if (id === CHECKLIST_FORM_CONDITION_OF_COMMUNICATION_EQUIPMENT) {
            //do something with this change or value.
        } else if (id === DEBRIEFING_FORM_COMMUNICATION_EQUIPMENT_TITLE_DROPDOWN) {
            //do something with this change
        } else if (id === DEBRIEFING_FORM_STATUS_OF_SATELLITE_PHONE_DROPDOWN) {
            //do  soemthing with this change
        } else if (id === DEBRIEFING_FORM_MODE_OF_TRAVEL_TO_DP_DROPDOWN) {
            //do something with this change
        } else if (id === DEBRIEFING_FORM_MODE_OF_TRAVEL_FROM_PP_DROPDOWN) {
            //do something with this change
        } else if (id === DEBRIEFING_FORM_TYPES_OF_VEGETATION_DROPDOWN) {
            //do something with this change
        } else if (id === DEBRIEFING_FORM_TYPES_OF_TERRAIN_DROPDOWN) {
            //do something with this change
        } else if (id === FEEDBACK_REPORT_TYPES_OF_VEGETATION_DROPDOWN) {
            //do something with this change
        } else if (id === FEEDBACK_REPORT_ATTITUDE_OF_POPULATION_TOWARDS_GOVT_DROPDOWN) {
            //do somehting with this change
        } else if (id === DEBRIEFING_FORM_LIST_OF_NEARBY_VILLAGES_DROPDOWN) {
            //do something with this change
        } else if (id === DEBRIEFING_FORM_LIST_OF_HOSTILE_VILLAGES_DROPDOWN) {
            //do something with this changes
        } else if (id === DEBRIEFING_FORM_LIST_OF_FRIENDLY_VILLAGES_DROPDOWN) {
            //do something with this change
        } else if (id === DEBRIEFING_FORM_TYPES_OF_OPERATION_DROPDOWN) {
            //do something with this change
        } else {
            /**
             * if there are any keys in this dropDownIdMap
             * this means that add-removable dropdowns were added
             */
            for (const key of Object.keys(dropDownIdMap)) {
                dropDownIdMap[key].forEach((currentId) => {
                    if (id === `${currentId}_DROPDOWN`) {
                        //do something with this change
                        alert(`implement the onDropDownChangeOdishaPoliceFormsUniversal method, 
            else block for this case`);
                    }
                });
            }
        }

    }



    

    deleteItem(evt) {
        var idVal = evt.target.id;
        //  alert(idVal);
        let stateVar = evt.target.id.split('-')[1];
        let arrIndex = evt.target.id.split('-')[0];


        // this.setState((prevState)=>{
        //     var newArr = prevState[stateVar];
        //    // alert(JSON.stringify(newArr));
        //     newArr.splice(arrIndex,1);
        //     // alert(JSON.stringify(newArr));
        //     return{
        //         [stateVar]:newArr
        //         //[stateVar]:prevState[stateVar].filter((s, index) => index !== arrIndex)
        //     }
        // })
        this.setState((prevState) => {
            return {
                [stateVar]: prevState[stateVar].slice(0, (prevState[stateVar].length - 1))
            };
        });


    }

    createNewDropDown = (evt) => {
        evt.preventDefault();
        //get the name of the button that was pressed this is done, 
        //in order to recognise uniquely recognise the group of dropdown button that was pressed.
        const typeOfDropDown = evt.target.name;
        //get the map from state
        let dropDownIdMap = this.state.dRVariableDropdownIds;
        //initialise that array if it does not exist
        if (!dropDownIdMap[`${typeOfDropDown}`]) {
            dropDownIdMap[`${typeOfDropDown}`] = [];
        }
        const index = dropDownIdMap[`${typeOfDropDown}`].length;
        //push the id of the newly created dropdown
        dropDownIdMap[`${typeOfDropDown}`].push(`${typeOfDropDown}${index}`);
        //set the state with the newly updated maps dropdown map object
        this.setState({ dRVariableDropdownIds: dropDownIdMap })
    }

    deleteExistingDropDown = (evt) => {
        evt.preventDefault();
        //get the name of the button that was pressed this is done.
        //in order to recognise uniquely recognise the group of dropdown button that was pressed.
        const typeOfDropDown = evt.target.name;
        //get the map from state
        let dropDownIdMap = this.state.dRVariableDropdownIds;
        //if the map for the following exists in the state variable
        if (dropDownIdMap[`${typeOfDropDown}`]) {
            //then pop the last id
            dropDownIdMap[`${typeOfDropDown}`].pop();
            //set the state with updated map
            this.setState({ dRVariableDropdownIds: dropDownIdMap });
        }
    }

    createNewField(evt) {
        evt.preventDefault();
        let stateVar = evt.target.id.split('-')[1];
        this.setState((prevState) => {

            return {
                [stateVar]: prevState[stateVar].concat({ latitude: '', longitude: '' })
            }
        })

    }

    createLatLongField(evt) {
        let stateVar = evt.split('-')[1];
        this.setState((prevState) => {

            return {
                [stateVar]: prevState[stateVar].concat({ latitude: '', longitude: '' })
            }
        })

    }




    //Function to populate CheckList
    populateChecklistReport(myobj) {
        let checkListobj = {};
        for (let x in myobj) {
            checkListobj[x] = myobj[x];
        }


        for (let item in checkListobj) {
            if (item !== 'id') {
                var eleNode = document.getElementsByName(item).values();
                for (var Ele of eleNode) {
                    if (Ele.type === 'radio') {

                        if (JSON.parse(checkListobj[item]) === JSON.parse(Ele.value)) {

                            Ele.checked = true;
                        }
                    }
                    else {
                        Ele.value = checkListobj[item];
                    }
                }
            }
        }
    }




    //Function to populate Observation reporting
    populateObservationReport(myobj) {
        let observationObj = {}
        for (let x in myobj) {
            if (x === 'backupTeam') {
                for (let y in myobj[x]) {
                    observationObj[x + "." + y] = myobj[x][y];
                }
            } else if (x === 'parties') {
                myobj[x].forEach(function (item) {
                    for (let z in item) {
                        observationObj[x + "[" + myobj[x].indexOf(item) + "]" + "." + z] = item[z];
                    }
                });
            } else if (x === 'operation') {
                for (let y in myobj[x]) {
                    if (y === 'address') {
                        for (let z in myobj[x][y]) {
                            if (z !== 'id') {
                                // console.log(y+"."+z+"=="+myobj[x][y][z]);
                                observationObj[y + "." + z] = myobj[x][y][z];
                            }

                        }
                    } else if (y !== 'id') {
                        //console.log(x+"."+y+"=="+myobj[x][y]);
                        observationObj[y] = myobj[x][y];
                    }
                }
            } else {
                observationObj[x] = myobj[x];
            }
        }

        for (let item in observationObj) {
            if (item !== 'id') {
                var eleNode = document.getElementsByName(item).values();
                for (var Ele of eleNode) {
                    if (Ele.name === 'startDate' || Ele.name === 'endDate' || Ele.name === 'partyDepartureFromBase') {
                        var d = new Date(observationObj[item]),
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
                        Ele.value = [year, month, day].join('-');

                    } else if (Ele.type === 'radio') {

                        if (JSON.parse(observationObj[item]) === JSON.parse(Ele.value)) {
                            //check the box to true if the value matches the elements value code
                            Ele.checked = true;
                            //pass the element inorder to hide the fields
                            this.hideOtherFields(Ele);
                        }

                    }
                    else {
                        Ele.value = observationObj[item];
                    }
                }
            }
        }
        //compute the total party stregnth
        this.computeTotalParyStrength();
    }


    //Function to populate Debrief Format
    populateDebriefFormat(myobj) {
        let debriefformatObj = {};


        for (let x in myobj) {
            if (x === 'deploypoint' ||
                x === 'pickuppoint' ||
                x === 'approachRoad' ||
                x === 'checkPosts' ||
                x === 'bridgeAndCulverts' ||
                x === 'ferryPoints' ||
                x === 'harbourPoints' ||
                x === 'ambushSite' ||
                x === 'marketLocation' ||
                x === 'landMark' ||
                x === 'areaWithMobileConnectivity'
            ) {
                for (let y in myobj[x]) {
                    debriefformatObj[x + '.' + y] = myobj[x][y];
                }
            } else if (x === 'typeOfPopulation' ||
                x === 'detailsOfAchivementOrLoss') {
                for (let y in myobj[x]) {

                    debriefformatObj[x + '.' + y] = myobj[x][y];
                }
            } else if (x === 'operation') {

                debriefformatObj[x + "id"] = myobj[x].id;
            } else if (x === 'information') {
                for (let y in myobj[x]) {
                    if (y === 'activitiesOfMaoists') {
                        for (let z in myobj[x][y]) {

                            debriefformatObj[x + '.' + y + '.' + z] = myobj[x][y][z];
                        }
                    } else if (y == 'villageRepresentativesContactNumber' ||
                        y === 'naxalSupportingVillagers' ||
                        y === 'shopKeepersInVillage' ||
                        y === 'suspectedPeople' ||
                        y === 'maoistGroups') {
                        myobj[x][y].forEach(function (z) {

                            for (let a in z) {

                                debriefformatObj[x + '.' + y + '[' + myobj[x][y].indexOf(z) + '].' + a] = z[a];
                            }
                        });

                    } else if (y === 'suspectedPeople[0]') {
                        for (let element in myobj[x][y]) {
                            //flattern this json object
                            debriefformatObj[x + '.' + y + '.' + element] = myobj[x][y][element];
                        }

                    } else {

                        debriefformatObj[x + '.' + y] = myobj[x][y];
                    }
                }

            } else if (x === 'terrain') {

                for (let y in myobj[x]) {
                    if (y === 'seasonalWaterPoints' ||
                        y === 'perrenialWaterPoints' ||
                        y === 'ambushPoints' ||
                        y === 'possibleHideOuts' ||
                        y === 'marketLocation' ||
                        y === 'dominatingPoints' ||
                        y === 'possibleLUPs' ||
                        y === 'bridgeAndCulverts' ||
                        y === 'ferryPoints' ||
                        y === 'harbourPoints') {
                        for (let z in myobj[x][y]) {

                            debriefformatObj[x + '.' + y + '.' + z] = myobj[x][y][z];
                        }
                    } else if (y == 'villageRepresentativesContactNumber' ||
                        y === 'naxalSupportingVillagers' ||
                        y === 'shopKeepersInVillage' ||
                        y === 'suspectedPeople' ||
                        y === 'maoistGroups') {
                        myobj[x][y].forEach(function (z) {

                            for (let a in z) {

                                debriefformatObj[x + '.' + y + '[' + myobj[x][y].indexOf(z) + '].' + a] = z[a];
                            }
                        });

                    } else {

                        debriefformatObj[x + '.' + y] = myobj[x][y];
                    }

                }

            } else if (x === 'participants') {

                for (let y in myobj[x]) {
                    if (y === 'communicationEquipment' ||
                        y === 'GROfStrategicPoints' ||
                        y === 'communicationEquipment' ||
                        y === 'foodItem' ||
                        y === 'ammunitions' ||
                        y === 'firstAid'
                    ) {
                        for (let z in myobj[x][y]) {

                            debriefformatObj[x + '.' + y + '.' + z] = myobj[x][y][z];
                        }
                    } else if (y == 'teams' ||
                        y === 'weapons') {
                        myobj[x][y].forEach(function (z) {

                            for (let a in z) {

                                debriefformatObj[x + '.' + y + '[' + myobj[x][y].indexOf(z) + '].' + a] = z[a];
                            }
                        });

                    } else {

                        debriefformatObj[x + '.' + y] = myobj[x][y];
                    }
                }

            } else if (x === 'fireExchange') {

                for (let y in myobj[x]) {
                    if (y === 'maoistgroup' ||
                        y === 'casualtyOfSecurityForces'
                    ) {
                        for (let z in myobj[x][y]) {

                            debriefformatObj[x + '.' + y + '.' + z] = myobj[x][y][z];
                        }
                    } else {

                        debriefformatObj[x + '.' + y] = myobj[x][y];
                    }
                }

            }
            else {

                debriefformatObj[x] = myobj[x];
            }
        }
        console.log("This is from populate debriefFormatobj  :" + JSON.stringify(debriefformatObj));
        // Code to create dynamic fields
        var wArrCount = 0;
        for (let item in debriefformatObj) {
            if (item.indexOf('participants.weapons') !== -1) {
                wArrCount++;
                // console.log(wArrCount+">>>>>>"+item);
                // let name = item.split('.')[0]+'.'+item.split('.')[1];
                // let id = name.replace('.','');
                // console.log(name+' $$$$$$$$$$$$$$ '+id);
                // if(wArrCount%2===0){
                //     console.log("Successfully found one complete field");
                //     this.createNewDataNameNode(id+'-'+name);
                // }

                // terrain.harbourPoints.latitude
                if (wArrCount % 2 == 0) {
                    //  this.createLatLongField('debrief-tHarbourPoints');
                }
            }

            if (item !== 'id') {
                var eleNode = document.getElementsByName(item);
                for (var Ele of eleNode) {
                    if (Ele.name === 'Date of the operation' ||
                        Ele.name === 'information.lastMaoistVisitDate' ||
                        Ele.name === 'fireExchange.date') {
                        var d = new Date(debriefformatObj[item]),
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();

                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
                        Ele.value = [year, month, day].join('-');

                    } else if (Ele.type === 'radio') {
                        if (JSON.parse(debriefformatObj[item]) === JSON.parse(Ele.value)) {
                            Ele.checked = true;
                            //pass the element inorder to hide the fields
                            this.hideOtherFields(Ele);
                        }
                        /**
                         * TODO: allow for showing of multiple lines 
                         * ?Handle case for lines
                         */
                    } else if (Ele.name === 'terrain.frequentlyUsedTracksByPolice'
                        || Ele.name === 'terrain.frequentlyUsedTracksByMaoists' ||
                        Ele.name === 'terrain.frequentlyUsedTracksByCattle') {
                        // set the value of line to the value of these objects
                        if (debriefformatObj[Ele.name][0].value != undefined)
                            Ele.value = debriefformatObj[Ele.name][0].value;
                        else if (debriefformatObj[Ele.name][0][`${Ele.name.split('.')[1]}0`] != undefined)
                            Ele.value = debriefformatObj[Ele.name][0][`${Ele.name.split('.')[1]}0`];
                    }
                    else {

                        Ele.value = debriefformatObj[item];
                    }
                }
            }
            const itemFormName = item.split('.');
            if (itemFormName.length === 3) {
                //if element is participants.team then split it
                const splitTeamsName = itemFormName[1].split('[');
                const logName = `${itemFormName[0]}.${splitTeamsName[0]}.${itemFormName[2]}`;
                let eleNodes = document.getElementsByName(`${itemFormName[0]}.${splitTeamsName[0]}.${itemFormName[2]}`);
                //loop through now selected element nodes
                for (let currentEleNode of eleNodes) {
                    if (currentEleNode.name === 'participants.teams.contactNumberOfIncharge') {
                        //set the value of the contacts number element
                        if (debriefformatObj[item][0].value != undefined)
                            currentEleNode.value = debriefformatObj[item][0].value;
                        else if (debriefformatObj[item][0][`${currentEleNode.name.split('.')[2]}0`] != undefined)
                            currentEleNode.value = debriefformatObj[item][0][`${currentEleNode.name.split('.')[2]}0`];
                    } else {
                        //directly set the value because for other elements the values
                        //are not nested
                        currentEleNode.value = debriefformatObj[item];
                    }
                }
            }

            let myEleNodes = document.getElementsByName(`${itemFormName[0]}.${itemFormName[1]}.latitude`).values();
            for (let myCurrentEle of myEleNodes) {
                //handle for when there can be an array of points
                if (`${myCurrentEle.name.split('.')[0]}.${myCurrentEle.name.split('.')[1]}` === `${itemFormName[0]}.${itemFormName[1]}` && !isNaN(Number(itemFormName[2]))) {
                    //first element will be latitude, so set that value
                    myCurrentEle.value = debriefformatObj[item].latitude;

                }
            }
            myEleNodes = document.getElementsByName(`${itemFormName[0]}.${itemFormName[1]}.longitude`).values();
            for (let myCurrentEle of myEleNodes) {
                //handle for when there can be an array of points
                if (`${myCurrentEle.name.split('.')[0]}.${myCurrentEle.name.split('.')[1]}` === `${itemFormName[0]}.${itemFormName[1]}` && !isNaN(Number(itemFormName[2]))) {
                    //next will be,
                    //longitude, so set that
                    myCurrentEle.value = debriefformatObj[item].longitude;

                }
            }
            myEleNodes = document.getElementsByName(`${itemFormName[0]}.${itemFormName[1]}.datanode`).values();
            for (let myCurrentEle of myEleNodes) {
                //handle for when there can be an array of points
                if (`${myCurrentEle.name.split('.')[0]}.${myCurrentEle.name.split('.')[1]}` === `${itemFormName[0]}.${itemFormName[1]}` && !isNaN(Number(itemFormName[2]))) {
                    //next will be,
                    //longitude, so set that
                    myCurrentEle.value = debriefformatObj[item].datanode;

                }
            }
            myEleNodes = document.getElementsByName(`${itemFormName[0]}.${itemFormName[1]}.datacount`).values();
            for (let myCurrentEle of myEleNodes) {
                //handle for when there can be an array of points
                if (`${myCurrentEle.name.split('.')[0]}.${myCurrentEle.name.split('.')[1]}` === `${itemFormName[0]}.${itemFormName[1]}` && !isNaN(Number(itemFormName[2]))) {
                    //next will be,
                    //longitude, so set that
                    myCurrentEle.value = debriefformatObj[item].datacount;

                }
            }
        }

    }


    //Function to populate feedBackReport
    populateFeebackReport(fObj) {
        var feedBackObj = {};
        for (let x in fObj) {
            if (x === 'deployPoint' ||
                x === 'pickupPoint' ||
                x === 'checkPosts' ||
                x === 'bridgeAndCulverts' ||
                x === 'ferryPoints' ||
                x === 'harbourPoints' ||
                x === 'ambushSite' ||
                x === 'marketLocation' ||
                x == 'landMark'
            ) {
                for (let y in fObj[x]) {
                    feedBackObj[x + '.' + y] = fObj[x][y];
                }
            } else if (x === 'typeOfPopulation' || x === 'detailsOfAchivementOrLoss') {
                for (let y in fObj[x]) {
                    feedBackObj[x + '.' + y] = fObj[x][y];
                }
            } else if (x === 'operation') {
                feedBackObj[x + "id"] = fObj[x].id;
            } else {
                feedBackObj[x] = fObj[x];
            }
        }

        for (let item in feedBackObj) {
            if (item !== 'id') {
                var eleNode = document.getElementsByName(item).values();

                for (var Ele of eleNode) {
                    if (Ele.name === 'partyDepartureFromBase') {
                        var d = new Date(feedBackObj[item]),
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();

                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
                        Ele.value = [year, month, day].join('-');

                    } else if (Ele.type === 'radio') {


                        if (JSON.parse(feedBackObj[item]) === JSON.parse(Ele.value)) {
                            Ele.checked = true;
                            //pass the element inorder to hide the fields
                            this.hideOtherFields(Ele);

                        }

                    }
                    else if (Ele.name === 'frequentlyUsedTracksByPolice' ||
                        Ele.name === 'frequentlyUsedTracksByMaoists' ||
                        Ele.name === 'frequentlyUsedTracksByCattle') {
                        //set the value of the lines in the text field
                        if (feedBackObj[Ele.name][0].value != undefined)
                            Ele.value = feedBackObj[Ele.name][0].value;
                        else if (feedBackObj[Ele.name][0][`${Ele.name}0`] != undefined)
                            Ele.value = feedBackObj[Ele.name][0][`${Ele.name}0`];
                    }

                    else {

                        Ele.value = feedBackObj[item];
                    }
                }

            }
            const itemFormName = item.split('.');
            var myEleNodes = document.getElementsByName(`${itemFormName[0]}.latitude`).values();
            for (var myCurrentEle of myEleNodes) {
                //handle for when there can be an array of points
                if (myCurrentEle.name.split('.')[0] === itemFormName[0] && !isNaN(Number(itemFormName[1]))) {
                    //first element will be latitude, so set that value
                    if (myCurrentEle.name.split('.')[1] === 'latitude') {
                        myCurrentEle.value = feedBackObj[item].latitude;
                    }
                }
            }
            var myEleNodes = document.getElementsByName(`${itemFormName[0]}.longitude`).values();
            for (var myCurrentEle of myEleNodes) {
                //handle for when there can be an array of points
                if (myCurrentEle.name.split('.')[0] === itemFormName[0] && !isNaN(Number(itemFormName[1]))) {
                    //next will be,
                    //longitude, so set that
                    if (myCurrentEle.name.split('.')[1] === 'longitude') {
                        myCurrentEle.value = feedBackObj[item].longitude;
                    }

                }
            }
        }



    }

    //Function to increase count on the plus button click
    createNewDataNameNode(evt) {

        var id = evt.split('-')[0];
        var name = evt.split('-')[1];
        var target = document.getElementById(id);
        var myDiv = document.createElement('div');
        var myInp1 = document.createElement('input');
        var myInp2 = document.createElement('input');
        myInp1.placeholder = "Text Field ";
        myInp2.placeholder = "Number Field";
        myInp1.pattern = "[A-Za-z]+";
        myInp2.pattern = "[0-9]+";
        myInp1.title = "Name ";
        myInp2.title = "Count";
        myInp1.name = name + "." + "datanode";
        myInp2.name = name + "." + "datacount";
        myInp1.style.width = '80%';
        myInp1.style.backgroundColor = '#ffffff';
        myInp1.style.margin = '0.5em 0';
        myInp1.style.boxSizing = 'border-box';
        myInp1.style.boxShadow = '0px 1px 0px 0px rgba(0,0,0,0.15)';
        myInp1.style.padding = '0.3em 0.1em 0.3em 0.5em';
        myInp1.style.margin = '0.5em 0';
        myInp1.style.boxSizing = 'border-box';
        myInp1.style.boxShadow = '0px 1px 0px 0px rgba(0,0,0,0.15)';
        myInp2.style.width = '80%';
        myInp2.style.backgroundColor = '#ffffff';
        myInp2.style.margin = '0.5em 0';
        myInp2.style.boxSizing = 'border-box';
        myInp2.style.boxShadow = '0px 1px 0px 0px rgba(0,0,0,0.15)';
        myInp2.style.padding = '0.3em 0.1em 0.3em 0.5em';
        myInp2.style.margin = '0.5em 0';
        myInp2.style.boxSizing = 'border-box';
        myInp2.style.boxShadow = '0px 1px 0px 0px rgba(0,0,0,0.15)';
        var myBtn = document.createElement('button');
        myBtn.type = 'button';
        myBtn.textContent = "X";
        myBtn.style.width = '20%';
        myBtn.style.backgroundColor = '#2b323e';
        myBtn.style.color = 'white';
        myBtn.style.padding = '0.3em 0.1em 0.3em 0.5em';
        myBtn.onclick = function (event) {


            event.preventDefault();
            target.removeChild(myDiv);
        }

        myDiv.appendChild(myInp1);
        myDiv.appendChild(myInp2);
        myDiv.appendChild(myBtn);
        target.appendChild(myDiv);

    }


    //Function to handle the form download request
    handleDownloadForms() {

        let formId = this.state.operationId;
        //this is the currently active form
        let formType = this.state.activeForm;
        // let formId=249;
        //"http://localhost:19090/georbis/forms/downloadCsvFile/"
        let url = `http://${host}/georbis/forms/downloadCsvFile/${formId}/${formType}`;

        //set response type to blob
        axios.get(url, {
            // `headers` are custom headers to be sent
            headers: { 'jwt': getJWTToken() }, responseType: 'blob'
        })
            .then(function (response) {
                downloader(response.data, "dataset.zip");
                // const link = document.createElement('a');
                // let data = response.data;
                // //type will be zip
                // let type = 'zip';
                // link.download = "dataset." + type;
                // let blob = new Blob([data], { type: data.type }),
                //   url = window.URL.createObjectURL(blob);
                // link.href = url;
                // link.target = '_blank';
                // link.click();
            })
            .catch(function (error) {
                //log the error
                console.log(error);
            });
    }



    hideOtherFields(evt) {
        //if an element was passed do this
        if (evt.target == undefined) {
            let id = evt.id.split('-')[1];
            const elementToHide = document.getElementById(id);
            //see if this element exists
            if (elementToHide != null) {
                if (evt.value === "true") {
                    elementToHide.style.display = "initial";
                } else {
                    elementToHide.style.display = "none";
                }
            }//inform the dev in case there is no such element
            else {
                console.log(`please make sure that the element exists
         id of element trying to hide:${id}
         id of target :${evt.id}
        `);
            }
        }
        //do this in case an evt was passed
        else {
            let id = evt.target.id.split('-')[1];
            const elementToHide = document.getElementById(id);
            //check if the element exists
            if (elementToHide != null) {
                if (evt.target.value === "true") {
                    elementToHide.style.display = "initial";
                } else {
                    elementToHide.style.display = "none";
                }
            }//inform the dev in case we have no such element
            else {
                console.log(`please make sure that the element exists
         id of element trying to hide:${id}
         id of target :${evt.target.id}
        `);
            }
        }
    }

    feedbackFormSubmitHandler(evt) {
        evt.preventDefault();

        var formData = new FormData(evt.target);
        var formObj = {};
        var detailsObj = {};
        var popObj = {};
        var dPointObj = {};
        var pPointObj = {};
        var fPointObj = {};
        var hPointObj = {};
        var landMark = {};
        var locationObj = {};
        var siteObj = {};
        var bridgeObj = {};
        var checkPostObj = {};
        var landMarkObj = {};

        for (var pair of formData.entries()) {
            if (pair[0].indexOf('deployPoint') != -1) {

                dPointObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, dPointObj);

            } else if (pair[0].indexOf('landMark') != -1) {

                landMark[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, landMark);

            }


            else if (pair[0].indexOf('pickupPoint') != -1) {

                pPointObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, pPointObj);

            } else if (pair[0].indexOf('Location') != -1) {

                locationObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, locationObj);

            } else if (pair[0].indexOf('Site') != -1) {

                siteObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, siteObj);

            } else if (pair[1] === 'true' || pair[1] === 'false') {
                formObj[pair[0]] = JSON.parse(pair[1]);
            } else if (pair[0].indexOf('typeOfPopulation') != -1) {

                popObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, popObj);
            } else if (pair[0].indexOf('detailsOfAchivementOrLoss') != -1) {

                detailsObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, detailsObj);
            }
            else if (pair[0].indexOf('ambushSite') != -1 ||
                pair[0].indexOf('ferryPoints') != -1 ||
                pair[0].indexOf('bridgeAndCulverts') != -1 ||
                pair[0].indexOf('checkPosts') != -1 ||
                pair[0].indexOf('harbourPoints') != -1) {


            }
            else {
                formObj[pair[0]] = pair[1];
            }
        }


        /* code to handle array of latlong fileds*/
        var newArr3 = ['ambushSite',
            'ferryPoints',
            'bridgeAndCulverts',
            'checkPosts',
            'harbourPoints',
            'marketLocation',
            'landMark'];

        newArr3.forEach((item, index) => {
            var A = formData.getAll(item + '.' + 'latitude');
            var B = formData.getAll(item + '.' + 'longitude');
            var c = [];
            for (var i = 0; i < A.length; i++) {
                var newObj = {};
                newObj["latitude"] = A[i];
                newObj["longitude"] = B[i];
                c.push(newObj);
                formObj[item] = c;
            }

        });

        /*
           code to handle multiple markLine field and multiple contactNumber field
       */
        var newArr4 = ['frequentlyUsedTracksByPolice', 'frequentlyUsedTracksByMaoists', 'frequentlyUsedTracksByCattle', 'timeOfReporting'];


        newArr4.forEach((item, index) => {
            let A = formData.getAll(item);
            var c = [];
            for (var i = 0; i < A.length; i++) {
                var newObj = {};
                var objName = item.split('.');
                newObj[objName[objName.length - 1] + i] = A[i];
                c.push(newObj);
                formObj[item] = c;
            }
        })




        let newObj = { 'id': this.state.operationId };
        formObj["operation"] = Object.assign({}, newObj);

        var self = this;
        /*Post request of feedBackReport*/
        axios.post(`http://${host}/georbis/forms/feedbackreport`, formObj, {
            // `headers` are custom headers to be sent
            headers: { 'jwt': getJWTToken() }
        })
            .then(function (response) {
                if (response.data.status) {
                    alert(response.data.message);
                    self.props.fetchOperationLogs();
                } else {
                    alert("failed to save the form");
                }

                // self.formCreator('formDownload');
            })
            .catch(function (error) {
                console.log(error);
                alert('failed to submit form');

            });


    }




    deBriefFormSubmitHandler(evt) {
        evt.preventDefault();
        var formData = new FormData(evt.target);

        var testObj = {};
        var formObj = {};
        var dPointObj = {};
        var pPointObj = {};
        var fPointObj = {};
        var hPointObj = {};
        //object to store apporach point details
        let approachPointObj = {};

        var locationObj = {};
        var siteObj = {};
        var bridgeObj = {};
        var checkPostObj = {};
        var landMarkObj = {};
        var mobObj = {};
        var hideObj = {};
        var ambObj = {};
        var domObj = {};
        var possibleLUPsObj = {};
        var perrenialWaterPointsObj = {};
        var seasonalWaterPointsObj = {};


        for (var pair of formData.entries()) {

            testObj[pair[0]] = pair[1];




            if (pair[0].indexOf('deploypoint') != -1) {

                dPointObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, dPointObj);

            } else if (pair[0].indexOf('pickuppoint') != -1) {

                pPointObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, pPointObj);

            } else if (pair[0].indexOf('approachRoad') != -1) {

                approachPointObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, approachPointObj);

            } else if (pair[0].indexOf('harbourPoint') != -1) {

                hPointObj[pair[0].split('.')[2]] = pair[1];
                formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, hPointObj);

            }
            else if (pair[0].indexOf('Location') != -1) {

                locationObj[pair[0].split('.')[2]] = pair[1];
                formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, locationObj);

            } else if (pair[0].indexOf('Site') != -1) {


                siteObj[pair[0].split('.')[2]] = pair[1];
                formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, siteObj);

            } else if (pair[0].indexOf('checkPost') != -1) {

                checkPostObj[pair[0].split('.')[2]] = pair[1];
                formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, checkPostObj);
            }
            else if (pair[0].indexOf('areaWithMobileConnectivity') != -1) {

                mobObj[pair[0].split('.')[1]] = pair[1];
                formObj[pair[0].split('.')[0]] = Object.assign({}, mobObj);
            } else if (pair[0].indexOf('Hide') != -1) {

                hideObj[pair[0].split('.')[2]] = pair[1];
                formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, hideObj);

            } else if (pair[1] === 'true' || pair[1] === 'false') {
                formObj[pair[0]] = JSON.parse(pair[1]);
            }
            else if (pair[0] === 'timeOfReporting' || pair[0] === 'fireExchange.date' || pair[0].indexOf('lastMaoistVisitDate') != -1) {
                let dArr = pair[1].split("-");
                formObj[pair[0]] = dArr[2] + "/" + dArr[1] + "/" + dArr[0];

            } else if (pair[0].indexOf("Area of operation") !== -1) {
                formObj[pair[0]] = parseJSON(pair[1])
            } else {
                formObj[pair[0]] = pair[1];
            }


        }

        /*code to handle the fields with array of datanode and datacount attribute */

        var newArr = ['information.villageRepresentativesContactNumber',
            'information.naxalSupportingVillagers',
            'information.shopKeepersInVillage',
            'information.maoistGroups',
            'participants.ammunitions',
            'participants.weapons',
            'fireExchange.casualtyOfSecurityForces',
            'participants.foodItem',
            'participants.firstAid'];

        newArr.forEach((item, index) => {



            //var A =[1,2,3,4,5,6,item];
            var A = formData.getAll(item + '.' + 'datanode');
            //var B=['a','s','d','f','g','h',item];
            var B = formData.getAll(item + '.' + 'datacount');

            var c = [];
            for (var i = 0; i < A.length; i++) {
                var newObj = {};
                newObj["datanode"] = A[i];
                newObj["datacount"] = B[i];
                c.push(newObj);
                formObj[item] = c;
            }

        })

        /*
            code to handle fields with datanode and datacount attribute single
        
        */
        var newArr2 = ['fireExchange.maoistgroup',
            'information.activitiesOfMaoists',
            'participants.communicationEquipment'
        ];

        newArr2.forEach((item, index) => {
            var A = formData.getAll(item + '.' + 'datanode');
            var B = formData.getAll(item + '.' + 'datacount');
            for (var i = 0; i < A.length; i++) {
                var newObj = {};
                newObj["datanode"] = A[i];
                newObj["datacount"] = B[i];
                formObj[item] = newObj;
            }
        })

        /*
            code to handle multiple markLine field and multiple contactNumber field
        */
        var newArr4 = ['terrain.frequentlyUsedTracksByPolice', 'terrain.frequentlyUsedTracksByMaoists', 'terrain.frequentlyUsedTracksByCattle', 'participants.teams.contactNumberOfIncharge'];

        newArr4.forEach((item, index) => {
            let A = formData.getAll(item);
            var c = [];
            for (var i = 0; i < A.length; i++) {
                var newObj = {};
                var objName = item.split('.');
                newObj[objName[objName.length - 1] + i] = A[i];
                c.push(newObj);
                formObj[item] = c;
            }
        })





        /*
           code to handle multiple latlong fileds or code to store the latlong fields in an array.
        */
        var newArr3 = ['terrain.ambushPoints',
            'terrain.harbourPoints',
            'terrain.ferryPoints',
            'terrain.bridgeAndCulverts',
            'terrain.possibleLUPs',
            'terrain.perrenialWaterPoints',
            'terrain.seasonalWaterPoints',
            'terrain.dominatingPoints',
            'terrain.possibleHideOuts',
            'marketLocation'];

        newArr3.forEach((item, index) => {
            var A = formData.getAll(item + '.' + 'latitude');
            var B = formData.getAll(item + '.' + 'longitude');
            var c = [];
            for (var i = 0; i < A.length; i++) {
                var newObj = {};
                newObj["latitude"] = A[i];
                newObj["longitude"] = B[i];
                c.push(newObj);
                formObj[item] = c;
            }

        });


        /*
          Code for structuring the form data
    
          */

        var structuredObj = {};

        var terrain = {};
        var fireExchange = {};
        var participants = {};
        var teams = {};
        var information = {};
        var suspectedPeople = {};
        var suspectedPeopleArr = [];



        for (var x in formObj) {
            /*Code for structuring quality*/

            if (x.indexOf("quality") != -1) {
                structuredObj[x.split('&')[0]] = formObj[x].split(',')[0];
                structuredObj[x.split('&')[1]] = formObj[x].split(',')[1];
            } else

                /*Code to structure terrain data*/
                if (x.split('.')[0] === "terrain") {
                    //terrain[x.split('.')[1]]=formObj[x];
                    if (x.split('.')[1] === 'marketLocation' ||
                        x.split('.')[1] === 'bridgeAndCulverts' ||
                        x.split('.')[1] === 'possibleHideOuts' ||
                        x.split('.')[1] === 'perrenialWaterPoints' ||
                        x.split('.')[1] === 'possibleLUPs' ||
                        x.split('.')[1] === 'seasonalWaterPoints' ||
                        x.split('.')[1] === 'perrenialWaterPoints' ||
                        x.split('.')[1] === 'dominatingPoints' ||
                        x.split('.')[1] === 'ferryPoints' ||
                        x.split('.')[1] === 'harbourPoints') {


                        terrain[x.split('.')[1]] = formObj[x];
                    } else {
                        terrain[x.split('.')[1]] = formObj[x];
                    }
                } else
                    /*Code to structure fireExchange data*/


                    if (x.split('.')[0] === "fireExchange") {
                        if (x.indexOf('number') != -1 || x.indexOf('cash') != -1 || x.indexOf('time') != -1) {
                            fireExchange[x.split('.')[1]] = parseInt(formObj[x]);
                        } else {
                            fireExchange[x.split('.')[1]] = formObj[x];
                        }
                    } else
                        /* code to Structure participants data*/


                        if (x.split('.')[0] === "participants") {
                            if (x.split('.')[1] === 'teams') {

                                if (x.split('.')[2] !== "nameOfIncharge") {
                                    teams[x.split('.')[2]] = formObj[x];
                                } else {
                                    teams[x.split('.')[2]] = formObj[x];
                                }
                                let newArr = [];
                                newArr.push(teams);
                                participants[x.split('.')[1]] = newArr;

                            } else if (x.split('.')[1] === "GROfStrategicPoints") {
                                participants[x.split('.')[1]] = participants[x.split('.')[1]] || {}
                                participants[x.split('.')[1]][x.split('.')[2]] = formObj[x]
                            } else {
                                participants[x.split('.')[1]] = formObj[x];
                            }
                        } else


                            /* code to Structure information data*/


                            if (x.split('.')[0] === "information") {
                                //split and store in temp, so the split function need not be called again and again
                                const temp = x.split('.');
                                if (x.split('.')[1] === "suspectedPeople[0]") {
                                    //flattern the suspected people and save it in information object
                                    information[`${temp[1]}.${temp[2]}`] = formObj[x];
                                } else {
                                    information[x.split('.')[1]] = formObj[x];
                                }

                            } else {

                                structuredObj[x] = formObj[x];

                            }

        }

        structuredObj["terrain"] = Object.assign({}, terrain);
        structuredObj["fireExchange"] = Object.assign({}, fireExchange);
        structuredObj["participants"] = Object.assign({}, participants);
        structuredObj["information"] = Object.assign({}, information);
        let newObj = { 'id': this.state.operationId };
        //let newObj = {'id':25};
        structuredObj["operation"] = Object.assign({}, newObj);
        /**
         * !!JUGAADD FOR DEMO
         * !!REMOVE AFTER DEMO
         */
        if (!structuredObj.shortComingIssueInPlanning)
            structuredObj.shortComingIssueInPlanning = "NOT-APPLICABLE";
        if (!structuredObj.shortComingIssueInBriefing)
            structuredObj.shortComingIssueInBriefing = "NOT-APPLICABLE";
        if (!structuredObj.shortComingIssueInExecution)
            structuredObj.shortComingIssueInExecution = "NOT-APPLICABLE";
        if (!structuredObj.safetyIssue)
            structuredObj.safetyIssue = "NOT-APPLICABLE";



        var self = this;
        /*Post request of deBriefFormatReport 192.168.1.87*/
        axios.post(`http://${host}/georbis/forms/debriefformat`, structuredObj, {
            // `headers` are custom headers to be sent
            headers: { 'jwt': getJWTToken() }
        })
            .then(function (response) {

                if (response.data.status) {
                    alert(response.data.message);
                    self.props.fetchOperationLogs()
                    self.formCreator('Feedback Report');
                } else {
                    alert("Failed to submit this form!");
                }



            })
            .catch(function (error) {
                console.log(error);

            });
    }

    formSubmitHandler(evt) {
        evt.preventDefault();
        var formData = new FormData(evt.target);
        var formObj = {};
        for (var pair of formData.entries()) {
            formObj[pair[0]] = pair[1];
        }

        console.log("This is the form data Object : " + JSON.stringify(formObj));

        /* Code for Stucturing the input */

        var structuredObj = {}
        var parties = [];
        var backupTeam = {};
        var address = {};
        for (var x in formObj) {

            /* code for Extracting the address Object form the formObject*/

            if (x.indexOf("address") != -1) {
                address[x.split('.')[1]] = formObj[x];
            } else if (x === 'nameOfPoliceStation' || x === 'district') {
                //submit district and name of police station to server
                address[x] = formObj[x];
            } else
                if (x.indexOf("parties") !== -1) {
                    /*code for structuring parties array from formObj */
                    var newObj = {};
                    let index = x.split('[')[1].split(']')[0];
                    newObj["name"] = 'party' + index;
                    newObj['partystrength'] = +formObj[x];
                    parties.push(newObj);

                } else

                    /* Structuring BackUp Team data from FormObj  */
                    if (x.indexOf('backupTeam') != -1) {
                        backupTeam[x.split('.')[1]] = formObj[x];
                    } else
                        if (x === "startDate" || x === "endDate" || x === "partyDepartureFromBase") {
                            // get the value of this particular date element
                            //value format is YYYY-MM-DD
                            let dateValue = document.getElementsByName(x)[0].value;
                            //split the date value
                            let dArr = dateValue.split("-");
                            //reversing the format for sever 
                            structuredObj[x] = dArr[2] + "/" + dArr[1] + "/" + dArr[0];
                        } else {
                            structuredObj[x] = formObj[x];
                        }

        }
        structuredObj["address"] = address;
        structuredObj["parties"] = parties;
        structuredObj["backupTeam"] = Object.assign({}, backupTeam);
        //to be removed in future builds
        structuredObj.strength = backupTeam.strength;
        console.log("This is the structured Obj" + JSON.stringify(structuredObj));

        var self = this;
        /*Post request of Observationreport*/
        axios.post(`http://${host}/georbis/forms/observationreport`, structuredObj, {
            // `headers` are custom headers to be sent
            headers: { 'jwt': getJWTToken() }
        })
            .then(function (response) {
                alert(response.data.message);
                if (response.data.data != null) {
                    self.setState((state) => {
                        return {
                            operationId: response.data.data,
                            oRSaved: true,
                        }

                    });
                    self.props.fetchOperationLogs();
                    self.formCreator('CheckList Report');
                    //set the active form to checklist
                    self.setState({ activeForm: 1 });
                }
            })
            .catch(function (error) {
                alert("!! Observation Report Submition Failed ");
                console.log(error);
            });
    }

    checklistFormSubmitHandler(evt) {
        evt.preventDefault();
        //check if the observation report form has been submitted already.
        const oRSaved = this.state.oRSaved;
        var formData = new FormData(evt.target);
        var formObj = {};
        for (var pair of formData.entries()) {
            if (pair[1] === 'true' || pair[1] === 'false') {
                formObj[pair[0]] = JSON.parse(pair[1]);
            } else {
                formObj[pair[0]] = pair[1];
            }
        }
        formObj["operationId"] = this.state.operationId;

        var self = this;
        /*Post request of Checklist Report*/
        axios.post(`http://${host}/georbis/forms/checklist`, formObj, {
            // `headers` are custom headers to be sent
            headers: { 'jwt': getJWTToken() }
        }).then(function (response) {

            if (response.data.data !== null) {
                // if form save is successfull then set cRSaved to true
                self.setState({ cRSaved: true });
                self.props.fetchOperationLogs()
                alert("form saved");
                if (oRSaved) {
                    self.formCreator('De-brief Format Report');
                    //change the active form number
                    self.setState({ activeForm: 2 });
                }
            } else if (!response.data.status) {
                alert(response.data.message);
            }
        })
            .catch(function (error) {
                console.log(error);
                alert("submission for checklistForm form failed");
            });
    }


    computeTotalParyStrength() {
        var sum = 0;

        if (this.state.parties.length === 0) {
            const totalStrengthElement = document.getElementById("parties[0].partystrength");
            if (totalStrengthElement)
                sum = sum + (totalStrengthElement.value);
        }
        else {
            this.state.parties.forEach((item, index) => {
                const totalStrengthElement = document.getElementById(`parties[${index}].partystrength`);
                if (totalStrengthElement)
                    sum = sum + parseInt(totalStrengthElement.value);
            })
            const totalStrengthElement = document.getElementById(`parties[${this.state.parties.length}].partystrength`);
            if (totalStrengthElement)
                sum = sum + parseInt(totalStrengthElement.value);
        }
        const totalStrengthElement = document.getElementById("totalStrength");
        if (totalStrengthElement)
            totalStrengthElement.value = parseInt(sum);
    }

    latLongFieldCreator(evt) {
        evt.preventDefault();


        let currentId = evt.target.id;
        this.setState((prevState) => {
            return {
                arr: prevState.arr.concat(+currentId)

            }
        })

    }


    formCreator(data) {
        if (data) {
            this.setState((prevState) => {
                return {
                    formdata: data
                }
            });
        }
    }

    //method to save form in local storage
    saveFormDataToLocalStorage = (currentForm) => {

        //create form data from the form
        var formData = new FormData(this.getPreviousFormElementByID(currentForm));
        var formObj = {};
        /**
         * THIS IS THE HANDLING FOR OBSERVATION FORM
         */
        if (currentForm === 0) {
            for (var pair of formData.entries()) {
                //add all data from formEntries to this object
                formObj[pair[0]] = pair[1];
            }
            //structuring the formData to be the same as post request
            /* Code for Stucturing the input */

            let structuredObj = {};
            //declare a nested operation object
            structuredObj.operation = {};
            //create a nested address operation 
            structuredObj.operation.address = {};
            let parties = [];
            let backupTeam = {};
            let address = {};
            for (let x in formObj) {

                /* code for Extracting the address Object form the formObject*/

                if (x.indexOf("address") != -1) {
                    //add this to operation object in address
                    structuredObj.operation.address[x.split('.')[1]] = formObj[x];
                } else if (x === 'operationName') {
                    //set the operation name to operation object
                    structuredObj.operation[x] = formObj[x];
                } else
                    if (x.indexOf("parties") !== -1) {
                        /*code for structuring parties array from formObj */
                        var newObj = {};
                        let index = x.split('[')[1].split(']')[0];
                        newObj["name"] = 'party' + index;
                        newObj['partystrength'] = +formObj[x];
                        parties.push(newObj);

                    } else

                        /* Structuring BackUp Team data from FormObj  */
                        if (x.indexOf('backupTeam') != -1) {
                            backupTeam[x.split('.')[1]] = formObj[x];
                        } else
                            if (x === "startDate" || x === "endDate") {
                                // get the value of this particular date element
                                //value format is YYYY-MM-DD
                                let dateValue = document.getElementsByName(x)[0].value;
                                //create the epoch time from the utc format
                                const date = new Date(dateValue);
                                structuredObj.operation[x] = date.getTime();
                            } else if (x === "partyDepartureFromBase") {
                                // get the value of this particular date element
                                //value format is YYYY-MM-DD
                                let dateValue = document.getElementsByName(x)[0].value;
                                //create the epoch time from the utc format
                                const date = new Date(dateValue);
                                //reversing the format for sever 
                                structuredObj[x] = date.getTime();
                            } else {
                                structuredObj[x] = formObj[x];
                            }

            }
            structuredObj["address"] = address;
            structuredObj["parties"] = parties;
            structuredObj["backupTeam"] = Object.assign({}, backupTeam);
            formObj = structuredObj;



        } else if (currentForm === 1) {
            /**
             * HANDLE FOR SECOND FORM CHECKLIST FORM
             */
            for (var pair of formData.entries()) {
                if (pair[1] === 'true' || pair[1] === 'false') {
                    formObj[pair[0]] = JSON.parse(pair[1]);
                } else {
                    formObj[pair[0]] = pair[1];
                }
            }


        } else if (currentForm === 2) {
            /**
             * HANDLE FOR SECOND FORM, DEBRIEF FORM
             */

            var testObj = {};
            var formObj = {};
            var dPointObj = {};
            var pPointObj = {};
            var fPointObj = {};
            var hPointObj = {};

            var locationObj = {};
            var siteObj = {};
            var bridgeObj = {};
            var checkPostObj = {};
            var landMarkObj = {};
            var mobObj = {};
            var hideObj = {};
            var ambObj = {};
            var domObj = {};
            var possibleLUPsObj = {};
            var perrenialWaterPointsObj = {};
            var seasonalWaterPointsObj = {};


            for (var pair of formData.entries()) {

                testObj[pair[0]] = pair[1];




                if (pair[0].indexOf('deploypoint') != -1) {

                    dPointObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, dPointObj);

                } else if (pair[0].indexOf('pickuppoint') != -1) {

                    pPointObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, pPointObj);

                } else if (pair[0].indexOf('harbourPoint') != -1) {

                    hPointObj[pair[0].split('.')[2]] = pair[1];
                    formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, hPointObj);

                }
                else if (pair[0].indexOf('Location') != -1) {

                    locationObj[pair[0].split('.')[2]] = pair[1];
                    formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, locationObj);

                } else if (pair[0].indexOf('Site') != -1) {


                    siteObj[pair[0].split('.')[2]] = pair[1];
                    formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, siteObj);

                } else if (pair[0].indexOf('checkPost') != -1) {

                    checkPostObj[pair[0].split('.')[2]] = pair[1];
                    formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, checkPostObj);
                }
                else if (pair[0].indexOf('areaWithMobileConnectivity') != -1) {

                    mobObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, mobObj);
                } else if (pair[0].indexOf('Hide') != -1) {

                    hideObj[pair[0].split('.')[2]] = pair[1];
                    formObj[pair[0].split('.')[0] + '.' + pair[0].split('.')[1]] = Object.assign({}, hideObj);

                } else if (pair[1] === 'true' || pair[1] === 'false') {
                    formObj[pair[0]] = JSON.parse(pair[1]);
                }
                else if (pair[0] === 'fireExchange.date' || pair[0].indexOf('lastMaoistVisitDate') != -1) {
                    let dArr = pair[1].split("-");
                    formObj[pair[0]] = dArr[2] + "/" + dArr[1] + "/" + dArr[0];

                } else if (pair[0].indexOf("Area of operation") !== -1) {
                    formObj[pair[0]] = parseJSON(pair[1])
                } else {
                    formObj[pair[0]] = pair[1];
                }


            }

            /*code to handle the fields with array of datanode and datacount attribute */

            var newArr = ['information.villageRepresentativesContactNumber',
                'information.naxalSupportingVillagers',
                'information.shopKeepersInVillage',
                'information.maoistGroups',
                'participants.ammunitions',
                'participants.weapons',
                'fireExchange.casualtyOfSecurityForces',
                'participants.foodItem',
                'participants.firstAid'];

            newArr.forEach((item, index) => {



                //var A =[1,2,3,4,5,6,item];
                var A = formData.getAll(item + '.' + 'datanode');
                //var B=['a','s','d','f','g','h',item];
                var B = formData.getAll(item + '.' + 'datacount');

                var c = [];
                for (var i = 0; i < A.length; i++) {
                    var newObj = {};
                    newObj["datanode"] = A[i];
                    newObj["datacount"] = B[i];
                    c.push(newObj);
                    formObj[item] = c;
                }

            })

            /*
                code to handle fields with datanode and datacount attribute single
            
            */
            var newArr2 = ['fireExchange.maoistgroup',
                'information.activitiesOfMaoists',
                'participants.communicationEquipment'
            ];

            newArr2.forEach((item, index) => {
                var A = formData.getAll(item + '.' + 'datanode');
                var B = formData.getAll(item + '.' + 'datacount');
                for (var i = 0; i < A.length; i++) {
                    var newObj = {};
                    newObj["datanode"] = A[i];
                    newObj["datacount"] = B[i];
                    formObj[item] = newObj;
                }
            })

            /*
                code to handle multiple markLine field and multiple contactNumber field
            */
            var newArr4 = ['terrain.frequentlyUsedTracksByPolice', 'terrain.frequentlyUsedTracksByMaoists', 'terrain.frequentlyUsedTracksByCattle', 'participants.teams.contactNumberOfIncharge'];

            newArr4.forEach((item, index) => {
                let A = formData.getAll(item);
                var c = [];
                for (var i = 0; i < A.length; i++) {
                    var newObj = {};
                    var objName = item.split('.');
                    newObj[objName[objName.length - 1] + i] = A[i];
                    c.push(newObj);
                    formObj[item] = c;
                }
            })





            /*
               code to handle multiple latlong fileds or code to store the latlong fields in an array.
            */
            var newArr3 = ['terrain.ambushPoints',
                'terrain.harbourPoints',
                'terrain.ferryPoints',
                'terrain.bridgeAndCulverts',
                'terrain.possibleLUPs',
                'terrain.perrenialWaterPoints',
                'terrain.seasonalWaterPoints',
                'terrain.dominatingPoints',
                'terrain.possibleHideOuts',
                'marketLocation'];

            newArr3.forEach((item, index) => {
                var A = formData.getAll(item + '.' + 'latitude');
                var B = formData.getAll(item + '.' + 'longitude');
                var c = [];
                for (var i = 0; i < A.length; i++) {
                    var newObj = {};
                    newObj["latitude"] = A[i];
                    newObj["longitude"] = B[i];
                    c.push(newObj);
                    formObj[item] = c;
                }

            });


            /*
              Code for structuring the form data
        
              */

            var structuredObj = {};

            var terrain = {};
            var fireExchange = {};
            var participants = {};
            var teams = {};
            var information = {};
            var suspectedPeople = {};
            var suspectedPeopleArr = [];



            for (var x in formObj) {
                /*Code for structuring quality*/

                if (x.indexOf("quality") != -1) {
                    structuredObj[x.split('&')[0]] = formObj[x].split(',')[0];
                    structuredObj[x.split('&')[1]] = formObj[x].split(',')[1];
                } else

                    /*Code to structure terrain data*/
                    if (x.split('.')[0] === "terrain") {
                        //terrain[x.split('.')[1]]=formObj[x];
                        if (x.split('.')[1] === 'marketLocation' ||
                            x.split('.')[1] === 'bridgeAndCulverts' ||
                            x.split('.')[1] === 'possibleHideOuts' ||
                            x.split('.')[1] === 'perrenialWaterPoints' ||
                            x.split('.')[1] === 'possibleLUPs' ||
                            x.split('.')[1] === 'seasonalWaterPoints' ||
                            x.split('.')[1] === 'perrenialWaterPoints' ||
                            x.split('.')[1] === 'dominatingPoints' ||
                            x.split('.')[1] === 'ferryPoints' ||
                            x.split('.')[1] === 'harbourPoints') {


                            terrain[x.split('.')[1]] = formObj[x];;
                        } else {
                            terrain[x.split('.')[1]] = formObj[x];
                        }
                    } else
                        /*Code to structure fireExchange data*/


                        if (x.split('.')[0] === "fireExchange") {
                            if (x.indexOf('number') != -1 || x.indexOf('cash') != -1 || x.indexOf('time') != -1) {
                                fireExchange[x.split('.')[1]] = parseInt(formObj[x]);
                            } else {
                                fireExchange[x.split('.')[1]] = formObj[x];
                            }
                        } else
                            /* code to Structure participants data*/


                            if (x.split('.')[0] === "participants") {
                                if (x.split('.')[1] === 'teams') {

                                    if (x.split('.')[2] !== "nameOfIncharge") {
                                        teams[x.split('.')[2]] = formObj[x];
                                    } else {
                                        teams[x.split('.')[2]] = formObj[x];
                                    }
                                    let newArr = [];
                                    newArr.push(teams);
                                    participants[x.split('.')[1]] = newArr;

                                } else if (x.split('.')[1] === "GROfStrategicPoints") {
                                    participants[x.split('.')[1]] = participants[x.split('.')[1]] || {}
                                    participants[x.split('.')[1]][x.split('.')[2]] = formObj[x]
                                } else {
                                    participants[x.split('.')[1]] = formObj[x];
                                }
                            } else


                                /* code to Structure information data*/


                                if (x.split('.')[0] === "information") {
                                    //split and store in temp, so the split function need not be called again and again
                                    const temp = x.split('.');
                                    if (x.split('.')[1] === "suspectedPeople[0]") {
                                        //flattern the suspected people and save it in information object
                                        information[`${temp[1]}.${temp[2]}`] = formObj[x];
                                    } else {
                                        information[x.split('.')[1]] = formObj[x];
                                    }

                                } else {

                                    structuredObj[x] = formObj[x];

                                }

            }

            structuredObj["terrain"] = Object.assign({}, terrain);
            structuredObj["fireExchange"] = Object.assign({}, fireExchange);
            structuredObj["participants"] = Object.assign({}, participants);
            structuredObj["information"] = Object.assign({}, information);
            let newObj = { 'id': this.state.operationId };
            //let newObj = {'id':25};
            structuredObj["operation"] = Object.assign({}, newObj);

            formObj = structuredObj;

        } else if (currentForm === 3) {
            /**
             * HANDLE FOR FEEDBACK FORM
             */
            var formObj = {};
            var detailsObj = {};
            var popObj = {};
            var dPointObj = {};
            var pPointObj = {};
            var fPointObj = {};
            var hPointObj = {};
            var landMark = {};
            var locationObj = {};
            var siteObj = {};
            var bridgeObj = {};
            var checkPostObj = {};
            var landMarkObj = {};

            for (var pair of formData.entries()) {
                if (pair[0].indexOf('deployPoint') != -1) {

                    dPointObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, dPointObj);

                } else if (pair[0].indexOf('landMark') != -1) {

                    landMark[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, landMark);

                }


                else if (pair[0].indexOf('pickupPoint') != -1) {

                    pPointObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, pPointObj);

                } else if (pair[0].indexOf('Location') != -1) {

                    locationObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, locationObj);

                } else if (pair[0].indexOf('Site') != -1) {

                    siteObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, siteObj);

                } else if (pair[1] === 'true' || pair[1] === 'false') {
                    formObj[pair[0]] = JSON.parse(pair[1]);
                } else if (pair[0].indexOf('typeOfPopulation') != -1) {

                    popObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, popObj);
                } else if (pair[0].indexOf('detailsOfAchivementOrLoss') != -1) {

                    detailsObj[pair[0].split('.')[1]] = pair[1];
                    formObj[pair[0].split('.')[0]] = Object.assign({}, detailsObj);
                }
                else if (pair[0].indexOf('ambushSite') != -1 ||
                    pair[0].indexOf('ferryPoints') != -1 ||
                    pair[0].indexOf('bridgeAndCulverts') != -1 ||
                    pair[0].indexOf('checkPosts') != -1 ||
                    pair[0].indexOf('harbourPoints') != -1) {


                }
                else {
                    formObj[pair[0]] = pair[1];
                }
            }


            /* code to handle array of latlong fileds*/
            var newArr3 = ['ambushSite',
                'ferryPoints',
                'bridgeAndCulverts',
                'checkPosts',
                'harbourPoints',
                'marketLocation',
                'landMark'];

            newArr3.forEach((item, index) => {
                var A = formData.getAll(item + '.' + 'latitude');
                var B = formData.getAll(item + '.' + 'longitude');
                var c = [];
                for (var i = 0; i < A.length; i++) {
                    var newObj = {};
                    newObj["latitude"] = A[i];
                    newObj["longitude"] = B[i];
                    c.push(newObj);
                    formObj[item] = c;
                }

            });

            /*
               code to handle multiple markLine field and multiple contactNumber field
           */
            var newArr4 = ['frequentlyUsedTracksByPolice', 'frequentlyUsedTracksByMaoists', 'frequentlyUsedTracksByCattle', 'timeOfReporting'];


            newArr4.forEach((item, index) => {
                let A = formData.getAll(item);
                var c = [];
                for (var i = 0; i < A.length; i++) {
                    var newObj = {};
                    var objName = item.split('.');
                    newObj[objName[objName.length - 1] + i] = A[i];
                    c.push(newObj);
                    formObj[item] = c;
                }
            });

            let newObj = { 'id': this.state.operationId };

            formObj["operation"] = Object.assign({}, newObj);

        }
        //save this form in local storage
        saveInLocalStorage(currentForm, formObj);

        //reset formObj to null
        formObj = null;
    }

    //return the form based on the active form id
    getPreviousFormElementByID = (activeForm) => {
        if (activeForm === 0)
            return document.getElementById(OBSERVATION_REPORT_FORM_ID);
        else if (activeForm === 1)
            return document.getElementById(CHECKLIST_REPORT_FORM_ID);
        else if (activeForm === 2)
            return document.getElementById(DEBRIEF_REPORT_FORM_ID);
        else if (activeForm === 3)
            return document.getElementById(FEEDBACK_REPORT_FORM_ID);
        else
            return null;
    }

    getPickLatLongValue = (id, markedArea) => {
        //  this.setState({[id]:[markedArea.get('Top'),markedArea.get('Left')]})

    }
    componentWillReceiveProps(nextProps) {
        if (this.state.operationId !== nextProps.operationId) {
            this.state.operationId = nextProps.operationId
        }
    }
    closeHeader = () => {
        this.props.closeForm({ enable: true })
    }

    /**
     * this is a Function to set the Operation Name, whenever that field changes in the operation report
     */
    setOperationName = () => {
        //get the operationName element
        const operationNameElement = document.getElementsByName('operationName')[0];
        if (operationNameElement) {//get the current value of operationName
            const operationName = operationNameElement.value;    //set the operation name in state
            this.setState({ operationName });
        }
    }

    render() {
        //this holds data for types of operations for dropdown
        const typesOfOperationsList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(TYPES_OF_OPERATION.data));
        //this will hold the list of mode of transport
        const modeOfTransportationList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(MODE_OF_TRANSPORTATION.data));
        //this will hold the list of condition of Equipement
        const conditionOfEquipmentList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(CONDITION_OF_COMMUNICATION_EQUIPMENT.data));
        //this will hold the list of diff types of CommunicationEquipment
        const typesOfCommunicationEquipmentList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(COMMUNICATION_EQUIPMENT_TITLE.data));
        //this will hold the list of Status of Satellite phone
        const statusOfSatellitePhoneList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(STATUS_OF_SATELITE_PHONE.data));
        //this will hold the list of types of vegetation
        const typesOfTerrainIncludingTypesOfVegetationList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(TYPES_OF_TERRAIN_INCLUDING_VEGETATION.data));
        //this will hold the list of types of terrain
        const typesOfTerrainList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(TYPES_OF_TERRAIN.data));
        //this const will hold the list of attitude of people towards the govt
        const attitudeOfPopulationTowardsGovtList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(ATTITUDE_OF_POPULATION_TOWARDS_GOVT.data));
        //this const will hold the list of types of weapons
        const typesOfWeaponsList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(TYPES_OF_WEAPONS.data));
        //this const will hold list of villages
        const namesOfVillagesList = makeChildrenForDropDownHelperMethod(
            prepareImmutableDataListHelperMethod(DUMMY_LIST_OF_VILLAGES.data));
        //this variable will be true if the forms are not saved and false if they are saved
        const formsDRFRDisabled = false;//this.state.oRSaved && this.state.cRSaved ? false : true;


        // this.getPickLatLongValue(this.pickLatLong_)
        const odishaPoliceFormHeader = (
            <ReportTitle>ODISHA POLICE FORMS</ReportTitle>
        );


        return (

            <FloatingPane style={{
                height: "93.5%",
                width: "25%",
                margin: "0%",
                top: "6.2%",
                right: "0%"
            }}
                close={this.closeHeader}
                id={ODISHA_POLICE_FORMS_FLOATING_PANE_ID}
                headerChildren={odishaPoliceFormHeader}
                showDefaultPopUpButtons={true} >


                <StickyHeader>

                    <ReportUserButtonWrapper >

                        {/*<UserButton label={'KML UPLOADER'} onClick={() => this.formCreator('Kml Uploader')} /> */}
                        <UserButton label={'Observation Report'} onClick={() => {
                            //create the observation report form
                            this.formCreator('Observation Report');
                            //then set it as active
                            this.setState({ activeForm: 0 });

                        }}
                            //prop to specify if the form is active or not.
                            isActive={this.state.activeForm === 0 ? true : false} />

                        <UserButton
                            label={'CheckList Report'}
                            onClick={() => {
                                //set the operationName
                                this.setOperationName();
                                //create the checklist form
                                this.formCreator('CheckList Report');
                                //set it to active 
                                this.setState({ activeForm: 1 });
                                //if form data exists in local storage then fill it.
                                // const formData = retrieveFromLocalStorage(1);
                                //this.populateObservationReport(formData);
                            }}
                            //prop to specify if the form is active or not.
                            isActive={this.state.activeForm === 1 ? true : false} />

                        <UserButton
                            label={'De-briefing Report'}
                            disabled={formsDRFRDisabled}
                            onClick={() => {
                                //set the operationName
                                this.setOperationName();

                                //craete the debreif form
                                this.formCreator('De-brief Report');
                                //set it to active
                                this.setState({ activeForm: 2 });
                                //if form data exists in local storage then fill it.
                                // const formData = retrieveFromLocalStorage(2);
                                // this.populateObservationReport(formData);


                            }}
                            //prop to specify if the form is active or not.
                            isActive={this.state.activeForm === 2 ? true : false}
                        />

                        <UserButton
                            label={'Feedback Report'}
                            disabled={formsDRFRDisabled}
                            onClick={() => {
                                //set the operationName
                                this.setOperationName();
                                //create the form called feedback
                                this.formCreator('Feedback Report')
                                //set it to active\
                                this.setState({ activeForm: 3 });
                                //if form data exists in local storage then fill it.
                                // const formData = retrieveFromLocalStorage(3);
                                // this.populateObservationReport(formData);

                            }}
                            //prop to specify if the form is active or not.
                            isActive={this.state.activeForm === 3 ? true : false}
                        />

                    </ReportUserButtonWrapper>

                    <ClearButton type="button"
                        label="Clear"
                        onClick={_ => {
                            //reset the form based on the current active form
                            this.getPreviousFormElementByID(this.state.activeForm).reset();
                            //clear the local storage
                            this.saveFormDataToLocalStorage(this.state.activeForm);
                        }}>CLEAR</ClearButton>

                </StickyHeader>
                {/*
          <div id="targetDiv">
              {this.state.formdata}
          </div>
*/}

                {/* Using Presentational Component to handle all the form data display*/}
                <FormHolder
                    //this prop is for the name of the states.
                    namesOfDistrict={this.state.oRNameOfDistricts}
                    //this prop will hold the list of police station names
                    namesOfPoliceStation={this.state.oRNameOfPoliceStation}
                    //this is a universal dropdown handler for the all dropdowns in OdishaPolice Froms
                    onDropDownChangeOdishaPoliceFormsUniversal={this.onDropDownChangeOdishaPoliceFormsUniversal}
                    //this props has contains data for a field called Breifing Name and Place
                    oROfficerBriefingNameAndPlace={this.state.oROfficerBriefingNameAndPlace}
                    //this prop has the list of types of Operations
                    fTypesOfOperations={typesOfOperationsList}
                    //this prop has the list of Modes of Transportation
                    fModesOfTransportation={modeOfTransportationList}
                    //this props has the list of Condition of Equipments
                    fConditionOfEquipments={conditionOfEquipmentList}
                    //this props has the list of type of communincation Equipments
                    fTypesOfCommunicationEquipments={typesOfCommunicationEquipmentList}
                    //this props has the list of status of sattelite phone
                    fStatusOfSatellitePhoneDropDownChildren={statusOfSatellitePhoneList}
                    //this props will contain the list of types of vegetation dropdown
                    fTypeOfTerrainIncludingTypesOfVegetation={typesOfTerrainIncludingTypesOfVegetationList}
                    //this props will hold the list of types of terrain
                    fTypesOfTerrain={typesOfTerrainList}
                    //this props will hold the attitude of people towards the govt
                    fAttitudeOfPeopleTowardsGovt={attitudeOfPopulationTowardsGovtList}
                    //this props will hold the list of types of weapon
                    fTypesOfWeapons={typesOfWeaponsList}
                    /** 
                      this is a map which will contain arrays of addable ids
                      the id of dropdown will be as follows
                      { dropdownTypeName: [array of dropdown ids under that type]}
                    */
                    dRVariableDropdownIds={this.state.dRVariableDropdownIds}
                    //this props will hold a function that will add a new dropdown
                    //to the form ui and update its id in a map in our local state.
                    functionCreateNewDropDown={this.createNewDropDown}
                    /** 
                     * this props holds a function that will be responsible for
                     *  delete a drop down with the minus button
                     */
                    functionDeleteExistingDropDown={this.deleteExistingDropDown}
                    //this props will hold the list of villages
                    fNamesOfVillages={namesOfVillagesList}
                    //this props will hold the ids of the array of inputs for
                    //activities of maoists
                    activitiesOfMaoists={this.state.activitiesOfMaoists}
                    //this will be used to save the form data to local storage
                    functionSaveFormDataToLocalStorage={this.saveFormDataToLocalStorage}
                    //this is the props to pass the current active form
                    fActiveForm={this.state.activeForm}
                    //function to get the form by id
                    functionGetFormByActiveForm={this.getPreviousFormElementByID}
                    //this is the function to handle the download forms
                    functionHandleDownloadForms={this.handleDownloadForms}
                    //this is a function to set the operation name
                    functionSetOperationName={this.setOperationName}
                    fambushPoints={this.state.fambushPoints}
                    fDominatingPoints={this.state.fDominatingPoints}
                    fFerryPoints={this.state.fFerryPoints}
                    fHarbourPoints={this.state.fHarbourPoints}
                    fPossibleLups={this.state.fPossibleLups}
                    fHideOuts={this.state.fHideOuts}
                    fBridgesAndCulverts={this.state.fBridgesAndCulverts}
                    fCheckPoints={this.state.fCheckPoints}
                    tambushPoints={this.state.tambushPoints}

                    tBridgesAndCulverts={this.state.tBridgesAndCulverts}
                    tSeasonalWaterPoints={this.state.tSeasonalWaterPoints}
                    tPerenialWaterPoints={this.state.tPerenialWaterPoints}
                    tDominatingPoints={this.state.tDominatingPoints}
                    tFerryPoints={this.state.tFerryPoints}
                    tHarbourPoints={this.state.tHarbourPoints}
                    tPossibleLups={this.state.tPossibleLups}
                    tHideOuts={this.state.tHideOuts}
                    arr={this.state.tambushPoints}
                    data={this.state.formdata}
                    operationId={this.state.operationId}
                    formCreator={this.formCreator}
                    formSubmitHandler={this.formSubmitHandler}
                    computeTotalParyStrength={this.computeTotalParyStrength}
                    checklistFormSubmitHandler={this.checklistFormSubmitHandler}
                    hideOtherFields={this.hideOtherFields}
                    deBriefFormSubmitHandler={this.deBriefFormSubmitHandler}
                    feedbackFormSubmitHandler={this.feedbackFormSubmitHandler}
                    populateObservationReport={this.populateObservationReport}
                    populateChecklistReport={this.populateChecklistReport}
                    populateDebriefFormat={this.populateDebriefFormat}
                    populateFeebackReport={this.populateFeebackReport}
                    createNewField={this.createNewField}
                    deleteItem={this.deleteItem}
                    pickLatLong={this.pickLatLong}

                    frequentlyUsedTracksByPolice={this.state.frequentlyUsedTracksByPolice}
                    frequentlyUsedTracksByMaoists={this.state.frequentlyUsedTracksByMaoists}
                    frequentlyUsedTracksByCattle={this.state.frequentlyUsedTracksByCattle}
                    ffrequentlyUsedTracksByCattle={this.state.ffrequentlyUsedTracksByCattle}
                    ffrequentlyUsedTracksByPolice={this.state.ffrequentlyUsedTracksByPolice}
                    marketLocation={this.state.marketLocation}
                    ffrequentlyUsedTracksByMaoists={this.state.ffrequentlyUsedTracksByMaoists}
                    contactNumberOfIncharge={this.state.contactNumberOfIncharge}
                    parties={this.state.parties}
                    pcommunicationEquipment={this.state.pcommunicationEquipment}
                    pammunitions={this.state.pammunitions}
                    ivillageRepresentativesCountNumber={this.state.ivillageRepresentativesCountNumber}
                    inaxalSupportingVillagers={this.state.inaxalSupportingVillagers}
                    fmaoistgroup={this.state.fmaoistgroup}
                    ishopKeepersInVillage={this.state.ishopKeepersInVillage}
                    pweapons={this.state.pweapons}
                    imaoistgroup={this.state.imaoistgroup}
                    pfirstAid={this.state.pfirstAid}
                    pfoodItems={this.state.pfoodItems}
                    fcasuality={this.state.fcasuality}
                    timeOfReporting={this.state.timeOfReporting}
                />
            </FloatingPane>
        );
    }
}





export default OdishaPoliceForm;
