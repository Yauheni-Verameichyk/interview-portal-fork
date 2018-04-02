class RecurringEvent {
    id: number;
    title: string;
    color: any;
    startTime: Date;
    endTime: Date;
    rrule?: {
      freq: RRule.Frequency;
      bymonth?: number;
      bymonthday?: number;
      byweekday?: RRule.Weekday[];
      interval?: number;
    };
  }
