/* tslint:disable */
import { CandidateBaseInfoDTO } from './candidate-base-info-dto';
import { DisciplineBaseInfoDTO } from './discipline-base-info-dto';
import { UserBaseInfoDTO } from './user-base-info-dto';

export interface InterviewDTO {

  candidate?: CandidateBaseInfoDTO;

  disciplineSet?: DisciplineBaseInfoDTO[];

  endTime?: string;

  id?: number;

  interviewerSet?: UserBaseInfoDTO[];

  place?: string;

  startTime?: string;

  status?: string;
}
