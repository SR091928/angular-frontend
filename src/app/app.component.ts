import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main class="app-main">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    // Check for a redirect path in sessionStorage (set by 404.html)
    const redirect = sessionStorage.getItem('redirect');
    console.log("Debug App Component");
    console.log("Redirect: ", redirect)
    if (redirect && redirect !== window.location.pathname) {
      sessionStorage.removeItem('redirect');
      this.router.navigateByUrl(redirect);
    }
  }
}
