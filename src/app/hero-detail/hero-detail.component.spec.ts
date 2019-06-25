import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    mockActivatedRoute = {
        snapshot: { paramMap: { get: () => '3'}}
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    TestBed.configureTestingModule({
        imports: [
            FormsModule
        ],
        declarations: [HeroDetailComponent],
        providers: [
            { provide: ActivatedRoute, useValue: mockActivatedRoute },
            { provide: HeroService, useValue: mockHeroService },
            { provide: Location, useValue: mockLocation }
        ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    // Pass hero for input
    mockHeroService.getHero.and.returnValue(of({ id: 2, name: 'Ashazi', pic: '', power: 2 }));
  });

  it('should render hero name in h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('ASHAZI');
  });

  it('should call update hero when save hero is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
