import { TestBed } from '@angular/core/testing';
import { RestaurantsService } from './restaurants.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Restaurant } from '../../../interfaces/restaurant';
import { Comment } from '../../../interfaces/comment';
import { Rating } from '../../../interfaces/rating';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/restaurants';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantsService],
    });
    service = TestBed.inject(RestaurantsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch restaurants', () => {
    const mockRestaurants: Restaurant[] = [{ id: 1, name: 'Test Restaurant', description: 'A test restaurant' } as Restaurant];

    service.getRestaurants().subscribe((restaurants) => {
      expect(restaurants.length).toBe(1);
      expect(restaurants).toEqual(mockRestaurants);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurants);
  });

  it('should fetch a restaurant by ID', () => {
    const mockRestaurant: Restaurant = { id: 1, name: 'Test Restaurant', description: 'A test restaurant' } as Restaurant;

    service.getRestaurantById(1).subscribe((restaurant) => {
      expect(restaurant).toEqual(mockRestaurant);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurant);
  });

  it('should create a restaurant', () => {
    const newRestaurant = { name: 'New Restaurant', description: 'A new test restaurant' } as Restaurant;

    service.createRestaurant(newRestaurant, 1).subscribe((restaurant) => {
      expect(restaurant).toEqual(newRestaurant);
    });

    const req = httpMock.expectOne(`${apiUrl}/createrestaurant/1`);
    expect(req.request.method).toBe('POST');
    req.flush(newRestaurant);
  });

  it('should update a restaurant', () => {
    const updatedData = { name: 'Updated Name' };

    service.updateRestaurant(1, updatedData as Restaurant).subscribe((restaurant) => {
      expect(restaurant.name).toBe('Updated Name');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ id: 1, ...updatedData });
  });

  it('should delete a favorite restaurant', () => {
    service.removeFavoriteRestaurant(1, 2).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${apiUrl}/1/favorite/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle errors correctly', () => {
    service.getRestaurants().subscribe(
      () => fail('Should have failed'),
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain('Server returned code 500');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
