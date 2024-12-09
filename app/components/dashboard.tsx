"use client"
/** Dashboard component made by Roman Bukhovko */
import { useState, useEffect } from "react";

export default function Dashboard(){
    const [cal, setCal] = useState(0);
    const [goal, setGoal] = useState(0);

    const [foodsToday, setFoodsToday] = useState([
        {name: "Apple", calories: 95, servingSize: 2},
        {name: "Sandwich", calories: 200, servingSize: 1}
    ]);

    const [previousDays, setPreviousDays] = useState([
        {date: '2024-12-05', calories: 1800},
        {date: '2024-12-04', calories: 2000},
        {date: '2024-12-03', calories: 1750}
    ]);

    useEffect(() => {
        const calToday = foodsToday.reduce((total, food) => total + food.calories * food.servingSize, 0)
        setCal(calToday);
        setGoal(2000);
    })
    

    return (
        <div className="min-h-screen bg-white">
            <h1 className="font-bold p-5 m-5 text-center text-4xl h-20 bg-amber-500 text-amber-100 rounded-lg">DashBoard</h1>

            <div className="flex items-center justify-evenly">
                <div className="p-5">
                    <div className="p-3 bg-amber-500 text-amber-100 rounded-t-lg">
                        Calories Gained Today 
                    </div>

                    <div className="p-2 text-center bg-gray-300 text-amber-100 rounded-b-lg">
                        {cal}
                    </div>
                </div>

                <div className="p-5">
                    <div className="p-3 bg-amber-500 text-amber-100 rounded-t-lg">
                        Daily Goal 
                    </div>

                    <div className="p-2 text-center bg-gray-300 text-amber-100 rounded-b-lg">
                        {goal}
                    </div>
                </div>
            </div>

            <div className="p-5 m-2">
                <h2 className="p-3 text-center bg-amber-500 text-amber-100 rounded-t-lg">Foods Eaten Today</h2>
                <div className="p-2 text-center bg-gray-300 text-amber-100 rounded-b-lg">
                    {foodsToday.map((food) =>
                        <li className="flex justify-between">
                            <p>{food.name}</p>
                            <p>{food.calories * food.servingSize}</p>
                        </li>
                    )}
                </div>
            </div>

            <div className="p-5 m-2">
                <h2 className="p-3 text-center bg-amber-500 text-amber-100 rounded-t-lg">Previous Days</h2>
                <div className="p-2 text-center bg-gray-300 text-amber-100 rounded-b-lg">
                    {previousDays.map((day) =>
                        <li className="flex justify-between">
                            <p>{day.date}</p>
                            <p>{day.calories}</p>
                        </li>
                    )}
                </div>
            </div>
            
        </div>
    )
}