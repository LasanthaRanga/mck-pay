import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillAssesPage } from './bill-asses.page';

describe('BillAssesPage', () => {
  let component: BillAssesPage;
  let fixture: ComponentFixture<BillAssesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillAssesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillAssesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
