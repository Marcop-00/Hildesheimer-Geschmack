import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User, Role } from '../../../interfaces/user';
import { Restaurant } from '../../../interfaces/restaurant';
import { Feedback } from '../../../interfaces/feedback';
import { Rating } from '../../../interfaces/rating';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api/users';

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    role: Role.CUSTOMER,
    image: 'profile.jpg',
    favoriteRestaurants: [{ id: 1, name: 'Test Restaurant' } as Restaurant],
    comments: [],
    ratings: [],
    feedback: [],
    createdAt: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user by ID', () => {
    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(user.role).toBe(Role.CUSTOMER);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should upload a profile image', () => {
    const formData = new FormData();
    formData.append('image', new Blob(), 'test.jpg');

    service.uploadProfileImage(1, formData).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${baseUrl}/1/upload`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should fetch all users', () => {
    service.getAllUsers().subscribe((users) => {
      expect(users.length).toBe(1);
      expect(users[0].name).toBe(mockUser.name);
    });

    const req = httpMock.expectOne(`${baseUrl}/`);
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('should submit feedback', () => {
    const feedbackMessage = { message: 'This is feedback' };

    service.submitFeedback(feedbackMessage.message).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${baseUrl}/feedbacks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(feedbackMessage);
    req.flush({});
  });

  it('should update user by ID', () => {
    const updateData = { name: 'UpdatedUser' };

    service.updateUserbyId(1, updateData).subscribe((user) => {
      expect(user.name).toBe('UpdatedUser');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush({ ...mockUser, ...updateData });
  });
});
