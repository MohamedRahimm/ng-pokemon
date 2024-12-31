import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PageBtnComponent } from "./page-btn.component";

describe("PageBtnComponent", () => {
  let component: PageBtnComponent;
  let fixture: ComponentFixture<PageBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
