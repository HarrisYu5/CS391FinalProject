//Dashboard page made by Roman Bukhovko
"use client"
import { useState, useEffect } from "react";
import Dashboard from "../components/dashboard";

export default function DashboardPage(){
    const [savedGoal, setSavedGoal] = useState(""); 
    const [dailyCalories, setDailyCalories] = useState<number[]>([]); 

    const totalCal = dailyCalories.reduce((total, calorie) => total + calorie, 0);

    return(
        <Dashboard savedGoal={savedGoal} totalCalories={totalCal}/>
    )
}
