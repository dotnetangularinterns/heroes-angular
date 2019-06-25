import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'https://localhost:5001/api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions);
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    let id: number;
    if (typeof hero === 'number') {
      id = hero;
    } else {
      id = hero.id;
    }
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`);
  }
}
