import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSListComponent } from './cmslist.component';

describe('CMSListComponent', () => {
  let component: CMSListComponent;
  let fixture: ComponentFixture<CMSListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMSListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
