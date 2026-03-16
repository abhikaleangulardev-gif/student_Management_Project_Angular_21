import { Component, OnInit } from '@angular/core';
import { StudentApi } from '../../shared/service/student-api';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit{
  constructor(private studentservice:StudentApi){}

  ngOnInit(): void {
    this.getStudentDetail();
  }

  getStudentDetail(){
    this.studentservice.getStudentDetail().subscribe({
      next:(_resp:any)=>{
        console.log(_resp);
      }
    })
  }
}
