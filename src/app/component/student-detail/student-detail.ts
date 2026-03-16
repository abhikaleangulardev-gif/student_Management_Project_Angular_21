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
  myStudentDetailsInformation: WritableSignal<Student[]> = signal<Student[]>([]);

  constructor(private studentservice: StudentApi, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.fragment.subscribe((_resp: any) => {
      console.log(_resp);
    });

   
  }


}
