import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

    public autor: any = {nombre: 'Santi', apellido: 'Velasquez'};
}
