import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender } from '../../enum/gender';
import { Student } from '../../model/student';

// custom directive import
import { Focus } from '../../shared/directive/focus';

// angular material module
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CollegeYear } from '../../enum/collegeyear';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule,Focus],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  myStudentForm!: FormGroup;
  myTabStudentLabel: WritableSignal<string[]> = signal(['Person Detail', 'College Detail', 'Address Detail']);


  myGender: WritableSignal<string[]> = signal([Gender.Male, Gender.Female, Gender.Other]);
  myCollegeYears: WritableSignal<string[]> = signal([CollegeYear.FirstYear, CollegeYear.SecondYear, CollegeYear.ThirdYear, CollegeYear.FourthYear, CollegeYear.FifthYear]);


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialStudentForm();

    // first name
    this.myStudentForm.get('firstname')?.valueChanges.subscribe((_resp: any) => {
      console.log(_resp);
      this.getFullName();
    });

    // middlename
    this.myStudentForm.get('middlename')?.valueChanges.subscribe((_resp: any) => {
      console.log(_resp);
      this.getFullName();
    });

    // lastname
    this.myStudentForm.get('lastname')?.valueChanges.subscribe((_resp: any) => {
      console.log(_resp);
      this.getFullName();
    });


  }

  initialStudentForm() {
    this.myStudentForm = this.fb.group({
      firstname: this.fb.control('', Validators.required),
      middlename: this.fb.control('', Validators.required),
      lastname: this.fb.control('', Validators.required),
      fullname: this.fb.control({ value: '', disabled: true }, Validators.required),
      image: this.fb.control('', Validators.required),
      age: this.fb.control(0, Validators.required),
      email: this.fb.control('', Validators.required),
      contact: this.fb.control(0, Validators.required),
      gender: this.fb.control('', Validators.required),

      // college details
      collegeDetail: this.fb.group({
        collegename: this.fb.control('', Validators.required),
        collegeDepartment: this.fb.control('', Validators.required),
        admissionDate: this.fb.control(Date, Validators.required),
        collegeCurrentYear: this.fb.control(Date, Validators.required),
        percentage: this.fb.control('', Validators.required),
        isActive: this.fb.control('', Validators.required),
        skills: this.fb.array([
          this.fb.control('', Validators.required),
        ]),
      }),

      // address details
      address: this.fb.group({
        city: this.fb.control('', Validators.required),
        taluka: this.fb.control('', Validators.required),
        district: this.fb.control('', Validators.required),
        state: this.fb.control('', Validators.required),
        country: this.fb.control('', Validators.required),
        pincode: this.fb.control(0, Validators.required),
      })
    })
  }


  // add firstname,middlename,lastname

  getFullName() {
    const myFirstname = this.myStudentForm.get('firstname')?.value;
    const myMiddlename = this.myStudentForm.get('middlename')?.value;
    const myLastname = this.myStudentForm.get('lastname')?.value;

    const myFullname = `${myFirstname} ${myMiddlename} ${myLastname}`;

    this.myStudentForm.get('fullname')?.setValue(myFullname);
  }



  // go to the next tab
  selectedTabIndex = 0;

  goToNextTab() {
    this.selectedTabIndex++;
  }

  onTabChange(index:any){
    console.log('tab changed',index);
  }

  // skill code

  get skills(): FormArray {
    return this.myStudentForm.get('collegeDetail.skills') as FormArray;
  }

  addStudentSkills() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeStudentSkills(index: number) {
    console.log(index);
    this.skills.removeAt(index);
  }


  onSubmitStudentForm() {
    if (this.myStudentForm.valid) {
      const myPayload = this.myStudentForm.value as Student;
      console.log(myPayload);
    } else {
      alert('correct fillup form.....');
    }
  }
}
