// THIS HOOK CAUSES ERRORS due to rehydration mismatch
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
// in short, NextJS react code runs twice: once on the server, and once on the client
// on the server, we DON'T have window.localStorage, so we load defaultVal into our pcOfSt8 (Next uses that pcOfSt8 to build our site**)
// but on the client, we DO have window.localStorage, so we load the localStorage array into our pcOfSt8 (** again, a 2nd time)
// this causes a MISMATCH between what the server renders, and what the client renders, which throws the warning:
// "Expected server HTML to contain a matching <div> in <div>"

// to resolve this, we take the logic from this hook and add it into a useEffect call in the page components themselves
// useEffect only runs on the CLIENT side, after build I think, so there is no mismatch


I'm building a simple "todos" reminder app with NextJS and react hooks, where the reminder data is saved into localStorage. I've built a Next/hooks app like this one before, including the part where it saves data to localStorage, but in my previous app I had useEffect running inside every stateful parent component, like in the example component below:

export default function MyComponent() {
  const [ myVal, setMyVal ] = useState(null);

  useEffect(() => {
    // pulling data from localStorage, if it exists
    let storedData = window.localStorage.getItem("myStorageKey") || "Nothing found in localStorage";
    // setting that data into state
    setMyVal(storedData);
  }, []);

  // function to update state values, would receive user input from another component
  function updateMyVal() {
    const someUserInput = "Some user input data here";
    // writing the new input data back into localStorage
    window.localStorage.setItem("myStorageKey", someUserInput);
    // and setting that new data into state
    setMyVal(someUserInput);
  }

  return (
    <div>
      { myVal }
      <button onClick={updateMyVal}>Update</button>
    </div>
  );
};


In making this new app I thought I would be "smart" and try to create a reusable custom hook that synchronizes my state with localStorage, based on this post: // https://typeofnan.dev/using-local-storage-in-react-with-your-own-custom-uselocalstorage-hook/.
The hook, and the relevant parts of the component that uses it, are shown below:

////// hooks/useLocalStorage.js:

import { useState, useEffect } from "react";

export const useLocalStorage = (storageKey, defaultVal) => {
  let stored = null; // init empty var for "stored" value
  // check if window is undefined, was receiving errors until this check was added
  if (typeof window !== 'undefined') {
    console.log("Window is defined, reading from localStorage");
    stored = window.localStorage.getItem(storageKey); // pull data from localStorage
  }
  const initial = stored ? JSON.parse(stored) : defaultVal; // if stored is not null, parse stored and save as "initial", else use the defaultVal
  const [ stateVal, setStateVal ] = useState(initial); // pass that initial val into useState

  // this hook should run to synchronize state changes with localStorage
  useEffect(() => {
    console.log(`Writing to ${storageKey} in localStorage`);
    window.localStorage.setItem(storageKey, JSON.stringify(stateVal));
  }, [stateVal, storageKey]); // run this useEffect whenever stateVal or storageKey change

  return [ stateVal, setStateVal ];

};

////// pages/reminders.js

import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Reminders() {
  const [ myReminders, setMyReminders ] = useLocalStorage("savedReminders", []);  // using the custom hook to populate state

  function renderReminderData(){
    let reminderMap = "";
    if (Array.isArray(myReminders)){
      reminderMap = myReminders.map(remObj => {
        return <Reminder key={remObj.remID} {...remObj}/>;
      });
    } else {
      reminderMap = <p>Something went wrong!</p>;
      console.log("Something went wrong!")
    }
    return reminderMap;
  }

  return (
    <div>
      <h1>All Reminders</h1>
      <div>{ renderReminderData() }</div>
    </div>
  )
};

However, with the custom hook shown above, during development I was seeing the warning "Expected server HTML to contain a matching <div> in <div>" in the console every time I refreshed localhost:3000/reminders. When researching the issue I came across this blog post:
https://www.joshwcomeau.com/react/the-perils-of-rehydration/
which explained that I was causing a mismatch between what the server was initially rendering, and what was getting rendered on the client side, because my custom hook returned different data based on whether "window" was defined or not. This seems to be a specific NextJS issue, since vanilla React doesn't render HTML on the server-side and therefore wouldn't run into this issue.

My question is, are there any work-arounds simpler than the MyComponent example I started with? It's not a big hassle to run useEffect and pull data from localStorage in each individual component, or to manually write my state values into localStorage each time a component wants to save some reminder data, but any time I'm copy/pasting a lot of code I feel like there might be a better way.
