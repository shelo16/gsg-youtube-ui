import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Modals} from '../enums';
import {RegisterModalComponent} from '../../app/pages/register-modal/register-modal.component';
import {ResetPageComponent} from '../../app/pages/reset-page/reset-page.component';

@Injectable({
  providedIn: 'root'
})
export class MainUtilsService {

  constructor(
    public dialog: MatDialog) {
  }

  public openDialog(modal: Modals, data = null, width = '900px') {
    return this.dialog.open(this.getModalComponentByName(modal), {
      width: width,
      data: data,
      disableClose: true,
    });
  }

  public getModalComponentByName(modal: Modals): any {
    switch (modal) {
      case Modals.RegisterModal:
        return RegisterModalComponent;
      case Modals.ResetModal:
        return ResetPageComponent;
      // case Modals.RegisterConfirmModal:
      //   return RegisterConfirmComponent;
      // case Modals.ForgotPassword:
      //   return ResetPasswordMainComponent;
      // case Modals.AddProduct:
      //   return ProductAddPageComponent;
      // case Modals.BuyProduct:
      //   return ProductBuyPageComponent;
      default:
        return null;
    }
  }
}
