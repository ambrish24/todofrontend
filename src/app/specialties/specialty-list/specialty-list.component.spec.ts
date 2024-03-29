
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {SpecialtyListComponent} from './specialty-list.component';
import {FormsModule} from '@angular/forms';
import {SpecialtyService} from '../specialty.service';
import {Specialty} from '../specialty';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Observable, of} from 'rxjs/index';
import Spy = jasmine.Spy;

class SpecialityServiceStub {
  deleteSpecialty(specId: string): Observable<number> {
    return of();
  }
  getSpecialties(): Observable<Specialty[]> {
    return of();
  }
}


describe('SpecialtyListComponent', () => {
  let component: SpecialtyListComponent;
  let fixture: ComponentFixture<SpecialtyListComponent>;
  let specialtyService: SpecialtyService;
  let spy: Spy;
  let testSpecialties: Specialty[];
  let responseStatus: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialtyListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [
        {provide: SpecialtyService, useClass: SpecialityServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyListComponent);
    component = fixture.componentInstance;
    testSpecialties = [{
      id: 1,
      name: 'test'
    }];

    specialtyService = fixture.debugElement.injector.get(SpecialtyService);
    responseStatus = 204; // success delete return NO_CONTENT
    component.specialties = testSpecialties;

    spy = spyOn(specialtyService, 'deleteSpecialty')
      .and.returnValue(of(responseStatus));

    fixture.detectChanges();
  });

  it('should create SpecialtyListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteSpecialty() method', () => {
    fixture.detectChanges();
    component.deleteSpecialty(component.specialties[0]);
    expect(spy.calls.any()).toBe(true, 'deleteSpecialty called');
  });

});
