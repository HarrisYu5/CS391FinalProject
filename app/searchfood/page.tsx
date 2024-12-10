//Freddie Guo: code started
"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

//Styling the container
const Container = styled.div`
    margin: 20px auto;
    max-width: 90%;
    text-align: center;
`;

//Styling for the input field
const Input = styled.input`
    padding: 10px;
    width: 70%;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
`;

//Styling for the button
const Button = styled.button`
    padding: 10px 20px;
    background-color: #2f2d2d;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: rgba(35, 34, 34, 0.84);
    }
`;

//Styling the layout for search results
const Results = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    margin-top: 20px;
`;

//Styling the layout for each food item in the search results
const Card = styled.div`
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;

    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        background-color: #f9f9f9;
    }
`;

//Styling for the weight input field
const WeightInput = styled.input`
  margin-top: 10px;
  padding: 5px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

//Styling for the Add button in each search result
const AddButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #2f2d2d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
      background-color: rgba(35, 34, 34, 0.84);
  }
`;

//Style the container for the selected foods section
const SelectedFoodsContainer = styled.div`
    margin-top: 40px;
    text-align: left;
`;

//Style the layout for each selected food item
const SelectedItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        background-color: #f9f9f9;
    }
`;

//Style the buttons for editing and deleting items
const ActionButton = styled.button`
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    margin-left: 5px;
    border: none;

    &.edit {
        background-color: rgba(255, 193, 7, 0.97);
        color: #fff;

        &:hover {
            background-color: #d9a302;
        }
    }
    
    &.delete {
        background-color: rgba(220, 54, 70, 0.99);
        color: #fff;

        &:hover {
            background-color: #c52131;
        }
    }
`;

//Style the container for the search section
const SearchComponent = styled.div`
    background-color: #FFDAB9; //rgba(234, 191, 118, 0.6);
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

//Represents the structure of a food item from the API response
interface FoodData {
    name: string;
    calories: number;
    weight: number;
    weightUnit: string;
}

//Represents the structure of a food item after being selected
interface SelectedFood {
    name: string;
    weight: number;
    calories: number;
}

export default function Search() {
    //Store the current value of the search input field
    const [food, setFood] = useState("");
    //Holds the list of food items returned from the API after a search
    const [results, setResults] = useState<FoodData[]>([]);
    //An array of food items that the user has added to their daily consumption
    const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
    //Tracks the weight input for each food item in the search results
    const [weightInputs, setWeightInputs] = useState<{ [key: number]: number }>({});
    //Store any error message (failed API call or invalid search) to display to user
    const [error, setError] = useState<string | null>(null);
    //A boolean that determines whether the SelectedFoodsContainer is visible
    const [showSelectedFoods, setShowSelectedFoods] = useState(false);
    //A boolean that determines whether the Search Button is click
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    //Loads previously selected foods from localStorage
    useEffect(() => {
        const storedFoods = localStorage.getItem("selectedFoods");
        if (storedFoods) {
            setSelectedFoods(JSON.parse(storedFoods));
        }
    }, []);

    //Saves the selectedFoods state to localStorage whenever it changes.
    useEffect(() => {
        localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
    }, [selectedFoods]);


    //Fetches food data from the API based on the input
    const handleSearch = () => {
        if (!food) return;

        setIsSearchClicked(true);
        setError(null);
        fetch(`/api/food?query=${food}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setResults([]);
                } else {
                    setResults(data);
                }
            })
            .catch(() => {
                setError("Failed to fetch food data.");
                setResults([]);
            });
    };

    //Adds a food item to the selectedFoods list with its calculated calories based on the entered weight
    const handleAddFood = (item: FoodData, index: number) => {
        const weight = weightInputs[index] || 0;
        if (weight > 0) {
            const calories = (weight / item.weight) * item.calories;
            setSelectedFoods((prev) => [...prev, { name: item.name, weight, calories }]);
            setShowSelectedFoods(true);
        } else {
            alert("Please enter a valid weight.");
        }
    };

    //Updates the weightInputs state when the user types a weight for a food item
    const handleWeightInputChange = (index: number, value: string) => {
        const parsedWeight = parseFloat(value) || 0;
        setWeightInputs((prev) => ({ ...prev, [index]: parsedWeight }));
    };

    //Allows the user to update the weight of an already added food
    const handleEditFood = (index: number) => {
        const weightInput = prompt("Enter new weight:");
        const weight = parseFloat(weightInput || "0");

        if (weight > 0) {
            const updatedFoods = [...selectedFoods];
            const currentFood = updatedFoods[index];

            currentFood.calories = (weight / currentFood.weight) * currentFood.calories;
            currentFood.weight = weight;

            setSelectedFoods(updatedFoods);
        } else {
            alert("Invalid weight entered.");
        }
    };

    //Remove a food item from the selectedFoods list
    const handleDeleteFood = (index: number) => {
        const updatedFoods = [...selectedFoods];
        updatedFoods.splice(index, 1);
        setSelectedFoods(updatedFoods);

        if (updatedFoods.length === 0) {
            setShowSelectedFoods(false);
        }
    };

    //Calculate the total calories of all selected foods
    let totalCalories = 0;
    for (let i = 0; i < selectedFoods.length; i++) {
        totalCalories += selectedFoods[i].calories;
    }


    return (
        <Container>

            {/* Search Section */}
            <SearchComponent>
                <h2>Search for Food</h2>
                <div>
                    {/* Input field for search for food item */}
                    <Input
                        type="text"
                        placeholder="Enter food name (e.g., apple, beef)"
                        value={food}
                        onChange={(e) => setFood(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>
                {/* Display error message if any */}
                {error && <p style={{color: "red"}}>{error}</p>}

                {isSearchClicked && results.length > 0 && <h2>Select a Food</h2>}

                {/* Display search results */}
                <Results>
                    {results.map((item, index) => (
                        <Card key={index}>

                            {/* Food item info */}
                            <h3>{item.name}</h3>
                            <p>{item.calories} calories</p>
                            <p>Serving Size: {item.weight} {item.weightUnit}</p>

                            {/* Weight input and Add button */}
                            <WeightInput
                                type="number"
                                placeholder={`Enter weight (${item.weightUnit})`}
                                value={weightInputs[index] || ""}
                                onChange={(e) => handleWeightInputChange(index, e.target.value)}
                            />
                            <AddButton onClick={() => handleAddFood(item, index)}>Add</AddButton>

                        </Card>
                    ))}
                </Results>
            </SearchComponent>

            {/* Selected Foods Section */}
            {showSelectedFoods && (
                <SearchComponent>
                    <SelectedFoodsContainer>
                        <h3>Your List of Food</h3>
                        {selectedFoods.map((food, index) => (
                            <SelectedItem key={index}>
                                {/* Display selected food */}
                                <div>
                                    <p><strong>{food.name}</strong></p>
                                    <p>Weight: {food.weight}g</p>
                                    <p>Calories: {food.calories.toFixed(2)} kcal</p>
                                </div>
                                {/* Edit and Delete buttons */}
                                <div>
                                    <ActionButton className="edit" onClick={() => handleEditFood(index)}>
                                        Edit
                                    </ActionButton>
                                    <ActionButton className="delete" onClick={() => handleDeleteFood(index)}>
                                        Delete
                                    </ActionButton>
                                </div>
                            </SelectedItem>
                        ))}
                        {/* Display total calories */}
                        <h3>Total Calories: {totalCalories.toFixed(2)} kcal</h3>
                    </SelectedFoodsContainer>
                </SearchComponent>
            )}

        </Container>
    );
}
//Freddie Guo: code ended