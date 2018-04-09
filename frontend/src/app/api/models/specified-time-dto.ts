/* tslint:disable */
import { UserBaseInfoDTO } from './user-base-info-dto';

export interface SpecifiedTimeDTO {

  endTime?: string;

  id?: number;

  repeatInterval?: string;

  startTime?: string;

  user?: UserBaseInfoDTO;

  duration?: number;

  groupId?: number;
}
