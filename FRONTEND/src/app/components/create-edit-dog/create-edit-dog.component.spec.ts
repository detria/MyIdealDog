import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDogComponent } from './create-edit-dog.component';

describe('CreateEditDogComponent', () => {
  let component: CreateEditDogComponent;
  let fixture: ComponentFixture<CreateEditDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
