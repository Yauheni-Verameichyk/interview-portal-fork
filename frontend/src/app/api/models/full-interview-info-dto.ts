/* tslint:disable */
import { CandidateBaseInfoDTO } from './candidate-base-info-dto';
import { DisciplineBaseInfoDTO } from './discipline-base-info-dto';
import { UserBaseInfoDTO } from './user-base-info-dto';
import { DisciplineMark } from './discipline-mark';

export class FullInterviewInfoDTO {

  id?: number;

  candidate?: CandidateBaseInfoDTO;

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
