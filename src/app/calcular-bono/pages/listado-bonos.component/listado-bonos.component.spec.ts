import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBonosComponent } from './listado-bonos.component';

describe('ListadoBonosComponent', () => {
  let component: ListadoBonosComponent;
  let fixture: ComponentFixture<ListadoBonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoBonosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoBonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
