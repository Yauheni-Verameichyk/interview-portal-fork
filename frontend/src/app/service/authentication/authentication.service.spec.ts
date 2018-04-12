import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

let testAuthService: AuthenticationService;

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
    testAuthService = TestBed.get(AuthenticationService);
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
  it('should clear all data from local storage', () => {
    localStorage.setItem('test1', 'clear');
    localStorage.setItem('test2', 'clear');
    testAuthService.removeCredentialsUser();
    expect(localStorage.getItem('test1')).toBeNull();
    expect(localStorage.getItem('test2')).toBeNull();
  });
  it('should get token from local storage', () => {
    localStorage.setItem('token', 'token');
    expect(testAuthService.getTokenFromLocalStorage()).toBe('token');
  });
  it('should return refresh token from local storage', () => {
    localStorage.setItem('refreshToken', 'refreshToken');
    expect(testAuthService.getRefreshTokenFromLocalStorage()).toBe('refreshToken');
  });
  it('should return empty permissions[] from local storage', () => {
    localStorage.setItem('permissions', JSON.stringify([]));
    expect(JSON.parse(testAuthService.getPermissionsFromLocalStorage())).toEqual([]);
  });
  it('should return permissions array from local storage', () => {
    const permission = ['ADMIN', 'USER', 'MODERATOR'];
    localStorage.setItem('permissions', JSON.stringify(permission));
    expect(JSON.parse(localStorage.getItem('permissions'))).toEqual(permission);
  });
  it('should set permissions from local storage', () => {
    localStorage.setItem('permissions', 'permissions');
    expect(localStorage.getItem('permissions')).toBe('permissions');
  });
  it('should set token from local storage', () => {
    localStorage.setItem('token', 'token');
    expect(localStorage.getItem('token')).toBe('token');
  });
  it('should set refresh token from local storage', () => {
    localStorage.setItem('refreshToken', 'token');
    expect(localStorage.getItem('refreshToken')).toBe('token');
  });
  it('should remove token from local storage', () => {
    localStorage.setItem('token', 'token');
    testAuthService.removeTokenInLocalStorage();
    expect(localStorage.getItem('token')).toBeNull();
  });
  it('should remove refresh token from local storage', () => {
    localStorage.setItem('refreshToken', 'token');
    testAuthService.removeRefreshTokenInLocalStorage();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
  it('should return true if permission exist or false when not', () => {
    const permission = ['ADMIN', 'USER', 'MODERATOR'];
    localStorage.setItem('permissions', JSON.stringify(permission));
    expect(testAuthService.isPermissionPresent('ADMIN')).toBeTruthy();
    expect(testAuthService.isPermissionPresent('PETROVICH')).toBeFalsy();
  });
  it('should return true because token expired', () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9'
      + '.eyJzdWIiOiJGTkhUR0hLSCIsImV4cCI6MTIyfQ'
      + '.4h_VlVf_vxScdbl-gKi8rSN94O4x4HSpI4f6-lOVFFA';
    expect(testAuthService.isExpiredToken(token)).toBeTruthy();
  });
});
