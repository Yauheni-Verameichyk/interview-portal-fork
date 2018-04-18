import { DisciplineBaseInfoDTO } from './discipline-base-info-dto';

export interface DisciplineMark {

  comment?: string;

  discipline?: DisciplineBaseInfoDTO;

  id?: number;

  value?: string;
}
