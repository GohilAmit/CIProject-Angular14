import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSAddComponent } from './cmsadd.component';

describe('CMSAddComponent', () => {
  let component: CMSAddComponent;
  let fixture: ComponentFixture<CMSAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMSAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
