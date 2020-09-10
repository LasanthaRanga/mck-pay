import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindAssesPage } from './find-asses.page';

describe('FindAssesPage', () => {
  let component: FindAssesPage;
  let fixture: ComponentFixture<FindAssesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAssesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindAssesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
