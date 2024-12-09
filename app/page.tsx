"use client";

//page.tsx/ Input Calories component- Lilly Anestal was responsible for all the code in this page
// our team was to use tailwind for CSS-in-JS styled but. I had to use inline styling because for some reason tailwind was not working and I was unable to install styled components.

import React, { useState } from "react";
//import Dashboard from "../components/Dashboard";

export default function Home() {
  const [dailyGoal, setDailyGoal] = useState(""); // input daily goal
  const [savedGoal, setSavedGoal] = useState(""); // store daily goal
  const [foodCalorie, setFoodCalorie] = useState(""); // input for food item calories
  const [dailyCalories, setDailyCalories] = useState<number[]>([]); // store every input the user makes in that day

// function to save the daily goal would be displayed on the dashboard page
  const saveDailyGoal = () => {
    if (dailyGoal) { // if a goal was inputted
      setSavedGoal(dailyGoal);
      setDailyGoal(""); // clear the input after saving
    }
  };
// function to periodically calculate the total calories a user consumed
  const totalCal = dailyCalories.reduce((total, calorie) => total + calorie, 0);

  const calorieTotal = () => {
    if (foodCalorie) {
      setDailyCalories((prev) => [...prev, Number(foodCalorie)]); // Add calorie to the list of entries inputted each day
      setFoodCalorie(""); // clear the input field
    }
  };

  return (
<div
  // Style the entire page with a pale orange background and center content vertically and horizontally
  style={{
    backgroundColor: "#FFDAB9", // Pale orange background
    height: "100vh", 
    display: "flex", // Flexbox layout
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center items horizontally
    padding: "20px", 
  }}
>
  <h1
    // Style the main header with white text and monospace font
    style={{
      fontSize: "2.5rem", 
      fontFamily: "monospace", 
      color: "white", 
      marginBottom: "20px", // Add space below the header
    }}
  >
    Welcome to Your Personal Calorie Counter
  </h1>

  {/* Section to Input and Save Daily Goal */}
  <div
    // Style the daily goal input section as a card
    style={{
      backgroundColor: "white", // White card background
      padding: "20px", // Padding inside the card
      borderRadius: "12px", // Rounded corners
      width: "100%", // Full width of parent
      maxWidth: "400px", // Maximum width for responsiveness
      marginBottom: "20px", 
    }}
  >
    <p style={{ marginBottom: "10px" }}>
      Input your daily calorie goal below:
    </p>

    <input
      // Input for users to specify their daily calorie goal
      type="number" // Numeric input type
      value={dailyGoal} 
      onChange={(e) => setDailyGoal(e.target.value)} // Update state on change
      placeholder="Your Daily Goal" 

      style={{
        width: "80%", // Input width as 80% of parent
        padding: "10px", 
        marginBottom: "15px", // Space below the input
        border: "1px solid black", // Light black border
        borderRadius: "8px", // Rounded corners
        fontFamily: "monospace", 
        fontSize: "1rem", 
        color: "black", 
      }}
    />

    <button
      // Button to save the daily goal

      onClick={saveDailyGoal} //  save logic on click

      style={{
        width: "100%", // Button spans the full width of parent
        padding: "10px", 
        border: "none", 
        borderRadius: "8px", 
        backgroundColor: "white", 
        color: "black", 
        fontFamily: "monospace", // Monospace font style
        fontSize: "1rem", 
        cursor: "pointer", // Pointer cursor on hover
        transition: "background-color 0.3s", // smooth transition for hover effect
      }}
      // Change button color on hover
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFA726")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
    >
      Save Goal
    </button>

    {/* Display the saved daily goal */}
    {savedGoal && (
      <p
        style={{
          color: "black", // Black text
          fontFamily: "monospace", // Monospace font style
          marginTop: "10px", // Space above the message
        }}
      >
        Your Daily Goal is: {savedGoal} Calories.
      </p>
    )}
  </div>

  {/* Section to Input Food Item Calories */}
  <div
    // Style the calorie entry section as a card
    style={{
      backgroundColor: "white", // White card background
      padding: "20px", 
      borderRadius: "12px", 
      width: "100%", 
      maxWidth: "400px", // Maximum width for responsiveness
    }}
  >
    <p style={{ marginBottom: "10px" }}>Input your calories below:</p>
    <h1
      // Style the section header
      style={{
        fontSize: "2rem", // Large font size
        fontFamily: "monospace", 
        color: "white", 
        marginBottom: "20px", 
      }}
    >
      Enter Calories
    </h1>

    <input
      // Input for users to specify food calories
      type="number" // Numeric input type
      value={foodCalorie} //
      onChange={(e) => setFoodCalorie(e.target.value)} // Update state on change
      placeholder="Enter Calories" // Placeholder text

      style={{
        width: "80%", // Input width as 80% of parent
        padding: "10px", 
        marginBottom: "15px", 
        border: "1px solid black", 
        borderRadius: "8px", // Rounded corners
        fontFamily: "monospace", 
        fontSize: "1rem", // Standard font size
        color: "black", // Dark text color
      }}
    />

    <button
      // Button to add the calorie entry
      onClick={() => {
        if (Number(foodCalorie) + totalCal > Number(savedGoal)) {
          // Alert if calorie total exceeds goal
          alert("Warning: This entry will exceed your daily calorie goal!");
        }
        calorieTotal(); // Add the entry
      }}
      style={{
        width: "100%", // Button spans the full width of parent
        padding: "10px", 
        border: "none", 
        borderRadius: "8px", 
        backgroundColor: "white", 
        color: "black", 
        fontFamily: "monospace", 
        fontSize: "1rem", 
        cursor: "pointer", // Pointer cursor on hover
        transition: "background-color 0.3s", // Smooth transition for hover effect
      }}
      // Change button color on hover
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFA726")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
    >
      Add Calories
    </button>

  {/*Handle the user's input */}
    {foodCalorie && (
      <p
        style={{
          color: "black", // Black text
          fontFamily: "monospace", // Monospace font style
          marginTop: "10px", // Space above the message
        }}
      >
        Your Input is: {foodCalorie}
      </p>
    )}

    {/* Display warning message if total calories exceed the goal */}
    {Number(foodCalorie) + totalCal > Number(savedGoal) && (
      <p
        style={{
          color: "red", // Red text for warning
          fontWeight: "bold", // Bold text
          marginTop: "10px", // Space above the warning
        }}
      >
        Warning: This entry exceeds your daily goal!
      </p>
    )}
  </div>

  {/* Display the daily goal and total calories consumed so far to the Dashboard component*/}
{/* Pass the total calories and daily goal as props to the dashboard component */ }
 { /*<Dashboard savedGoal={savedGoal} totalCalories={totalCal} > */}/

</div>
  );
}