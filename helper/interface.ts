import { ImageSourcePropType } from "react-native";
interface User{
  _id:string;
  name:string;
  email:string;
  password:string;
  phoneNumber:string;
  point:number;
  created_at:Date;
}
interface Comic{
  _id:string
  title:string;
  author: string;
  cover:string;
  synopsis:string;
  rate: number;
  totalChapter:number;
  create_at:Date;
}
interface Chapter{
  _id:string;
  komik_id:string;
  chapter_num:number;
  create_at:Date;
  link:string;
  price:number;
  published_at:Date;
}
interface Comment{
  user_id:string;
  komik_id:string;
  comment:string;
  name:string;
  createdAt:Date;
}
interface DataProps {
  id:number;
  title: string;
  author: string;
  ch: number;
  image: ImageSourcePropType;
  synopsis: string;
  rate: number;
  genre: string[];
  read: ImageSourcePropType[];
}
interface TopCardProps {
  top: number;
  title: string;
  author: string;
  image: ImageSourcePropType;
}
export {DataProps,TopCardProps,User,Comic,Chapter,Comment}