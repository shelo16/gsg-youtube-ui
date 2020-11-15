import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RegistrationService} from '../../../utils/service/registration.service';
import {finalize} from 'rxjs/operators';
import {AuthDataService} from '../../../utils/service/auth-data.service';
import {LoginService} from '../../../utils/service/login-service';
import {ToUpdateUserData} from '../../../utils/interfaces';
import {ActivatedRoute} from '@angular/router';
import {LoadingService} from '../../../utils/service/loading.service';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent implements OnInit {

  countries = [];
  buttonLoading: boolean = false;
  updateFormGroup = this.formBuilder.group({
    countryId: ['', [Validators.required]],
    jobTriggerTime: ['', [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ResetPageComponent>,
    private loginService: LoginService,
    private loadingService: LoadingService) {

  }

  ngOnInit(): void {
    this.setCountries();
    console.log('This.dataaa ::: ',this.data.userData);
    this.updateFormGroup.setValue(this.data.userData);
  }

  setCountries() {
    this.loadingService.startLoading();
    this.loginService.getCountryDropDown()
      .pipe(finalize(()=>this.loadingService.stopLoading()))
      .subscribe(
        data => {
          console.log('Country drop down ::' , data);
          this.countries = data
        },error => {
          console.log(error);
        }
    )
  }

  closeDialog() {
    this.dialogRef.close();
  }

  applyData() {
    this.buttonLoading = true;
    console.log(this.updateFormGroup.value);
    this.loginService.resetUserData(this.updateFormGroup.value)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
        data => {
          this.snackBarService.openSnackBar('წარმატებით შეცვალეთ მონაცემები', 1500).afterDismissed().subscribe(
            () => {
              this.closeDialog();
            }
          );
          console.log(data);
        },
        err => {
          console.log(err);
          this.snackBarService.openSnackBar('შეცდომა', 3000);
        }
      );
  }

}
