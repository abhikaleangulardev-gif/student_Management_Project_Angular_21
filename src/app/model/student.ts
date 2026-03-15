import { Gender } from "../enum/gender";
import { Address } from "./address";
import { CollegeDetail } from "./collegedetail";

export interface Student {
    firstname: string;
    middlename: string;
    lastname: string;
    fullname: string;
    image:string;
    age: number;
    email: string;
    contact: number;
    gender: Gender;
    collegeDetail: CollegeDetail;
    address: Address
}
