import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayAssesPage } from './pay-asses.page';

describe('PayAssesPage', () => {
  let component: PayAssesPage;
  let fixture: ComponentFixture<PayAssesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayAssesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayAssesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
