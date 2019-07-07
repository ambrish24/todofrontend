
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Specialty} from '../specialty';
import {SpecialtyEditComponent} from './specialty-edit.component';
import {SpecialtyService} from '../specialty.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../testing/router-stubs';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;

class SpecialityServiceStub {
  getSpecialtyById(specId: string): Observable<Specialty> {
    return of();
  }
}

describe('SpecialtyEditComponent', () => {
  let component: SpecialtyEditComponent;
  let fixture: ComponentFixture<SpecialtyEditComponent>;
  let specialtyService: SpecialtyService;
  let spy: Spy;
  let testSpecialty: Specialty;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialtyEditComponent],
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
    fixture = TestBed.createComponent(SpecialtyEditComponent);
    component = fixture.componentInstance;
    testSpecialty = {
      id: 1,
      name: 'test'
    };

    specialtyService = fixture.debugElement.injector.get(SpecialtyService);
    spy = spyOn(specialtyService, 'getSpecialtyById')
      .and.returnValue(of(testSpecialty));

    fixture.detectChanges();
  });

  it('should create SpecialtyEditComponent', () => {
    expect(component).toBeTruthy();
  });
});
