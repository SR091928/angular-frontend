import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

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
