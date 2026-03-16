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
import { FirstLetterCapitalize } from '../../shared/directive/firstlettercapitalize';
import { skillValidator } from '../../shared/validators/skills-validator';
import { AllFirstLetterCaptalize } from '../../shared/directive/all-first-letter-captalize';
import { StudentApi } from '../../shared/service/student-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, Focus, FirstLetterCapitalize, AllFirstLetterCaptalize],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  myStudentForm!: FormGroup;
  myTabStudentLabel: WritableSignal<string[]> = signal(['Person Detail', 'College Detail', 'Address Detail']);


  myGender: WritableSignal<string[]> = signal([Gender.Male, Gender.Female, Gender.Other]);
  myCollegeYears: WritableSignal<string[]> = signal([CollegeYear.FirstYear, CollegeYear.SecondYear, CollegeYear.ThirdYear, CollegeYear.FourthYear, CollegeYear.FifthYear]);


  constructor(private fb: FormBuilder, private studentservice: StudentApi, private router: Router, private activedRouted: ActivatedRoute) { }

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
      firstname: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      middlename: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      lastname: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      fullname: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      age: this.fb.control(null, [Validators.required, Validators.min(18), Validators.max(21)]),
      email: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      contact: this.fb.control(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      gender: this.fb.control('', Validators.required),

      // college details
      collegeDetail: this.fb.group({
        collegename: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        collegeDepartment: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
        admissionDate: this.fb.control('', Validators.required),
        collegeCurrentYear: this.fb.control('', Validators.required),
        percentage: this.fb.control('', [Validators.required, Validators.pattern(/^(100(\.0+)?|[0-9]?\d(\.\d+)?)$/)]),
        isActive: this.fb.control(false, Validators.requiredTrue),
        skills: this.fb.array([
          this.fb.control('', [Validators.required, skillValidator]),
        ]),
      }),

      // address details
      addressDetail: this.fb.group({
        city: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        taluka: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        district: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        state: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        country: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        pincode: this.fb.control(null, [Validators.required, Validators.pattern('^[0-9]{6}$')
        ]),
      })
    })
  }


  // add firstname,middlename,lastname

  getFullName() {
    const myFirstname = this.myStudentForm.get('firstname')?.value;
    const myMiddlename = this.myStudentForm.get('middlename')?.value;
    const myLastname = this.myStudentForm.get('lastname')?.value;

    const myFullname = `${myFirstname} ${myMiddlename} ${myLastname}`.toUpperCase();

    this.myStudentForm.get('fullname')?.setValue(myFullname);
  }



  // go to the next tab
  selectedTabIndex = 0;


  goToNextTab() {
    this.selectedTabIndex++;
  }

  onTabChange(index: any) {
    console.log('tab changed', index);
  }

  // skill code

  get skills(): FormArray {
    return this.myStudentForm.get('collegeDetail.skills') as FormArray;
  }

  addStudentSkills() {
    this.skills.push(this.fb.control('', [Validators.required, skillValidator]));
  }

  removeStudentSkills(index: number) {
    console.log(index);
    this.skills.removeAt(index);
  }


  onSubmitStudentForm() {

    if (this.myStudentForm.valid) {
      const myPayload = this.myStudentForm.value as Student;
      console.log(myPayload);
      this.studentservice.postStudentDetail(myPayload).subscribe({
        next: (_resp: any) => {
          console.log(_resp);
          alert('successfully Post Method.....');
          this.router.navigate(['/student-list'], { relativeTo: this.activedRouted });
        }
      })

    } else {
      alert('correct fillup form.....');
    }
  }


  // apply validation collegedetails in single control college department

  // method -1

  get collegeDepartment() {
    return this.myStudentForm.get('collegeDetail.collegeDepartment');
  }

  // method-2

  get collegeDetail() {
    return this.myStudentForm.get('collegeDetail') as FormGroup;
  }

  get addressDetail() {
    return this.myStudentForm.get('addressDetail') as FormGroup;
  }
}
