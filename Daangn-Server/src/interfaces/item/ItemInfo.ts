import mongoose from 'mongoose';

export interface ItemInfo {
  like_id: mongoose.Types.ObjectId | string,
  chat_id: mongoose.Types.ObjectId | string,
  title: string,
  location: string,
  price: number,
  image_list: string[],
  content: string
  
  //image 파일 받기
  link: string;
  fileName: string;
}
