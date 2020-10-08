import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrinterPage } from './printer.page';

describe('PrinterPage', () => {
  let component: PrinterPage;
  let fixture: ComponentFixture<PrinterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrinterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
