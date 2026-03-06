"use server";

import { ObjectId } from "mongodb";

const { dbConnect, collections } = require("@/lib/dbConnect")

export const getCake = async () => {
    const cakesData = await dbConnect(collections.cakes).find().toArray();
    // Stringify Objectids for client components
    return cakesData.map(cake => ({...cake, _id: cake._id.toString()}));
}

export const getSingleCake = async (id) => {
    if(!id || id.length !== 24){
        return null;
    }
    const query = {_id: new ObjectId(id)};
    const cakeData = await dbConnect(collections.cakes).findOne(query);
    if (!cakeData) return null;
    return {...cakeData, _id: cakeData._id.toString()};
}