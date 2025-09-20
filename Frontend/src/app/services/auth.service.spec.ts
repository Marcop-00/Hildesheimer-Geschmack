import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const apiUrl = 'http://localhost:3000/api/users';

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'CUSTOMER',
    };

    service.register(mockUser).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush({});
  });

  it('should log in a user', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    service.login('john@example.com', 'password123').subscribe((res) => {
      expect(res.token).toBe('fake-jwt-token');
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'john@example.com', password: 'password123' });
    req.flush(mockResponse);
  });

  it('should save and retrieve token', () => {
    service.saveToken('test-token');
    expect(service.getToken()).toBe('test-token');
  });

  it('should check if user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'CUSTOMER' }));
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return user data from local storage', () => {
    const mockUser = { id: 1, role: 'CUSTOMER' };
    localStorage.setItem('user', JSON.stringify({ user: mockUser }));

    expect(service.getUser()).toEqual({ user: mockUser });
    expect(service.getUserId()).toBe(1);
    expect(service.getRoleId()).toBe('CUSTOMER');
  });

  it('should return empty object if no user is found', () => {
    localStorage.removeItem('user');
    expect(service.getUser()).toEqual({});
  });

  it('should remove user data on logout', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'CUSTOMER' }));
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should return auth headers with token', () => {
    service.saveToken('test-token');
    const headers = service.getAuthHeaders();
    expect(headers.get('Authorization')).toBe('Bearer test-token');
  });
});
