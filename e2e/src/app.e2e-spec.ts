import { browser, element, by } from 'protractor';

describe('Heroes App', () => {

  const name = element(by.name('hero_name'));
  const pic = element(by.name('hero_pic'));
  const power = element(by.name('hero_power'));
  const addButton = element(by.buttonText('add'));
  let heroes;

  beforeEach(() => {
    browser.get('http://localhost:4200/heroes/');
    heroes = element.all(by.css('.heroes li'));
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('AngularTourOfHeroes');
  });

  it('should render all elements on initialization', () => {
    expect(heroes.count()).toEqual(4);
  });

  it('should enter data into fields', () => {
    name.sendKeys('Zed');
    pic.sendKeys('someurl.jpg');
    power.sendKeys(6);

    browser.sleep(1000);

    expect(name.getAttribute('value')).toEqual('Zed');
    expect(pic.getAttribute('value')).toEqual('someurl.jpg');
    expect(power.getAttribute('value')).toEqual('6');
  });

  it('should add a new hero to heroes list', () => {
    name.sendKeys('Zed');
    pic.sendKeys('someurl.jpg');
    power.sendKeys(6);
    addButton.click();

    browser.sleep(1000);

    const last = heroes.last();

    expect(last.getText()).toContain('Zed');
  });

  it('should delete hero from list', () => {
    // const deleteButtons = element.all(by.css('.heroes')).all(by.css('.delete'));
    const lastButton = heroes.last().element(by.css('.delete'));
    const oldId = heroes.last().element(by.binding('hero.id'));

    lastButton.click();

    browser.sleep(1000);

    const lastId = heroes.last().element(by.css('hero.id'));

    const matches = lastId === oldId;
    expect(matches).toBeFalsy();
  });
});
