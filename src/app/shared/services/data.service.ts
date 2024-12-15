import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Character, DataResponse, Episode } from '../interfaces/data.interfaces';
import { LocalStorageService } from './local-storage.service';

const QUERY = gql `
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();


  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private localStorageSvc: LocalStorageService
  ) {
    this.getDataAPI();
  }

  private getDataAPI(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const { characters, episodes } = data;
        // this.charactersSubject.next(characters.results);
        this.episodesSubject.next(episodes.results);
        this.parseCharactersData(characters.results)
      })
    ).subscribe();
  }

  private parseCharactersData(characters: Character[]): void {
    const currentFavs = this.localStorageSvc.getFavoritesCharaceters();
    const newData = characters.map(character => {
      const found = !!currentFavs.find((fav: Character) => fav.id === character.id);
      return {...character, isFavorite: found}
    });
    this.charactersSubject.next(newData)
  }
}
