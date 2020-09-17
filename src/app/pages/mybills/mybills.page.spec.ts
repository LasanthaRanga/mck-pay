import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MybillsPage } from './mybills.page';

describe('MybillsPage', () => {
  let component: MybillsPage;
  let fixture: ComponentFixture<MybillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybillsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MybillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
