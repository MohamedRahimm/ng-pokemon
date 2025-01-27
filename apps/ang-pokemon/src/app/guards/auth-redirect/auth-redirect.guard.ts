import { AuthService } from "@ang-pokemon/auth";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";

//if user tries to go to /register or /login
export const authRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user$.pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl("/pokemon");
        return false;
      } else {
        return true;
      }
    })
  );
};
