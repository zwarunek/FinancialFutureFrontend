import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCompSelectorComponent } from './stock-comp-selector.component';

describe('StockCompSelectorComponent', () => {
  let component: StockCompSelectorComponent;
  let fixture: ComponentFixture<StockCompSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCompSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCompSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
