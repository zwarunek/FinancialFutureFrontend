import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConstructionComponent } from './header-construction.component';

describe('HeaderConstructionComponent', () => {
  let component: HeaderConstructionComponent;
  let fixture: ComponentFixture<HeaderConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderConstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
