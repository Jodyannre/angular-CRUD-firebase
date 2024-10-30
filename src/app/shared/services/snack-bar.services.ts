import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackBarService {
    
    private readonly _snackbar = inject(MatSnackBar);
    
    showSnackBar(message: string, action= 'ok'): void {
        this._snackbar.open(message, action, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}