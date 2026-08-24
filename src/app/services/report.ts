import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  //este método solo tiene la responsabilidad de armar y descargar el PDF
  generateTaskReport(tasks: Task[]): void {
    if (tasks.length === 0) {
      Swal.fire('Atención', 'No hay tareas para generar el reporte', 'warning');
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte de Tareas - Bloc de Notas', 14, 20);
    doc.setFontSize(11);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 28);

    const bodyData = tasks.map(t => [
      t.title,
      t.description,
      t.completed ? 'Completada' : 'Pendiente',
      t.createdAt.toLocaleDateString()
    ]);

    autoTable(doc, {
      startY: 35,
      head: [['Título', 'Descripción', 'Estado', 'Fecha']],
      body: bodyData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save('reporte_tareas.pdf');
    
    Swal.fire('¡Éxito!', 'El reporte PDF se ha generado correctamente.', 'success');
  }
}