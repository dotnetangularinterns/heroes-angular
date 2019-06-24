import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
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
      }, {
        id: 3,
        name: "Ashazi",
        pic: "",
        power: 2
      }, {
        id: 4,
        name: "New Guy",
        pic: "",
        power: -2
      }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new DashboardComponent(mockHeroService);
  });

  describe('ngOnInit', () => {
    it('should call getHeroes on initialization', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroList));

      component.ngOnInit();

      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    });
  });

  describe('getHeroes', () => {
    it('should get top 4 hereos from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(heroList));
  
      component.getHeroes();
  
      expect(component.heroes.length).toBe(4);
    });
  });
});