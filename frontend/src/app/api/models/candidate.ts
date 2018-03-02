import { Discipline } from './discipline';
import { EducationCandidate } from './education-candidate';
import { WorkCandidate } from './work-candidate';

export class Candidate {

  disciplineList?: Discipline[];

  educationCandidateList?: EducationCandidate[];

  id?: number;

  name?: string;

  phoneNumber?: string;

  surname?: string;

  workCandidateList?: WorkCandidate[];
}
