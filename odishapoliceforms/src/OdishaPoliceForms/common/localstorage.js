//this is the function to save things in localstorage of the browser
export const saveInLocalStorage = (key, value) => {
    //key is the key to save, and value is the value 
    localStorage.setItem(key, JSON.stringify(value));
}

//THIS fucntion will be used to retrieve things from the local storage
export const retrieveFromLocalStorage = (key) =>{
    if(localStorage.hasOwnProperty(key))
    //key used to getfrom localStorage
    return JSON.parse(localStorage.getItem(key));

    return null;
}