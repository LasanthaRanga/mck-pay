import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindShopPage } from './find-shop.page';

describe('FindShopPage', () => {
  let component: FindShopPage;
  let fixture: ComponentFixture<FindShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
