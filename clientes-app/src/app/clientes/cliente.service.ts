import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable,of, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
   // return this.http.get<Cliente[]>(this.urlEndPoint);
   return this.http.get(this.urlEndPoint).pipe(
    map( response => response as Cliente[])
   );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        // Lanzar un error para detener el flujo
        return throwError(() => new Error(e.error.mensaje));
      })
    )
  }

getCliente(id: any): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/clientes'])
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje,e.error.error, 'error');
      return throwError(() => new Error(e.error.mensaje));
    })
  )
}

update(cliente: Cliente): Observable<Cliente> {
  return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
    catchError(e =>{
      console.error(e.error.mensaje);
      if(e.status == 400){
        return throwError(e);
      }
      Swal.fire(e.error.mensaje,e.error.error, "error");
      return throwError(() => new Error(e.error.mensaje));
    })
  )
}

delete(id: number): Observable<Cliente> {
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
    catchError(e =>{
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje,e.error.error, "error");
      return throwError(() => new Error(e.error.mensaje));
    })
  )
}

}
