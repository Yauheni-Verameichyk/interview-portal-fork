/* tslint:disable */
import { Interview } from './interview';
import { UserBaseInfoDTO } from './user-base-info-dto';

export interface SpecifiedTimeDTO {

  endTime?: string;

  id?: number;

  interviewsSet?: Interview[];

  repeatInterval?: string;

  startTime?: string;

  user?: UserBaseInfoDTO;
}
