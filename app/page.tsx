
//LILLY ANESTAL WAS RESPONSIBLE FOR THE ALLL THE CODE IN THIS COMPONENT

"use client";



import React, { useState } from "react";
import styled from "styled-components";
//import Dashboard from "./components/dashboard";
//import Header from "./components/header"


// my components for styling the entire page
const PageContainer = styled.div`
  background-color: #ffd5b9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
// styling for the title of the page
const Header = styled.h1`
  font-size: 2.5rem;
  font-family: monospace;
  color: white;
  margin-bottom: 20px;
`;
// styling for each of the cards that is meant for the users to input their calories and daily goal
const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;
// styling for when a user inputs a calorie
const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid black;
  border-radius: 8px;
  font-family: monospace;
  font-size: 1rem;
  color: black;
`;
// styling for the buttons
const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: black;
  font-family: monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffa726;
  }
`;
// stying for the paragraph tag texts
const Text = styled.p`
  color: black;
  font-family: monospace;
  margin-top: 10px;
`;
//styling for the warning text when a user exceed their goal
const WarningText = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

export default function Home() {
  const [dailyGoal, setDailyGoal] = useState(""); // input daily goal
  const [savedGoal, setSavedGoal] = useState(""); // store daily goal
  const [foodCalorie, setFoodCalorie] = useState(""); // input for food item calories
  const [dailyCalories, setDailyCalories] = useState<number[]>([]); // store every input the user makes in that day

  // Save the daily goal
  const saveDailyGoal = () => {
    if (dailyGoal) {
      setSavedGoal(dailyGoal);
      setDailyGoal("");
    }
  };

  // Calculate the total calories so far
  const totalCal = dailyCalories.reduce((total, calorie) => total + calorie, 0);

  // Add calorie entry to the list
  const calorieTotal = () => {
    if (foodCalorie) {
      setDailyCalories((prev) => [...prev, Number(foodCalorie)]);
      setFoodCalorie("");
    }
  };

  return (
    <PageContainer>
      <Header>Welcome to Your Personal Calorie Counter</Header>

      {/* section to input and save Daily Goal */}
      <Card>
        <Text>Input your daily calorie goal below:</Text>
        <Input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          placeholder="Your Daily Goal"
        />
        <Button onClick={saveDailyGoal}>Save Goal</Button>
        {savedGoal && <Text>Your Daily Goal is: {savedGoal} Calories.</Text>}
      </Card>

      {/* section to input Food Item Calories */}
      <Card>
        <Text>Input your calories below</Text>
        <Header style={{ fontSize: "2rem", color: "white" }}>Enter Calories</Header>
        <Input
          type="number"
          value={foodCalorie}
          onChange={(e) => setFoodCalorie(e.target.value)}
          placeholder="Enter Calories"
        />
        <Button
          onClick={() => {
            if (Number(foodCalorie) + totalCal > Number(savedGoal)) {
              alert("Warning: This entry will exceed your daily calorie goal!");
            }
            calorieTotal();
          }}
        >
          Add Calories
        </Button>

        {/* Display the user's input */}
        {foodCalorie && <Text>Your Input is: {foodCalorie}</Text>}

        {/* Warning message if total calories exceed the goal */}
        {Number(foodCalorie) + totalCal > Number(savedGoal) && (
          <WarningText>Warning: This entry exceeds your daily goal!</WarningText>
        )}
      </Card>
    </PageContainer>
  );
}
