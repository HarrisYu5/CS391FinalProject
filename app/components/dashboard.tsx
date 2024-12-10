// Dashboard component made by Roman Bukhovko 
"use client";
import { Container } from "postcss";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface DashboardProps{
    savedGoal: string;
    totalCalories: number;
}

const Wrapper = styled.div`
    height: 100vh;
    background-color: white;
`;

const Title = styled.h1`
    font-weight: bold;
    padding: 5px;
    margin: 5px;
    text-align: center;
    font-size: 30px;
    height: 35px;
    background-color: #ffd5b9;
    color: #fef3c7;
    border-radius: 10px;
`

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly; 
`

const Card = styled.div`
    padding: 20px;
`

const CardTitle = styled.div`
    padding: 10px; 
    background-color: #ffd5b9;
    color: #fef3c7;
    border-top-left-radius: 10px; 
    border-top-right-radius: 10px; 
`

const CardBody = styled.div`
    padding: 10px; 
    text-align: center;
    background-color: gray;
    color: #fef3c7;
    border-bottom-left-radius: 10px; 
    border-bottom-right-radius: 10px; 
`

const Section = styled.div`
    padding: 10px;
    margin: 5px;
`

const SectionTitle = styled.h2`
    padding: 10px;
    text-align: center;
    background-color: #ffd5b9;
    color: #fef3c7;
    border-top-left-radius: 10px; 
    border-top-right-radius: 10px; 
`

const SectionBody = styled.div`
    text-align: center;
    background-color: gray;
    color: #fef3c7;
    border-bottom-left-radius: 10px; 
    border-bottom-right-radius: 10px;
`

const ListItem = styled.li`
    display: flex;
    justify-content: space-evenly;
`

export default function Dashboard({savedGoal, totalCalories}: DashboardProps){
    //Calories of food eaten today
    const [cal, setCal] = useState(0);
    //Daily goal 
    const [goal, setGoal] = useState(0);

    //Example data for food eaten today
    const [foodsToday, setFoodsToday] = useState([
        {name: "Apple", calories: 95, servingSize: 2},
        {name: "Chicken", calories: 200, servingSize: 1}
    ]);

    //Example data for previous days and the calories consumed that day
    const [previousDays, setPreviousDays] = useState([
        {date: '2024-12-05', calories: 1800},
        {date: '2024-12-04', calories: 2000},
        {date: '2024-12-03', calories: 1750}
    ]);

    useEffect(() => {
        //Calculates how many calories were consumed today
        const cal = foodsToday.reduce((total, food) => total + food.calories * food.servingSize, 0);
        setCal(cal);
        setGoal(savedGoal);
    }, [foodsToday])
    
    return (
        //Title Dashboard
        <Wrapper>
            <Title>DashBoard</Title>

            <FlexContainer /*Shows the Calories that have been gained today and were calculated from the useEffect*/>
                <Card>
                    <CardTitle>
                        Calories Gained Today 
                    </CardTitle>

                    <CardBody>
                        {totalCalories}
                    </CardBody>
                </Card>

                <Card /*The Daily Goal*/>
                    <CardTitle>
                        Daily Goal 
                    </CardTitle>

                    <CardBody>
                        {savedGoal}
                    </CardBody>
                </Card>
            </FlexContainer>

            <Section /*All the foods that were eaten today*/>
                <SectionTitle>Foods Eaten Today</SectionTitle>
                <SectionBody>
                    <ul>
                        {foodsToday.map((food, key) =>
                            <ListItem key={key}>
                                <p>{food.name}</p>
                                <p>{food.calories * food.servingSize}</p>
                            </ListItem>
                        )}
                    </ul>
                </SectionBody>
            </Section>

            <Section /*The previous dates and the calories consumed during those days*/> 
                <SectionTitle>Previous Days</SectionTitle>
                <SectionBody>
                    <ul>
                        {previousDays.map((day, key) =>
                            <ListItem key={key}>
                                <p>{day.date}</p>
                                <p>{day.calories}</p>
                            </ListItem>
                        )}
                    </ul>
                </SectionBody>
            </Section>
        </Wrapper>
    )
}