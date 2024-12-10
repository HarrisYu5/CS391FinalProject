//Freddie Guo: code started
//Handle the API request in a server-side route to keep the API key secure
import { NextRequest, NextResponse } from "next/server";

//Fetch the USDA API key
//const USDA_API_KEY = process.env.USDA_API_KEY;
//I can store the API key in the local environment to enhance security
// by keeping the key separate from the source code, ensuring it won't
// get exposed if I share my code or push it to a public repository.
const USDA_API_KEY = "2CSDwVdmp7R8GdAdfojKE8LJz9X2NsuJjkPPwNoF";

//Define types for data
interface FoodNutrient {
    nutrientName: string;
    value: number;
}

//Define types for data
interface Food {
    description: string;
    foodNutrients: FoodNutrient[];
    servingSize?: number;
    servingSizeUnit?: string;
}

export async function GET(req: NextRequest) {
    //Extract query from the request URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    //Return an error if the query is missing
    if (!query) {
        return new Response(
            JSON.stringify({ error: "Query parameter is required" }),
            { status: 400 }
        );
    }

    //Make a request to the USDA API to search for foods matching the query
    try {
        const res = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=10&api_key=${USDA_API_KEY}`
        );

        //If the API response is not successful, return an error
        if (!res.ok) {
            return new Response(
                JSON.stringify({ error: `API responded with status ${res.status}` }),
                { status: res.status }
            );
        }

        //JSON response from the USDA API
        const data = await res.json();

        //If no item is found, return "Not Found" error response
        if (!data.foods || data.foods.length === 0) {
            return new Response(
                JSON.stringify({ error: "No food items found" }),
                { status: 404 }
            );
        }

        //Otherwise, get the info we need from the API response
        const results = data.foods.map((food: Food) => ({
            name: food.description,
            calories:
                food.foodNutrients?.find(
                    (nutrient) => nutrient.nutrientName === "Energy"
                )?.value || "N/A",
            weight: food.servingSize || "N/A",
            weightUnit: food.servingSizeUnit || "",
        }));

        //Return the processed results as a JSON response
        return NextResponse.json(results);

    //Handle any errors occur during the API request
    } catch (error) {
        console.error("Error fetching food data:", error.message);
        return new Response(
            JSON.stringify({ error: "Failed to fetch food data" }),
            { status: 500 }
        );
    }
}
//Freddie Guo: code ended