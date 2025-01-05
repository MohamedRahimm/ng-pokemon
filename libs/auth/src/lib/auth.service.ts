import { inject, Injectable, signal } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
} from "@angular/fire/auth";
import { from, map, Observable, switchMap } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  userSignal = signal<string>("");
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
  changePassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.firebaseAuth, email));
  }
}
