export interface ItemCreateDto {
    title: string;
    price: number;
    contents: string;
    imageList: Array<File>;
}