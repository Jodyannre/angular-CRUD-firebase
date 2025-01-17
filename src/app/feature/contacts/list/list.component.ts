import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GridComponent} from '@components/grid/grid.component';
import { ColumnKeys, Contact } from '../contact.interfaces';
import { ContactService } from '../contact.service';
import { tap } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ GridComponent],
  template: `
    <section>
      <app-grid [displayedColumns]="displayedColumns" [data]="contacts()" [sortableColumns]="sortables" />
    </section>
  `,
  styles: ``
})
export class ListComponent implements OnInit {
  contacts = signal<Contact[]>([]);
  //data!: Contact[];
  displayedColumns: ColumnKeys<Contact> = ['id','name','email','phone','action'];  
  sortables: ColumnKeys<Contact> = ['id','name','email','phone'];

  private readonly _contactSvc = inject(ContactService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this._contactSvc.getAllContacts()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((contacts:Contact[])=> this.contacts.set(contacts))
    )
    .subscribe();
  }
}



