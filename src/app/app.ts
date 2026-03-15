import { Component, signal } from '@angular/core';
import { StudentForm } from "./component/student-form/student-form";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, StudentForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-management-project');
}
