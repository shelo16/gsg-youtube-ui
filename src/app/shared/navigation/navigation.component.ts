import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MainUtilsService} from '../../../utils/service/main-utils.service';
import {finalize} from 'rxjs/operators';
import {LoginService} from '../../../utils/service/login-service';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {Modals} from '../../../utils/enums';
import {AuthDataService} from '../../../utils/service/auth-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private mainUtils: MainUtilsService,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    public authDataService: AuthDataService) {
  }

  ngOnInit() {

    this.checkUserLoggedIn();


  }

  checkUserLoggedIn() {
    this.loginService.checkIfAuthenticated().subscribe(
      data => {
        this.authDataService.setAuthInfo(data.username,data.jobTriggerTime);
      },
      err => {
        console.log(err);
      }
    );
  }

  logout(): void {
    this.loginService.logout()
      .pipe(finalize(() => this.logoutSuccessHandler()))
      .subscribe();
  }

  reloadPage(): void {
    window.location.reload();
  }

  logoutSuccessHandler() {
    this.authDataService.setLogOutInfo();
    this.snackbarService.openSnackBar('წარმატებით გაიარეთ logout',3000)
  }

  openDialog(modalName:string) {
    if (modalName == 'Register'){
      this.mainUtils.openDialog(Modals.RegisterModal);
    }else {
      this.loginService.getUserDataForReset()
        .subscribe(
          data => {
            const dialogData = {
              userData: data
            };
            this.mainUtils.openDialog(Modals.ResetModal,dialogData);
          }, error => {
            console.log(error);
          }
        );

    }
  }

}
