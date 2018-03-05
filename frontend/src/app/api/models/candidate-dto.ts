/* tslint:disable */
import { DisciplineDTO } from './discipline';

export interface CandidateDTO {

  disciplineList?: DisciplineDTO[];

  id?: number;

  name?: string;

  phoneNumber?: string;

  surname?: string;
}
