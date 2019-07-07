import { Component } from '@angular/core';
import {HardcodedAuthenticationService} from './service/hardcoded-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: '<h1>{{title}}<h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  message = 'Welcome to Spring - Angular Application';
  constructor(private hardcodedAuthenticationService
                : HardcodedAuthenticationService) { }
}
