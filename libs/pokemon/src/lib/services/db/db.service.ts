import { Injectable } from "@angular/core";
import { openDB } from "idb";
import { PokemonColors, PokemonInfo } from "../get-pokemon/pokemon";

@Injectable({
  providedIn: "root",
})
export class DbService {
  constructor() {
    this.initializeDB();
  }
  private dbName = "PokemonDB";
  private colors: PokemonColors[] = [
    "red",
    "black",
    "blue",
    "brown",
    "gray",
    "green",
    "pink",
    "purple",
    "white",
    "yellow",
  ];
  private async initializeDB(): Promise<void> {
    const colors = this.colors;
    await openDB(this.dbName, 1, {
      upgrade(db) {
        for (const color of colors) {
          if (!db.objectStoreNames.contains(color)) {
            db.createObjectStore(color, { keyPath: "name" });
          }
        }
      },
    });
  }
  async getFromIndexedDB(
    color: PokemonColors
  ): Promise<{ color: PokemonColors; data: PokemonInfo[] }> {
    const db = await openDB(this.dbName, 1);
    const transaction = db.transaction(color, "readonly");
    const store = transaction.objectStore(color);
    const data: PokemonInfo[] = await store.getAll();
    return { color, data };
  }
  async saveToIndexedDB(
    color: PokemonColors,
    data: PokemonInfo
  ): Promise<void> {
    const db = await openDB(this.dbName, 1);
    const transaction = db.transaction(color, "readwrite");
    const store = transaction.objectStore(color);
    await store.put({ ...data });
  }
}
