import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private router: Router, private authenticationService: AuthService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.loading = false;
          if (data) {
            this.authenticationService.saveCredentials(this.model.username, this.model.password, data['role']);
            this.router.navigate(['/admin']);
          } else {
            console.error(data);
          }
        },
        error => {
          console.error(error);
          this.loading = false;
        }
    );
  }

}
