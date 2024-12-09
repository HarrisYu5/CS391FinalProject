"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  font-family: monospace;
  background-color: #FFDAB9; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem; 
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem; 
`;

const Spinner = styled.div`
  margin-top: 1.5rem; 
  width: 3rem; 
  height: 3rem; 
  border: 0.25rem solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Quote = styled.p`
  padding-top: 1rem;
  margin-top: 1rem; 
  font-size: 0.5rem; 
  font-style: italic;
  text-align: center;
`;

// Loading Component
const Loading = () => {
  const [quote, setQuote] = useState(" ");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(
          "https://675707e1c0a427baf94b6fe9.mockapi.io/food/foodfacts"
        );
        const data = await res.json();
        setQuote(data[0].text);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Oops!");
      }
    };
    fetchQuote();
  }, []); // Dependency array to avoid infinite fetching

  return (
    <Container>
      <Image
        src="/calc.svg"
        alt="an orange calc icon"
        width={100}
        height={100}
      />
      <Title>Calorie Counter</Title>
      <Subtitle>Count your daily calorie intake!</Subtitle>
      <Spinner />
      <Quote>" {quote} "</Quote>
    </Container>
  );
};

export default Loading;
