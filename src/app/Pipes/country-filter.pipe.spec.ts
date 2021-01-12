import { CountryFilterPipe } from './country-filter.pipe';
import { Wycieczki } from '../mock';

describe('CountryFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryFilterPipe();
    expect(pipe).toBeTruthy();
  });
  
  it('get null products', () => {
    const pipe = new CountryFilterPipe();
    let retVal = pipe.transform(null, []);
    expect(retVal).toEqual([]);
  });
  
  it('get not null products', () => {
    const pipe = new CountryFilterPipe();
    let retVal = pipe.transform(Wycieczki, ['Polska']);
    expect(retVal.length).toEqual(3);
  });
});
