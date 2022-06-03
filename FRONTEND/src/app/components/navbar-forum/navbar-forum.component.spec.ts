import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForumComponent } from './navbar-forum.component';

describe('NavbarForumComponent', () => {
  let component: NavbarForumComponent;
  let fixture: ComponentFixture<NavbarForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
