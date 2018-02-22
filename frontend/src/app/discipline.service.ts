import { Injectable } from '@angular/core';

@Injectable()
export class DisciplineService {

  constructor() { }

  countBackgroundColor(childLevel: number): number {
    return 240 - childLevel * 30;
  }
}
