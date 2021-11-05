import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SnackBarService } from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackbarService: SnackBarService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']){
        this.snackbarService.successfullyCreate('Авторизируйтесь в системе!', 'Ok');
      } else if (params['sessionFailed']){
        this.snackbarService.successfullyCreate('Пожалуйста, войдите в систему заново!', 'Ok');
      }
    });

  }

  public login(): void {
   this.authService.login(this.loginForm.value).subscribe(res => {
     if (res) {
       this.router.navigate(['admin'])
     }
   }, error => {
     this.snackbarService.successfullyCreate(error.error.message, 'Ok');
    })
  }
}
