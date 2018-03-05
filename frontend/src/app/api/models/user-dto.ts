/* tslint:disable */
import { Discipline } from './discipline';

export class UserDTO {

  id?: number;

  login?: string;

  name?: string;

  password?: string;

  permissions?: string[];

  phoneNumber?: string;

  roleDisciplines?: {[key: string]: Discipline[]};

  surname?: string;
  
}
