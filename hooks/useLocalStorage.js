// THIS HOOK CAUSES ERRORS due to rehydration mismatch
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
// in short, NextJS react code runs twice: once on the server, and once on the client
// on the server, we DON'T have window.localStorage, so we load defaultVal into our pcOfSt8 (Next uses that pcOfSt8 to build our site**)
// but on the client, we DO have window.localStorage, so we load the localStorage array into our pcOfSt8 (** again, a 2nd time)
// this causes a MISMATCH between what the server renders, and what the client renders, which throws the warning:
// "Expected server HTML to contain a matching <div> in <div>"

// to resolve this, we take the logic from this hook and add it into a useEffect call in the page components themselves
// useEffect only runs on the CLIENT side, after build I think, so there is no mismatch




// new custom hook that should synchronize changes to savedReminders
// https://typeofnan.dev/using-local-storage-in-react-with-your-own-custom-uselocalstorage-hook/

import { useState, useEffect } from "react";

export const useLocalStorage = (storageKey, defaultVal) => {
  let stored = null; // init empty var for "stored" value
  // MUST check if window is VV undefined! code runs on server 1st, will throw errors at that point if we don't check
  if (typeof window !== 'undefined') {
    console.log("Window is defined, reading from localStorage");
    stored = window.localStorage.getItem(storageKey); // pull data from localStorage as "stored"
  }
  const initial = stored ? JSON.parse(stored) : defaultVal; // if stored is not null, parse stored and save as "initial"
  const [ stateVal, setStateVal ] = useState(initial); // pass that initial val into useState, receive pcOfSt8 and state-setter

  // THIS VV doesn't get the "window is undefined" error bc useEffect only runs on the CLIENT side
  useEffect(() => { // this useEffect call runs whenever we use our state-setter inside our components...
    console.log(`Writing to ${storageKey} into localStorage`);
    window.localStorage.setItem(storageKey, JSON.stringify(stateVal));
  }, [stateVal, storageKey]); // ...bc stateVal is in our dependency array

  return [ stateVal, setStateVal ]; // return the pcOfSt8 and its setter, so our components can use them

};

// when utilizing useLocalStorage elsewhere in our code, we call useLocalStorage with a storageKey and defaultVal, like so:
// const [ myReminders, setMyReminders ] = useLocalStorage("savedReminders", []);
// we rcv back ^(1)^      ^(2)^
// 1) the pcOfSt8 which should contain our savedReminders from localStorage, and a 2) state-setter
// calling this setter (setMyReminders) to set the state, should automatically update savedReminders in localStorage
