import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render TOC with links', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const list = compiled.querySelector('ul');
    expect(list).toBeTruthy();

    const links = Array.from(compiled.querySelectorAll('a')).map(a =>
      a.textContent?.trim()
    );

    expect(links).toContain('Home');
    expect(links).toContain('Contact Us');
  });
});
