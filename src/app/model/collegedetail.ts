import { CollegeYear } from "../enum/collegeyear";

export interface CollegeDetail {
    collegename: string;
    collegeDepartment: string;
    admissionDate: Date;
    collegeCurrentYear: CollegeYear;
    percentage: number;
    isActive: boolean;
    skills: string[];
}
