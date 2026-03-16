import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentApi } from '../../shared/service/student-api';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit {
  myStudentDetailsList: WritableSignal<any> = signal({});
  mystdId:any;

  constructor(private studentservice: StudentApi, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activedRoute.queryParams.subscribe((resp:any)=>{
      console.log(resp);
      this.mystdId = resp.id;
    })
    this.getStudentList();
  }

  getStudentList(){
     this.studentservice.getStudentDetail().subscribe((resp:any)=>{
      const specificstudentDetail = resp.find((std:any) =>std.id === this.mystdId);
      console.log('specificstudentDetail >>>>',specificstudentDetail);
      this.myStudentDetailsList.set(specificstudentDetail);
    })
  }


}
