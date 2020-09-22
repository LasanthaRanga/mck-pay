import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TotbillAssesPage } from './totbill-asses.page';

describe('TotbillAssesPage', () => {
  let component: TotbillAssesPage;
  let fixture: ComponentFixture<TotbillAssesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotbillAssesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TotbillAssesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
