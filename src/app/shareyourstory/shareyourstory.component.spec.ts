import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareyourstoryComponent } from './shareyourstory.component';

describe('ShareyourstoryComponent', () => {
  let component: ShareyourstoryComponent;
  let fixture: ComponentFixture<ShareyourstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareyourstoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareyourstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
