
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// Other imports
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {HttpErrorHandler} from '../error.service';

import {OwnerService} from './owner.service';
import {Owner} from './owner';
import {Type} from '@angular/core';

describe('OnwerService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let ownerService: OwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        OwnerService,
        HttpErrorHandler
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    ownerService = TestBed.get(OwnerService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// OwnerService method tests begin ///

  describe('#getOwners', () => {
    let expectedOwners: Owner[];

    beforeEach(() => {
      ownerService = TestBed.get(OwnerService);
      expectedOwners = [
        { id: 1, firstName: 'A' },
        { id: 2, firstName: 'B' },
      ] as Owner[];
    });

    it('should return expected owners (called once)', () => {

      ownerService.getOwners().subscribe(
        owners => expect(owners).toEqual(expectedOwners, 'should return expected owners'),
        fail
      );

      // OwnerService should have made one request to GET owners from expected URL
      const req = httpTestingController.expectOne(ownerService.entityUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock owners
      req.flush(expectedOwners);
    });
  });

});
