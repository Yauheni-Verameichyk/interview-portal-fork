import { TestBed, inject } from '@angular/core/testing';

import { NavbarManager } from './navbar-manager';

describe('NavbarManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarManager]
    });
  });

  it('should be created', inject([NavbarManager], (service: NavbarManager) => {
    expect(service).toBeTruthy();
  }));
  it('should to changed the isShowNavBar variable', inject([NavbarManager], (service: NavbarManager) => {
    service.showNavbar(true);
    service.showNavBarEmitter.subscribe(isShow => {
      expect(isShow).toBeTruthy();
    });
  }));
});
