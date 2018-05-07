/* tslint:disable */
import { DisciplineBaseInfoDTO } from './discipline-base-info-dto';
import { UserBaseInfoDTO } from './user-base-info-dto';
import { DisciplineMark } from './discipline-mark';
import { CandidateDTO } from './candidate-dto';

export class FullInterviewInfoDTO {

  id?: number;

  candidate?: CandidateDTO;

  disciplineSet?: DisciplineBaseInfoDTO[];

  discipline?: DisciplineBaseInfoDTO;

  endTime?: string;

  feedback?: string;

  finalMark?: string;

  description?: string;

  interviewerSet?: UserBaseInfoDTO[];

  markList?: DisciplineMark[];

  place?: string;

  startTime?: string;

  status?: string;
}
