import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',redirectTo:'student-form',pathMatch:'full'},
    {path:'student-form',loadComponent:()=> import('./component/student-form/student-form').then(c=>c.StudentForm)},
    {path:'student-list',loadComponent:()=> import('./component/student-list/student-list').then(c=>c.StudentList)},
    {path:'student-detail',loadComponent:()=> import('./component/student-detail/student-detail').then(c=>c.StudentDetail)},
];
