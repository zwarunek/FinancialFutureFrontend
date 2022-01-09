import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingLevelsComponent } from './existing-levels.component';

describe('ExistingLevelsComponent', () => {
  let component: ExistingLevelsComponent;
  let fixture: ComponentFixture<ExistingLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
