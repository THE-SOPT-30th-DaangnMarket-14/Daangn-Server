import mongoose from "mongoose";

export interface PostBaseResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    //이미지 업로드
    link: string;
}
