/* tslint:disable */
import { ExcludedTimeSlot } from './excluded-time-slot';
import { Interview } from './interview';
import { SpecifiedTimeDTO } from './specified-time-dto';

export interface CalendarDTO {

  excludedTimeSlots?: ExcludedTimeSlot[];

  interviews?: Interview[];

  specifiedTimeDTOs?: SpecifiedTimeDTO[];
}
