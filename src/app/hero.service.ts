import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
}

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'https://localhost:5001/api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('fetched heroes')), 
    catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe((tap(_ => this.log(`feteched hero id=${id}`)), 
    catchError(this.handleError<Hero>(`getHero id=${id}`))));
  }

  updateHero (hero : Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(tap(_ => this.log(`updated hero id=${hero.id}`)), 
    catchError(this.handleError<any>('updateHero')));
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)), 
    catchError(this.handleError<Hero>('addHero')));
  }
  
  deleteHero (hero: Hero | number): Observable<Hero> {
    let id: number;
    if (typeof hero === 'number') {
      id = hero;
    } else {
      id = hero.id;
    }
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(tap(_ => this.log(`deleted hero id=${id}`)), 
    catchError(this.handleError<Hero>('deleteHero')));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(tap(_ => this.log(`found heroes matching "${term}"`)), 
    catchError(this.handleError<Hero[]>('searchHeroes', [])))
  }

  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result ? : T) {
    return (error : any) : Observable<T> => {
      //console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      throw new error;
      return of(result as T);
    }
  }
}
