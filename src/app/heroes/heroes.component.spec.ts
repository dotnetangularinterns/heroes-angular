import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let heroList;
  let mockHeroService;

  beforeEach(() => {
    heroList = [
      {
        id: 0,
        name: "Pasha",
        pic: "https://spng.pngfly.com/20190305/zga/kisspng-t-shirt-dabbing-unicorn-mens-tank-top-dabbing-un-unicorn-dab-sticker-by-ona-maria-acuna-escano-5c7ee36e662318.0101235515518196304184.jpg",
        power: 99.99
      }, {
        id: 1,
        name: "Chris",
        pic: "https://images.homedepot-static.com/productImages/c0e81cb5-551b-4263-afe3-c727fceaa2af/svn/everbilt-hex-nuts-804076-64_1000.jpg",
        power: 0.001
      }, {
        id: 2,
        name: "Marcus",
        pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg",
        power: -69.0
      }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('ngOnInit', () => {
    it('should call getHeroes on initialization', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroList));

      component.ngOnInit();

      expect(component.heroes.length).toBe(3);

      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    });
  });

  describe('getHeroes', () => {
    it('should get hereos from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroList));
  
      component.getHeroes();
  
      expect(component.heroes.length).toBe(3);
    });
  });

  describe('add', () => {
    it('should add a hero to the hero list', () => {
      mockHeroService.addHero.and.returnValue(of({ Id: 3, Name: 'Ashazi', Pic: '', Power: 2 }));

      component.heroes = heroList;

      component.add('Ashazi', '', 2);

      let added = component.heroes.some(hero => hero.Name == 'Ashazi');
      
      expect(added).toBe(true);
      expect(component.heroes.slice(-1)[0].Name).toBe('Ashazi');
    });
  });

  describe('delete', () => {
    it('should delete specified hero from list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = heroList;

      component.delete(heroList[2]);

      let remains = component.heroes.some(hero => hero.Id == 2);

      expect(remains).toBe(false);
    });
  });
});