import {Postnummer} from './Postnummer';

export class AutoPostnummer {
  tekst: string;
  postnummer: Postnummer;

  constructor(tekst: string, postnummer: Postnummer) {
    this.tekst = tekst;
    this.postnummer = postnummer;
  }

}
