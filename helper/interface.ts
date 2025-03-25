import { ImageSourcePropType } from "react-native";

interface DataProps {
    id:number;
  title: string;
  author: string;
  ch: number;
  image: ImageSourcePropType;
  synopsis: string;
  rate: number;
  genre: string[];
}
interface TopCardProps {
  top: number;
  title: string;
  author: string;
  image: ImageSourcePropType;
}
export {DataProps,TopCardProps}