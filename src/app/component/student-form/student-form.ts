import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender } from '../../enum/gender';

// angular material module
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  myStudentForm!: FormGroup;
  myTabStudentLabel: WritableSignal<string[]> = signal(['Person Detail', 'College Detail', 'Address Detail']);

  myGender: WritableSignal<string[]> = signal([Gender.Male, Gender.Female, Gender.Other]);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialStudentForm();
  }

  initialStudentForm() {
    this.myStudentForm = this.fb.group({
      firstname: this.fb.control('', Validators.required),
      middlename: this.fb.control('', Validators.required),
      lastname: this.fb.control('', Validators.required),
      fullname: this.fb.control('', Validators.required),
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
        pincode: this.fb.control(0, Validators.required),
        country: this.fb.control('', Validators.required),
      })
    })
  }



  // go to the next tab
  selectedTabIndex = 0;

  goToNextTab() {
    this.selectedTabIndex++;
  }

  // skill code

  get skills(): FormArray {
    return this.myStudentForm.get('collegeDetail.skills') as FormArray;
  }

  addStudentSkills() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeStudentSkills(index:number){
    console.log(index);
    this.skills.removeAt(index);
  }
}
