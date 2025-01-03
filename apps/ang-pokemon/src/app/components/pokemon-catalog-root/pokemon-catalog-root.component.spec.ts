import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCatalogRootComponent } from "./pokemon-catalog-root.component";

describe("PokemonCatalogRootComponent", () => {
  let component: PokemonCatalogRootComponent;
  let fixture: ComponentFixture<PokemonCatalogRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCatalogRootComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCatalogRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
