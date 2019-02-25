import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupButtonRendererComponent } from './popup-button-renderer.component';

describe('PopupButtonRendererComponent', () => {
  let component: PopupButtonRendererComponent;
  let fixture: ComponentFixture<PopupButtonRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupButtonRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
