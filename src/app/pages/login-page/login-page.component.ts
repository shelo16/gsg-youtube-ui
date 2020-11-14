import { Component, OnInit } from '@angular/core';
import {Modals} from '../../../utils/enums';
import {finalize} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../../../utils/service/login-service';
import {MatDialogRef} from '@angular/material/dialog';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {MainUtilsService} from '../../../utils/service/main-utils.service';
import {AuthDataService} from '../../../utils/service/auth-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  justLoggedIn = false;
  errorMessage = '';
  buttonLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private snackBarService: SnackbarService,
              private mainUtilsService: MainUtilsService,
              private authDataService: AuthDataService) {
  }

  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login() {
    console.log(this.loginFormGroup.value);
    this.buttonLoading = true;
    this.loginService.authenticate(this.loginFormGroup.value)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
        data => {
          this.authDataService.setAuthInfo(data.username, data.jobTriggerTime);
          this.snackBarService.openSnackBar('წარმატებით გაიარეთ ავტორიზაცია',1500).afterDismissed().subscribe(
            () => this.reloadPage()
          );
          this.justLoggedIn = true;
        },
        err => {
          this.errorMessage = err;
          this.snackBarService.openSnackBar('არასწორი მეილი ან პაროლი',3000);
        }
      );
  }

  // closeDialog() {
  //   this.dialogRef.close();
  // }

  reloadPage(): void {
    window.location.reload();
  }

}
