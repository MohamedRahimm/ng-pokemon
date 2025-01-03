import { AuthService } from "@ang-pokemon/auth";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs/operators";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigateByUrl("/");
        return false;
      }
    })
  );
};

export const testGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user$.pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl("/pokemon/catalog");
        return false;
      } else {
        return true;
      }
    })
  );
};
