// Dashboard component made by Roman Bukhovko 
"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import {useParams} from "next/navigation";

interface DashboardProps{
    savedGoal: string;
    totalCalories: number;
}

export default function Dashboard({savedGoal, totalCalories}: DashboardProps){
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
    }, [foodsToday])
    

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
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
        }}>
            DashBoard
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ padding: '1.25rem' }}>
                <div style={{ 
                    padding: '0.75rem', 
                    backgroundColor: '#f59e0b', 
                    color: '#fef3c7', 
                    borderTopLeftRadius: '0.5rem', 
                    borderTopRightRadius: '0.5rem' 
                }}>
                    Calories Gained Today
                </div>

                <div style={{ 
                    padding: '0.5rem', 
                    textAlign: 'center', 
                    backgroundColor: '#d1d5db', 
                    color: '#fef3c7', 
                    borderBottomLeftRadius: '0.5rem', 
                    borderBottomRightRadius: '0.5rem' 
                }}>
                    {totalCalories}
                </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
                <div style={{ 
                    padding: '0.75rem', 
                    backgroundColor: '#f59e0b', 
                    color: '#fef3c7', 
                    borderTopLeftRadius: '0.5rem', 
                    borderTopRightRadius: '0.5rem' 
                }}>
                    Daily Goal
                </div>

                <div style={{ 
                    padding: '0.5rem', 
                    textAlign: 'center', 
                    backgroundColor: '#d1d5db', 
                    color: '#fef3c7', 
                    borderBottomLeftRadius: '0.5rem', 
                    borderBottomRightRadius: '0.5rem' 
                }}>
                    {savedGoal}
                </div>
            </div>
        </div>

        <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <h2 style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                backgroundColor: '#f59e0b', 
                color: '#fef3c7', 
                borderTopLeftRadius: '0.5rem', 
                borderTopRightRadius: '0.5rem' 
            }}>
                Foods Eaten Today
            </h2>
            <div style={{ 
                padding: '0.5rem', 
                textAlign: 'center', 
                backgroundColor: '#d1d5db', 
                color: '#fef3c7', 
                borderBottomLeftRadius: '0.5rem', 
                borderBottomRightRadius: '0.5rem' 
            }}>
                <ul>
                    {foodsToday.map((food, key) => (
                        <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>{food.name}</p>
                            <p>{food.calories * food.servingSize}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div style={{ padding: '1.25rem', margin: '0.5rem' }}>
            <h2 style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                backgroundColor: '#f59e0b', 
                color: '#fef3c7', 
                borderTopLeftRadius: '0.5rem', 
                borderTopRightRadius: '0.5rem' 
            }}>
                Previous Days
            </h2>
            <div style={{ 
                padding: '0.5rem', 
                textAlign: 'center', 
                backgroundColor: '#d1d5db', 
                color: '#fef3c7', 
                borderBottomLeftRadius: '0.5rem', 
                borderBottomRightRadius: '0.5rem' 
            }}>
                <ul>
                    {previousDays.map((day, key) => (
                        <li key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>{day.date}</p>
                            <p>{day.calories}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
)
}