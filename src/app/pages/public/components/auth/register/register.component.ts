import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/pages/shared/models/user.model';
import { UserService } from 'src/app/pages/shared/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
          transform:scale(1.6);
          margin-right: 1rem;
          color: var(--primary-color) !important;
      }
  `]
})
export class RegisterComponent implements OnInit {

  user: User | undefined;
  configUrl = 'assets/mockdata/user/user.json';

  constructor( public layoutService: LayoutService, private userService: UserService ) { }

  ngOnInit(): void {
  }
}
