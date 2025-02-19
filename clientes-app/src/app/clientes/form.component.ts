import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import  swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";
  public errores!: string[];
  constructor(private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute){
  }
  ngOnInit(){
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activateRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      respuesta => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente ${respuesta.cliente.nombre} creado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
        console.error(err.error.errors)
        console.error(err.status)
      }
    )
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
      console.error(err.error.errors)
      console.error(err.status)
    }
  )
  }

}
