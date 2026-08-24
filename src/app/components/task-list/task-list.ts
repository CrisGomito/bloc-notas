import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { ReportService } from '../../services/report';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importaciones necesarias en Angular 17+
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDesc: string = '';

  // Inyección de Dependencias (DI) a través del constructor
  constructor(
    private taskService: TaskService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      Swal.fire('Error', 'El título de la tarea es obligatorio', 'error');
      return;
    }
    this.taskService.addTask(this.newTaskTitle, this.newTaskDesc);
    this.newTaskTitle = '';
    this.newTaskDesc = '';
    this.loadTasks();
  }

  toggleComplete(id: string): void {
    this.taskService.toggleTaskStatus(id);
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  // Delegamos la responsabilidad de crear el reporte al Servicio de Reportes
  exportToPDF(): void {
    this.reportService.generateTaskReport(this.tasks);
  }
}