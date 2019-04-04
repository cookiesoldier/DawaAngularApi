import {Adresse} from './Adresse';

export class AutoAddress {
  tekst: string;
  adresse: Adresse;

  constructor(tekst: string, adresse: Adresse) {
    this.tekst = tekst;
    this.adresse = adresse;
  }

}
