import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { StudentApi } from '../../shared/service/student-api';
import { Student } from '../../model/student';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  myStudentDetailsInformation: WritableSignal<Student[]> = signal<Student[]>([]);
  constructor(private studentservice: StudentApi,private router:Router,private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudentDetail();
  }

  getStudentDetail() {
    this.studentservice.getStudentDetail().subscribe({
      next: (_resp: any) => {
        // console.log(_resp);
        this.myStudentDetailsInformation.set(_resp);
        // console.log(this.myStudentDetailsInformation());
      }
    });
  }

  onDisplaySpecificStudentPageDetails(index:any,std:any){
    this.router.navigate(['/student-detail'],{
      relativeTo:this.activedRoute,
      fragment:index,
      queryParams:{
        id:std.id,
        email:std.email,
      }
    })
  }
}
