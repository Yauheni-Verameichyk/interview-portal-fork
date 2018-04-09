/* tslint:disable */
import { UserBaseInfoDTO } from './user-base-info-dto';

export class SpecifiedTime {

  endTime?: Date;

  id?: number;

  repeatInterval?: string;

  startTime?: Date;

  user?: UserBaseInfoDTO;

  duration?: number;

  isRepeatable?: boolean

  repeatPattern?: string;

  repeatPeriod?: number;

  groupId?: number;
}
