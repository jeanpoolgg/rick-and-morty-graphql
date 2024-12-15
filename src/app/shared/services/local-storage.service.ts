import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interfaces';
const MY_FAVORITES = 'myFavorites'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor() {
    this.initialStorage()
  }

  addOrRemoveFavorite(character: Character): void {
    const {id} = character;
    const currentsFav = this.getFavoritesCharaceters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharaceters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]))
      this.charactersFavSubject.next([...currentsFav, character])
    } catch (error){
      console.log('Error getting favorites from localStorage', error);
      // todo: alert
    }
  }

  private removeFromFavorite(id:number): void {
    try {
      const currentsFav = this.getFavoritesCharaceters();
      const characters = currentsFav.filter((item: Character) => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]))
      this.charactersFavSubject.next([...characters])

    }catch(error) {
      console.log('Error removing localStorage', error);
      // todo: alert
    }
  }

  getFavoritesCharaceters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES)!);
      this.charactersFavSubject.next(charactersFav)
      return charactersFav;
    }catch(error){
      console.log("Error getting favorites from localStorage", error)
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES)!);
    if(!currents){
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]))
    }
    this.getFavoritesCharaceters();
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch(error) {
      console.log('Error cleaning localStorage', error);
    }
  }
}
