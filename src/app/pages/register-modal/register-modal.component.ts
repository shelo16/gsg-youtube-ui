import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SnackbarService} from '../../../utils/service/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog';
import {RegistrationService} from '../../../utils/service/registration.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  buttonLoading: boolean = false;
  registerFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    countryId: ['', [Validators.required]],
    jobTriggerTime: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    private regService: RegistrationService) {

  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  applyData() {
    this.buttonLoading = true;
    console.log(this.registerFormGroup.value);
    this.regService.registerUser(this.registerFormGroup.value)
      .pipe(finalize(() => this.buttonLoading = false))
      .subscribe(
        data => {
          this.snackBarService.openSnackBar('წარმატებით გაიარეთ რეგისტრაცია',1500).afterDismissed().subscribe(
            () => {
              this.closeDialog();
            }
          );
          console.log(data);
        },
        err => {
          console.log(err);
          this.snackBarService.openSnackBar('შეცდომა',3000);
        }
      );
  }

}
