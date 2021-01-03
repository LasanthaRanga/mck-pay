import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayShopPage } from './pay-shop.page';

describe('PayShopPage', () => {
  let component: PayShopPage;
  let fixture: ComponentFixture<PayShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
