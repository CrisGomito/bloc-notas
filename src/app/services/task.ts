import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root' // <-- Inyección de dependencias a nivel global
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(), // Genera un ID único
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
  }

  toggleTaskStatus(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}