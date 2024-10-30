import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>; //keyof obtiene el tipo de las claves de un objeto  de tipo T

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: number;
    action: string;
    created: Timestamp;
    updated: Timestamp;
  }