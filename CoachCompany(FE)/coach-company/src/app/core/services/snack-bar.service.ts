import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}
  horizontalPosition: MatSnackBarHorizontalPosition = "center"
  verticalPosition: MatSnackBarVerticalPosition = "top"

  notifySuccess(msg: string) {
    this.snackBar.open(msg, 'Đóng',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

  notifyWarning(msg: string) {
    this.snackBar.open(msg, 'Đóng',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['snackbar-warning']
    });
  }

  notifyError(msg: string) {
    this.snackBar.open(msg, 'Đóng',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }


}
