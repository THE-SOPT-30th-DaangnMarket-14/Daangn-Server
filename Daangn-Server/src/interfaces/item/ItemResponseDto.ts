import mongoose from "mongoose";

export interface ItemResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    location: string;
    price: number;
    image: string;
    likeCount: number;
    chatCount: number;
    timeBefore: string;
}