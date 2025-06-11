import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBonoComponent } from './registro-bono.component';

describe('RegistroBonoComponent', () => {
  let component: RegistroBonoComponent;
  let fixture: ComponentFixture<RegistroBonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroBonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroBonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
