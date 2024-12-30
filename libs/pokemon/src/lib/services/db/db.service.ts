import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { PokemonColors, PokemonSpecies } from '../get-pokemon/pokemon';

@Injectable({
    providedIn: 'root'
})
export class DbService {
    constructor() {
        this.initializeDB()
    }
    private dbName = "PokemonDB"
    private storeName = "PokemonColors"
    private async initializeDB() {
        await openDB(this.dbName, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("PokemonColors")) {
                    db.createObjectStore('PokemonColors', { keyPath: 'color' });
                }
            },
        });
    }
    async getFromIndexedDB(color: PokemonColors): Promise<{ color: PokemonColors, data: PokemonSpecies[] }> {
        const db = await openDB(this.dbName, 1);
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        return store.get(color);
    }
    async saveToIndexedDB(color: PokemonColors, data: PokemonSpecies[]): Promise<void> {
        const db = await openDB(this.dbName, 1);
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        await store.put({ color, data });
    }
}
