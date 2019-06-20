import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const heroes = [
      { id: 11, name: 'Jotaro' },
      { id: 12, name: 'Joseph' },
      { id: 13, name: 'Avdol' },
      { id: 14, name: 'Kakyoin' },
      { id: 15, name: 'Polnareff' },
      { id: 16, name: 'Iggy' },
      { id: 17, name: 'Dio' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]) : number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11
  }
}
