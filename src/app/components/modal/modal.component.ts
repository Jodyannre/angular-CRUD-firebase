import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ContactService } from 'src/app/feature/contacts/contact.service';
import { ModalService } from './modal.service';
import { APP_CONSTANTS } from '@shared/constants';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '@shared/services/snack-bar.services';

const MATERIAL_MODULES = [MatLabel,MatFormField,MatInput,MatDialogModule, MatButtonModule];

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  contactForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBarSvc = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
    this.contactForm.patchValue(this._matDialog.data);
  }

  async onSubmit(){
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;
    const contact = this.contactForm.value;

    if (this._matDialog.data){
      this._contactSvc.updateContact(this._matDialog.data.id,contact);
    } else {
      this._contactSvc.newContact(contact);
      message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    }

    this._snackBarSvc.showSnackBar(message);
    this._modalSvc.closeModal();
  }

  private _buildForm(): void {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  getTitle(): string {
    return this._matDialog.data ? 'Edit contact' : 'Add contact'

    }
}
