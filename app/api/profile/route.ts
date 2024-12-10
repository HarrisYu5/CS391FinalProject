// Harris Yu hy002421@bu.edu
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { json } from "stream/consumers";


const dbPath = path.join(process.cwd(), "db.json"); //Get the path to db.json. process.cwd() returns the current working directory

export async function GET(req: NextRequest) { 
    const data = JSON.parse(await fs.readFile(dbPath, "utf-8")); //read the JSON file and parse it
    return NextResponse.json(data.User);
}



export async function POST(request: Request) {
    const updatedData = await request.json();
    const data = JSON.parse(await fs.readFile(dbPath, "utf-8")); // read the JSON file and parse it

    data.User = //update the User Property

    {
        ...data.User,
        ...updatedData,
    };

    await fs.writeFile(dbPath, JSON.stringify(data, null,1)); //write the updated data back to db.json. 1 is for indentation in db.json
    return NextResponse.json(data.User);


}
