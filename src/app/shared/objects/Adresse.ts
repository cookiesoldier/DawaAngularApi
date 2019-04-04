export class Adresse {
  id: string;
  href: string;
  vejnavn: string;
  husnr: string;
  etage: string;
  door: string;
  supplerendebynavn: string;
  postnr: string;
  postnrnavn: string;
  stormodtagerpostnr: string;
  stormodtagerpostnrnavn: string;

  constructor(id: string, href: string, vejnavn: string, husnr: string, etage: string, door: string, supplerendebynavn: string, postnr: string, postnrnavn: string, stormodtagerpostnr: string, stormodtagerpostnrnavn: string) {
    this.id = id;
    this.href = href;
    this.vejnavn = vejnavn;
    this.husnr = husnr;
    this.etage = etage;
    this.door = door;
    this.supplerendebynavn = supplerendebynavn;
    this.postnr = postnr;
    this.postnrnavn = postnrnavn;
    this.stormodtagerpostnr = stormodtagerpostnr;
    this.stormodtagerpostnrnavn = stormodtagerpostnrnavn;
  }
}
