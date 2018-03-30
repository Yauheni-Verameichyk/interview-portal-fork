/* tslint:disable */
import { UserBaseInfoDTO } from './user-base-info-dto';

interface Period {
  years?: number;
  months?: number;
  weeks?: number;
}

export class SpecifiedTime {

  endTime?: Date;

  id?: number;

  repeatInterval?: string;

  startTime?: Date;

  user?: UserBaseInfoDTO;

  duration?: number;

  isRepeatable?: boolean

  repeatPattern?: string;

  repeatPeriod?: Period;
}
