import { getAuth  } from "@clerk/nextjs/server";
import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import { use } from "react";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        
        const { userId } = getAuth(request); 

        const { cartData } = await request.json();

        await connectDB();
        const user = await User.findById(userId);

        user.cartItems = cartData;
        user.save();

        return NextResponse.json({ succes: true });

    } catch (error) {
        return NextResponse.json({succes: false, message: error.message});
    }
}