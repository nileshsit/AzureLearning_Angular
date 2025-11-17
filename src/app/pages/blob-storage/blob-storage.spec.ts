import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobStorage } from './blob-storage';

describe('BlobStorage', () => {
  let component: BlobStorage;
  let fixture: ComponentFixture<BlobStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlobStorage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlobStorage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
