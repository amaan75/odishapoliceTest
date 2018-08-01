import I, { fromJS } from 'immutable';
import {
  DISTRICT_POLICE_DUMMY,
} from './dummyData';

export const host = window.location.host;
export const peliasHost = `${window.location.hostname}:4000`;
//export const host = "192.168.0.116:19090";
export const signupHost = `http://${window.location.hostname}/app/register`;

export const BATHYMETRY_OFFSET = 0;
export function getCurrentDate() {

  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}




export function fetchData(request) {
  return fetch(request)
    .then((res) =>

      res.json()
    ).then((data) => ({
      data
    }))
    .catch((ex) => ({ ex }));
}

// // return the JWT token from the browser cookies
export function getJWTToken() {
  return 'sfdsfdf';//cookies.get('jwt');
}

// // this function prepare the request based on method
// export function prepareRequest(method, url, headers = {}, body = {}) {
//    const token = getJWTToken();
//   headers['jwt'] = token;
//   let request = new Request(url, {
//     method: method,
//     headers: headers
//   })

//   if (method === "POST" && Object.keys(body).length) {
//     request['body'] = body;
//   }
//   return request

// }
/*used to get the data for windPlot when multiple sensors are selected
* */
export function getKey(vizType, georbisId, iotId, dataStreamId) {
  return `${vizType}-${georbisId}-${iotId}-${dataStreamId}`;
}
export function getTimeFormat(year, month, day, hours, minutes, seconds) {
  //return `${year}-${month}-${day},${hours}:${minutes}:${seconds}`
  return `${year}-${month}-${day}`

}

//method to prepare all the Districts and police STation name data.
const prepareAllDistrictsData = () => {
  let allDistrictData = I.List();
  //for all data in this array, parse the data into an immutable List.
  DISTRICT_POLICE_DUMMY.data.forEach((districtObj) => {
    //this  will contain the data of a single district.
    let currentDistrict = I.Map();
    //setting the id of current District
    currentDistrict = currentDistrict.set("id", districtObj.district.id)
      //then we set the name of the current District
      .set("name", districtObj.district.name)
      //we then set info object. 
      .set("info", districtObj.district.info);
    //this is the List of maps of all the police stations in that district
    /**
     * @type []  [{id:String,name:String,info:{}}]
     */
    let currentDistrictPoliceStationsList = I.List();
    //for each police station create 
    districtObj.district.police_stations.forEach((policeStationObject) => {
      //this is a single police station map inside a district.
      let currentPoliceStation = I.Map();
      //setting the id of the current police station      
      currentPoliceStation = currentPoliceStation.set("id", policeStationObject.id)
        //setting the name of the current police station  
        .set("name", policeStationObject.name)
        //setting the info of the current Police station
        .set("info", policeStationObject.info);
      //finally pushing the current police station object to the list of police stations for this district
      currentDistrictPoliceStationsList = currentDistrictPoliceStationsList.push(currentPoliceStation);
    });
    //this is the current District with a list of all police stations under it
    currentDistrict = currentDistrict.set("policeStations", currentDistrictPoliceStationsList);
    //this is the data for all districts with all police stations mapped under each.
    allDistrictData = allDistrictData.push(currentDistrict);
  });
  return allDistrictData;
}

const allDistrictData = prepareAllDistrictsData();

//name of districts list to be passed down to dropdown.
export const prepareDistrictNameList = (districtData) => {
  const data = districtData || allDistrictData;
  let children = [];
  data.forEach((district) => {
    const currentDistrict = {
      id: district.get("id"),
      name: district.get("name")
    };
    children.push(currentDistrict);
  });
  return children;
}

//this function returns the name of police stations.
export const preparePoliceStationNamesList = (value) => {
  const id = value || "ang_dist_1";
  let temp = allDistrictData.filter(immutableDistrictMap => immutableDistrictMap.get("id") === id).first().toMap();
  let policeStationList = temp.get("policeStations");
  return policeStationList = policeStationList.toJS();
}


export const makeChildrenForDropDownHelperMethod = (value) => {
  //the data from which we will extract the list for dropdown
  const data = value;// || conditionOfCommunicationImmutableList;
  //this will be passed as children of the dropdown
  let children = [];
  //parsing data so that it becomes suitable to be passed to dropdowns.
  data.forEach((obj) => {
    const currentObject = {
      id: obj.get("id"),
      name: obj.get("name"),
    };
    //pushing this object to the children array
    children.push(currentObject);
  });
  // return this children which can now be used in the common components dropdown.
  return children;
}


//method that will make an  immutable list recived from server data.
export const prepareImmutableDataListHelperMethod = (dataResponse) => {
  //this varaible will hold the data Response from backend
  const data = dataResponse;
  //an immutable list that will hold all data objects
  let dataList = I.List();
  //for every object in data do the following
  data.forEach((currentObject) => {
    //an immutable map that will hold the current Object.
    const currentMap = fromJS(currentObject);
    //pushing the map to the list that we created above.
    dataList = dataList.push(currentMap);
  });
  // return the now parsed immutable list
  return dataList;
}

export const convertJSONData = (value) => {
  if (I.Map.isMap(value) || I.List.isList(value)) {
    return value.toJS()
  }
  return value
}


export const dateCompare = ({ startDate, endDate, to, from, name }) => {
  if (!to || !from) {
    return true
  }
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  to = new Date(to)
  from = new Date(from)
  return startDate >= from && startDate <= to && endDate >= from && endDate <= to
}

/**
 * 
 * @param {*} treeKey layer name 
 * @param {*} layers information of all layers like customizedLayer/customizedVizLayer
 */
export function getLayerName(treeKey, layers) {
  let count = [];
  for (let [customizedLayerKey, customizedLayerValue] of layers) {
    if (customizedLayerKey.lastIndexOf(treeKey + "_") !== -1) {
      let number = customizedLayerKey.substr(customizedLayerKey.lastIndexOf("_") + 1) || 0
      count.push(number)
    }
  }
  let max = Math.max(...count)
  count = count.length === 0 ? 1 : max + 1
  return treeKey + "_" + count
}



/**
 * 
 * @param {*} source source string value
 * @param {*} target  target value string 
 *checking the target value is exists  or not from source value
 */
export const isMatch = (source = '', target = '') => {
  var rx = new RegExp(target, 'i');
  return (source + "").match(rx);
}

//convert plain java script object 
export const isJSONObject = (value) => {
  var objectConstructor = {}.constructor;
  if (!value) {
    return false
  }
  return value.constructor === objectConstructor
}

/**
 * 
 * @param {*} filterKey information of all data 
 * @param {*} searchBoxValue  searched value
 * checking the search value is exist or not from data(filterKey)
 */
export function getFilterSearchValue(filterKey, searchBoxValue) {
  for (let key in filterKey) {
    if (isJSONObject(filterKey[key])) {
      return getFilterSearchValue(filterKey[key], searchBoxValue)
    }
    if (isMatch(filterKey[key], searchBoxValue)) {
      return true
    }
  }
}
//parse the json value from string.
export function parseJSON(value) {
  try {
    value = JSON.parse(value)
  } finally {
    return value
  }
}

export function populateVizValues(values) {
  if(!values){
    return {}
  }
  if (isJSONObject(values)) {
    values = fromJS(values)
  }
  let result = {}
  for (var [key, info] of values) {
    let value = info.first()
    value = convertJSONData(value)
    result[key] = value
  }
  return result
}