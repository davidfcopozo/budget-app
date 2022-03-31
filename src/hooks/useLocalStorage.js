import { useEffect, useState } from "react";

// Similar to useState but first arg is key to the value in local storage.
export default function useLocalStorage(key, defaultValue) {

    // use state to make the value dynamic.
    const [value, setValue] = useState(()=>{

        // localStorage gets the key (key pair) and store it in jsonValue
        const jsonValue = localStorage.getItem(key)

        //converts jsonValue into a JS object
        if(jsonValue != null) return JSON.parse(jsonValue)

        //If defaultValue is a function, return it as a fuction
        if(typeof defaultValue === "function") {
            return defaultValue()
        } else {
            return defaultValue
        }
    })

    useEffect(()=>{
        //set the key and the value that the key's bring to localStorage. 
        //(value in localStorage can only be string)
        localStorage.setItem(key, JSON.stringify(value))

    },[key, value]) //Change state when either key and/or value changes

    //return the stored value and the other one is a way to update the value
    return  [value, setValue]
}
