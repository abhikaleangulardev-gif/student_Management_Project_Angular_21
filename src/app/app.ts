import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from "./component/header/header";

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-management-project');
}
