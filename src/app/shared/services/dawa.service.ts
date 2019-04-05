import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AutoPostnummer} from '../objects/AutoPostnummer';
import {isNullOrUndefined} from 'util';
import {of} from 'rxjs';
import {AutoAddress} from '../objects/AutoAddress';

@Injectable({
  providedIn: 'root'
})
export class DawaService {

  constructor(private http: HttpClient) {
  }


  static parseAutoAdress(resp: HttpResponse<string>) {
    const jsonObj = JSON.parse(resp.body);
    const autoAddress = [];
    for (const autoAddres of jsonObj) {
      const contents = [];
      if (!isNullOrUndefined(autoAddres.adresse)) {
        const obj = new AutoAddress(autoAddres.tekst, autoAddres.adresse);
        obj.adresse.door = autoAddres.adresse['dør'];
        autoAddress.push(obj);
      }
    }
    return autoAddress;
  }

  /**
   * Gets autoCompleteOptions from string.
   * @param {number} autoCompleteString is the string to look for..
   * @param autoPostnummer if a postnummer object was found, use it to narrow down the search
   * @returns {Observable<any>} which the caller can subscribe to.
   */
  getAutocompleteOptions(autoCompleteString: string, autoPostnummer: AutoPostnummer, husnr: string) {
    if (autoPostnummer && husnr) {
      const url = 'https://dawa.aws.dk/adresser/autocomplete?' + 'q=' + autoCompleteString + ',' + husnr
        + '&postnr=' + autoPostnummer.postnummer.nr + '&per_side=200' + '&caretpos=' + autoCompleteString.length;
      console.log(url);
      return this.http.get(url, {
        observe: 'response',
        responseType: 'text'
      });
    } else if (autoPostnummer) {
      return this.http.get('https://dawa.aws.dk/adresser/autocomplete?' + 'q=' + autoCompleteString
        + '&postnr=' + autoPostnummer.postnummer.nr + '&per_side=200', {
        observe: 'response',
        responseType: 'text'
      });
    } else {
      return this.http.get('https://dawa.aws.dk/adresser/autocomplete?' + 'q=' + autoCompleteString + '&per_side=200', {
        observe: 'response',
        responseType: 'text'
      });
    }
  }

  getAutocompletePostNumber(autoCompletePostNumber: string) {
    return this.http.get('https://dawa.aws.dk/postnumre/autocomplete?' + 'q=' + autoCompletePostNumber, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
