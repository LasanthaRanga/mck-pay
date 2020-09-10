import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppcatPage } from './appcat.page';

describe('AppcatPage', () => {
  let component: AppcatPage;
  let fixture: ComponentFixture<AppcatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppcatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppcatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
