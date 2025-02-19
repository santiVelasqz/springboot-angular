import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { RouterLink } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService){}

  ngOnInit(){
    this.clienteService.getClientes().subscribe(

      // varias formas: 
      //1º
      // clientes => this.clientes = clientes
      //2º
      (clientes) => {
        this.clientes = clientes
      }
      //3º
      // function (clientes) {
      //   this.clientes = clientes
      // }

    );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Está seguro?",
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id)
        .subscribe( response =>{
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          swalWithBootstrapButtons.fire({
          title: "Cliente eliminado!",
          text: `Cliente ${cliente.nombre} eliminado con éxito.`,
          icon: "success"
        });
        })
        
      }
    });
  }

}
