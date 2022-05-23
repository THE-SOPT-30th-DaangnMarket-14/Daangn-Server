import mongoose from 'mongoose';

export interface ItemCreateDto {
  title: string,
  location: string,
  price: number,
  image_list: string[],
  content: string,
  created_at: Date
}
