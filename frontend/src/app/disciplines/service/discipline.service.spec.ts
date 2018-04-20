import { TestBed, inject } from '@angular/core/testing';

import { DisciplineService } from './discipline.service';
import { DisciplineControllerService } from '../../api/services';

describe('DisciplineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisciplineService,
        { provide: DisciplineControllerService, useClass: DisciplineControllerServiceStub },
      ]
    });
  });

  it('should be created', inject([DisciplineService], (service: DisciplineService) => {
    expect(service).toBeTruthy();
  }));

  it('should return right background color', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.countBackgroundColor(2)).toEqual(180);
  }));

  it('should convert the discipline name to required format', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.convertDisciplineName('Visual basic')).toEqual('VISUAL_BASIC');
  }));

  it('should generate edit permission for the discipline', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.generateEditPermissionForDiscipline('Visual basic', 0)).toEqual('DISCIPLINE_EDIT');
  }));

  it('should generate edit permission for the sub item', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.generateEditPermissionForDiscipline('VISUAL_BASIC', 1)).toEqual('SUB_ITEM_EDIT_VISUAL_BASIC');
  }));

  it('should generate delete permission for the discipline', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.generateDeletePermissionForDiscipline('Visual basic', 0)).toEqual('DISCIPLINE_DELETE');
  }));

  it('should generate delete permission for the sub item', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.generateDeletePermissionForDiscipline('VISUAL_BASIC', 1)).toEqual('SUB_ITEM_DELETE_VISUAL_BASIC');
  }));

  it('should return observable of users disciplines', inject([DisciplineService, DisciplineControllerService],
    (service: DisciplineService, disciplineControllerService: DisciplineControllerService) => {
      spyOn(disciplineControllerService, 'findDisciplinesForUserUsingGET').and.callThrough();
      service.chooseRequest('MY');
      expect(disciplineControllerService.findDisciplinesForUserUsingGET).toHaveBeenCalled();
    }));

  it('should return observable of all disciplines', inject([DisciplineService, DisciplineControllerService],
    (service: DisciplineService, disciplineControllerService: DisciplineControllerService) => {
      spyOn(disciplineControllerService, 'findAllUsingGET').and.callThrough();
      service.chooseRequest('ALL');
      expect(disciplineControllerService.findAllUsingGET).toHaveBeenCalled();
    }));

  it('should throw error with unspecified operation', inject([DisciplineService], (service: DisciplineService) => {
    expect(function () {  service.chooseRequest('123'); }
  ).toThrowError('Perhaps you do not know what you want');
  }));

  it('should generate search pattern for disciplines and sub items', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.selectSearchPattern(true, true)).toEqual('');
  }));

  it('should generate search pattern for disciplines', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.selectSearchPattern(true, false)).toEqual(',parentId=null');
  }));

  it('should generate search pattern for sub items', inject([DisciplineService], (service: DisciplineService) => {
    expect(service.selectSearchPattern(false, true)).toEqual(',parentId<>null');
  }));

  it('should throw error if search pattern can not be defined', inject([DisciplineService], (service: DisciplineService) => {
    expect(function () { service.selectSearchPattern(false, false); }).toThrowError();
  }));
});

class DisciplineControllerServiceStub {
  findDisciplinesForUserUsingGET() { }
  findAllUsingGET() { }
}
