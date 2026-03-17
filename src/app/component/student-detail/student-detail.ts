import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentApi } from '../../shared/service/student-api';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule,],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit {
  myStudentDetailsList: WritableSignal<any> = signal({});
  mystdId:any;

  constructor(private studentservice: StudentApi, private activedRoute: ActivatedRoute,private router:Router) { }

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


  onNavigateStudentForm(student:any){
    console.log(student);
    this.router.navigate(['/student-form'],{
      relativeTo:this.activedRoute,
      state:{
        studentDetail:student,
      }
    })
  }

}
