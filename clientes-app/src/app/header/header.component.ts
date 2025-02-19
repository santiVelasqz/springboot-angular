import { Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from "@angular/router";
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    imports: [FooterComponent, RouterLink]
})
export class HeaderComponent {

    title: string = 'App Angular';

}