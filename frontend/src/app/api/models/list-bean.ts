import { CandidateDTO } from './candidate-dto';

export interface ListBean<T> {

  content?: Array<T>;

  page?: number;

  totalElements?: number;

  totalPages: number;
}
