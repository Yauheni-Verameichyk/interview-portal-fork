/* tslint:disable */
import { Candidate } from './candidate';
// import { User } from './user';

export interface Interview {

  candidate?: Candidate;

  description?: string;

  endTime?: string;

  id?: number;

  // interviewersSet?: User[];

  startTime?: string;

  title?: string;
}
