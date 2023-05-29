import { Relation } from "./anime";
import { DateOfBirth, Name } from "./utils";

export interface Characters {
  id: number;
  name: Name;
  image: string;
  description: string;
  gender: string;
  dateOfBirth: DateOfBirth;
  bloodType: any;
  age: string;
  height: string;
  relations: Relation[];
}
