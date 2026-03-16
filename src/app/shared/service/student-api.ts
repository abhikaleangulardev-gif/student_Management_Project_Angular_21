import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Student } from '../../model/student';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentApi {
  studentApiUrls: string = 'https://studentmanagementproject-94620-default-rtdb.firebaseio.com/student.json';

  http: HttpClient = inject(HttpClient);

  postStudentDetail(stdobj: Student) {
    return this.http.post(this.studentApiUrls, stdobj);
  }

  getStudentDetail() {
    return this.http.get(this.studentApiUrls).pipe(
      map((_resp: any) => {
        console.log(_resp);

        let modifiedStudentArray = [];

        for (let std in _resp) {
          modifiedStudentArray.push({ ..._resp[std], id: std });
        }

        return modifiedStudentArray;

      })
    )
  }
}
