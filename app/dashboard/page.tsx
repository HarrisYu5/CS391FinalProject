"use client"
import { useState, useEffect } from "react";
import Dashboard from "../components/dashboard";

export default function DashboardPage(){
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

    return(
        <Dashboard savedGoal={savedGoal} totalCalories={totalCal}/>
    )
}