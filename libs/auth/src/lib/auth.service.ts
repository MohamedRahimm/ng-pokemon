import { inject, Injectable } from "@angular/core";
import {
  Auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
} from "@angular/fire/auth";
import { from, map, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  userEmail$ = this.user$.pipe(map((info) => info?.email || ""));
  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
    return from(promise).pipe(map(() => undefined));
  }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
    return from(promise).pipe(map(() => undefined));
  }
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
  //implement this
  changePasswordInit(email: string): Observable<void> {
    return from(
      sendPasswordResetEmail(this.firebaseAuth, email, {
        url: "https://ng-pokemon-lime.vercel.app/password/reset?mode=action&oobCode=code",
      })
    );
  }
  changePasswordConfirm(
    oobCode: string,
    newPassword: string
  ): Observable<void> {
    return from(confirmPasswordReset(this.firebaseAuth, oobCode, newPassword));
  }
}
