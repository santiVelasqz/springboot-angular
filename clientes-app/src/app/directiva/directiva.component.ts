import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [],
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'Java', 'C#', 'PHP'];
  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = (this.habilitar ==true) ? false: true;
  }

}
