/* tslint:disable */
import { ExcludedTimeSlot } from './excluded-time-slot';
import { SpecifiedTimeDTO } from './specified-time-dto';
import { InterviewDTO } from './interview-dto';

export interface CalendarDTO {

  excludedTimeSlots?: ExcludedTimeSlot[];

  interviews?: InterviewDTO[];

  specifiedTimeDTOs?: SpecifiedTimeDTO[];
}
