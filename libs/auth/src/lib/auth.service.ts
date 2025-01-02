import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  UserInfo,
} from "@angular/fire/auth";
import { from, Observable, switchMap } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig: WritableSignal<Pick<UserInfo, "email"> | null | undefined> =
    signal(undefined);
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
}
