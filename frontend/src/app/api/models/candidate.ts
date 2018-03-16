import { DisciplineDTO } from './discipline';
import { CandidateEducation } from './candidate-education';
import { CandidateWork } from './candidate-work';


export class Candidate {

  disciplineList?: DisciplineDTO[];

  candidateEducationList?: CandidateEducation[];

  id?: number;

  name?: string;

  phoneNumber?: string;

  surname?: string;

  candidateWorkList?: CandidateWork[];
}
