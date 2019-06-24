import { HeroService } from "./hero.service";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('HeroService', () => {
    let service: HeroService;
    let mockMockMessageService;
    let httpTestingController: HttpTestingController;
    let heroesUrl;
    let HEROES;

    beforeEach(() => {
        mockMockMessageService = jasmine.createSpyObj(['add', 'clear']);
        heroesUrl = 'https://localhost:5001/api/heros';
        HEROES = [
            { id:0, name: "Pasha", pic: "https://spng.pngfly.com/20190305/zga/kisspng-t-shirt-dabbing-unicorn-mens-tank-top-dabbing-un-unicorn-dab-sticker-by-ona-maria-acuna-escano-5c7ee36e662318.0101235515518196304184.jpg", power:99.99 },
            { id:1, name: "Chris", pic: "https://images.homedepot-static.com/productImages/c0e81cb5-551b-4263-afe3-c727fceaa2af/svn/everbilt-hex-nuts-804076-64_1000.jpg", power:0.001 },
            { id:2, name: "Marcus", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power:-69.0 },
        ]

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMockMessageService }
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    });

    describe('getHeros', () => {
        it('should return an Observable<Hero[]>', () => {

            service.getHeroes().subscribe((heroList) => {
                expect(heroList.length).toBe(3);
                expect(heroList).toEqual(HEROES);
            });

            const req = httpTestingController.expectOne(heroesUrl);

            expect(req.request.method).toBe('GET');

            req.flush(HEROES);

            httpTestingController.verify();
        });
    });

    describe('getHero', () => {
        it('should call get with correct url', () => {
            const heroData = { id: 0, name: 'Pasha', pic: "https://spng.pngfly.com/20190305/zga/kisspng-t-shirt-dabbing-unicorn-mens-tank-top-dabbing-un-unicorn-dab-sticker-by-ona-maria-acuna-escano-5c7ee36e662318.0101235515518196304184.jpg", power: 99.99 };

            service.getHero(0).subscribe((res) => {
                expect(res).toEqual(heroData);
            });

            const req = httpTestingController.expectOne(heroesUrl + "/0");
            req.flush(heroData);

            httpTestingController.verify();
        });
    });

    describe('addHero', () => {
        it('should add a hero with correct information', () => {
            const mockHero = { id: 3, name: "Mike", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power: 2 };

            service.addHero({ id: 3, name: "Mike", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power: 2 }).subscribe((res) => {
                expect(res.id).toEqual(3);
                expect(res.name).toEqual('Mike');
                expect(res.pic).toEqual('https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg');
                expect(res.power).toEqual(2);
            });
            
            const req = httpTestingController.expectOne(heroesUrl);
            expect(req.request.method).toEqual('POST');
            req.flush(mockHero);

            httpTestingController.verify();
        });
    });

    describe('updateHero', () => {
        it('should update a hero with the correct information', () => {
            const mockHero = { 
                id: 3, 
                name: "Mikaela", 
                pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", 
                power: 2 
            };

            service.updateHero({ id: 3, name: "Mikaela", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power: 2 }).subscribe((res) => {
                expect(res.id).toEqual(3);
                expect(res.name).toEqual('Mikaela');
                expect(res.pic).toEqual('https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg');
                expect(res.power).toEqual(2);
            });
            
            const req = httpTestingController.expectOne(heroesUrl);

            expect(req.request.method).toEqual('PUT');

            req.flush(mockHero);

            httpTestingController.verify();
        });
    });

    describe('deleteHero', () => {
        it('should delete the correct hero', () => {
            service.deleteHero({ id: 3, name: "Mikaela", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power: 2 }).subscribe((result) => {
                expect(result.id).toEqual(3);
            });

            const req = httpTestingController.expectOne(heroesUrl + "/3");

            expect(req.request.method).toBe('DELETE');

            req.flush({ id: 3, name: "Mikaela", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power: 2 });

            httpTestingController.verify();
        });

        it('should delete hero with correct id', () => {
            let id: number = 3;
            service.deleteHero(id).subscribe((result => {
                expect(id).toEqual(result.id);
            }));

            const req = httpTestingController.expectOne(heroesUrl + "/3");

            expect(req.request.method).toBe('DELETE');

            req.flush({ id: 3, name: "Mikaela", pic: "https://i.ytimg.com/vi/sq0iNAqrT9c/maxresdefault.jpg", power: 2 });

            httpTestingController.verify();
        });
    });

    describe('searchHeroes', () => {
        it('should return heroes that contain specified string in their name', () => {
            service.searchHeroes('a').subscribe(result => {
                let filtered = HEROES.filter(hero => hero.name.includes(result));
                expect(filtered.length).toBe(2);
            });

            const req = httpTestingController.expectOne(heroesUrl + "/v/?name=a");

            expect(req.request.method).toBe('GET');

            req.flush('a');

            httpTestingController.verify;
        });

        it('should return empty array if input is empty', () => {
            const term = ''
            service.searchHeroes(term).subscribe((response) => {
                expect(response).toEqual([]);
            });

            httpTestingController.expectNone(heroesUrl + "/v/?name=");

            httpTestingController.verify;
        });
    });

});