import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLevelsPageComponent } from './create-levels-page.component';

describe('CreateLevelsPageComponent', () => {
  let component: CreateLevelsPageComponent;
  let fixture: ComponentFixture<CreateLevelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLevelsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLevelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
