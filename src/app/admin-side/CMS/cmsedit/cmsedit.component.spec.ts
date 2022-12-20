import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSEditComponent } from './cmsedit.component';

describe('CMSEditComponent', () => {
  let component: CMSEditComponent;
  let fixture: ComponentFixture<CMSEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMSEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
