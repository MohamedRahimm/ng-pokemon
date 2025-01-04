import { inject, Injectable } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
} from "@angular/fire/auth";
import { from, Observable, switchMap } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
    return from(promise).pipe(switchMap(() => new Observable<void>()));
  }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    );
    return from(promise).pipe(switchMap(() => new Observable<void>()));
  }
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
  changePassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.firebaseAuth, email));
  }
}
