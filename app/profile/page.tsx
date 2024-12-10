//Completed by Harris Yu hy002421@bu.edu
"use strict";
"use client"; // Client side component
import {useState, useEffect} from "react";

export default function ProfilePage(){
    const [profile, setProfile] = useState<{name: string, age: number, weight: number, height: number, sex: string}>({name: "", age: 0, weight: 0, height: 0, sex: ""});
    //initialize with empty values

    // define the state for each input field
    const [nameInput, setNameInput] = useState("");
    const [weightInput, setWeightInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [heightInput, setHeightInput] = useState("");
    const [sexInput, setSexInput] = useState("");


    async function fetchData() {
        const res = await fetch("/api/profile"); //send a get request to the api
        const data = await res.json(); //parse data from the response

        
        setProfile(data);
        setNameInput(data.name);
        //convert them into strings to display them in the input fields. I had weird bugs when I tried to display them as numbers.
        setAgeInput(String(data.age));
        setWeightInput(String(data.weight));
        setHeightInput(String(data.height));
        setSexInput(data.sex);

    }

    
    useEffect(() => {
        fetchData(); // call fetchData once
    }, []);

    

    const handleUpdateField = async (field: string, value: string) => { //update each field


        //fix the issue with the number fields. Instead of age 030 now it shows just 30
        //--------------
        const numberFields = ["age", "weight", "height"]; //if they're orignally numbers, convert them to numbers from strings
        let bodyvalue;
        if (numberFields.includes(field)) {
            bodyvalue = Number(value);
        }
        else {
            bodyvalue = value; //string is string, no need to convert
        }
        //--------------

        await fetch("/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",},
            body: JSON.stringify({ [field]: bodyvalue }), //update the field with the new value
        });
        await fetchData(); // refresh the page to reflect the changes

    }

    function calculateBMR(weight: number, height: number, sex: string, age: number) {
        //source for the formula https://www.verywellfit.com/how-many-calories-do-i-need-each-day-2506873
        if (sex === "female") {
            return 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        } else if (sex === "male") {
            return 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
        } else {
            return (655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age) + 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)) / 2; //return the average if sex is not binary.
        }
    }

    const dailyCalories = calculateBMR(profile.weight, profile.height, profile.sex, profile.age) * 1.2; // 1.2 is the activity level for idle. use it for simplicity sake. 

    return (
        <div>
          <h1 style={{ 
            fontWeight: 'bold', 
            padding: '1.25rem', 
            margin: '1.25rem', 
            textAlign: 'center', 
            fontSize: '2.25rem', 
            height: '5rem', 
            backgroundColor: '#f59e0b', 
            color: '#fef3c7', 
            borderRadius: '0.5rem' 
        }} >Profile</h1>
          
          <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <span>Name:</span>
            <input 
              value={nameInput}
              style={{ marginRight: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <button
              onClick={() => handleUpdateField('name', nameInput)}
            >
              Update
            </button>
          </div>

          <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <span>Weight (kg):</span>
            <input
              type="number"
              style={{ marginRight: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
            />
            <button
              onClick={() => handleUpdateField('weight', weightInput.toString())}
            >
              Update
            </button>
          </div>

          <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <span>Age:</span>
            <input
              type="number"
              style={{ marginRight: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
            />
            <button
              onClick={() => handleUpdateField('age', ageInput.toString())}
            >
              Update
            </button>
          </div>

          <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <span>Height (cm):</span>
            <input
              type="number"
              style={{ marginRight: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
              value={heightInput}
              onChange={(e) => setHeightInput((e.target.value))}
            />
            <button
              onClick={() => handleUpdateField('height', heightInput.toString())}
            >
              Update
            </button>
          </div>

          <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <span>Sex (male or female):</span>
            <input
              value={sexInput}
              style={{ marginRight: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
              onChange={(e) => setSexInput(e.target.value)}
            />
            <button
              onClick={() => handleUpdateField('sex', sexInput)}
            >
              Update
            </button>
          </div>
          <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <span>Daily Calories Base Consumption:</span> {Math.round(dailyCalories)}
          </div>
        </div>
    );
}

    

