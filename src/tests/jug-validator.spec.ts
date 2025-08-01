import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugValidator } from './jug-validator';

describe('JugValidator', () => {
  let component: JugValidator;
  let fixture: ComponentFixture<JugValidator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugValidator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugValidator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
