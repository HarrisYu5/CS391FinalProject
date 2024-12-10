// Code by Derinell Rojas

"use client"
import Link from "next/link";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border: 1px solid #fef3c7;
  background-color: transparent; 
`;

const Title = styled(Link)`
  font-family: monospace;
  font-size: 1.7rem;
  font-weight: bold;
  color: #FFDAB9; 
  text-decoration: none;

  &:hover {
    color: #f59e0b; 
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  border: 2px solid #FFDAB9; 
  color: #FFDAB9; 
  font-size: 1.125rem; 
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f97316; 
    color: #fff; 
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Title href="/">Calorie Counter</Title>
      <NavLinks>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/">Search Food</NavLink>
        <NavLink href="/loading">Input Calories</NavLink>
        <NavLink href="/profile">Profile</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
}

// Code by Derinell Rojas