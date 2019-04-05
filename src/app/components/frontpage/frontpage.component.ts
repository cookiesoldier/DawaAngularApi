import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DawaService} from '../../shared/services/dawa.service';
import {AutoAddress} from '../../shared/objects/AutoAddress';
import {AutoPostnummer} from '../../shared/objects/AutoPostnummer';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {arrayify} from 'tslint/lib/utils';
import {from} from 'rxjs/internal/observable/from';
import {distinct} from 'rxjs/operators';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  singleLineAddressOptions: AutoAddress[] = [];
  mySingleLineAddressControl = new FormControl({value: '', disabled: false});
  singleLineAddressSelected: AutoAddress;


  addressOptions: AutoAddress[] = [];
  myRoadControl = new FormControl({value: '', disabled: true});
  addressSelected: AutoAddress;

  myCityControl = new FormControl();
  cityOptions: AutoPostnummer[] = [];
  citySelected: AutoPostnummer;

  postnummerControl = new FormControl();
  postnummerOptions: AutoPostnummer[] = [];

  myRoadNumberControl = new FormControl({value: '', disabled: true});
  roadNrOptions: AutoAddress[] = [];
  roadNumberAddressSelected: AutoAddress;
  myFloorControl = new FormControl({value: '', disabled: true});


  constructor(private dawaService: DawaService) {
  }

  ngOnInit() {
  }


  postnummerOptionsAutoComplete() {
    this.postnummerOptions = [];
    this.dawaService.getAutocompletePostNumber(this.postnummerControl.value).subscribe(resp => {
      if (resp.status === 200) {
        this.postnummerOptions = JSON.parse(resp.body) as AutoPostnummer[];
      } else {
        console.log(resp.status);
      }
    }, error1 => {
      console.log(error1);
    });
  }


  cityOptionsAutoComplete() {
    this.cityOptions = [];
    this.dawaService.getAutocompletePostNumber(this.myCityControl.value).subscribe(resp => {
      if (resp.status === 200) {
        this.cityOptions = JSON.parse(resp.body) as AutoPostnummer[];
      } else {
        console.log(resp.status);
      }
    }, error1 => {
      console.log(error1);
    });
  }

  addressOptionsAutoComplete() {
    this.dawaService.getAutocompleteOptions(this.myRoadControl.value, this.citySelected, null).subscribe(resp => {
      function removeDuplicateAddress(addressOptions: AutoAddress[]) {
        const uniqueAddress: AutoAddress[] = [];
        for (const autoAdd of addressOptions) {
          if (!uniqueAddress.some(e => e.adresse.vejnavn === autoAdd.adresse.vejnavn)) {
            uniqueAddress.push(autoAdd);
          }
        }
        return uniqueAddress;
      }

      if (resp.status === 200) {
        this.addressOptions = [];
        // TODO
        // Sort out non distinct roads
        this.addressOptions = JSON.parse(resp.body) as AutoAddress[];
        // this.addressOptions = removeDuplicateAddress(this.addressOptions);
        this.addressOptions = removeDuplicateAddress(this.addressOptions);
      } else {
        console.log(resp.status);
      }
    }, error1 => {
      console.log(error1);
    });
  }


  roadNumberOptionsAutoComplete() {
    this.dawaService.getAutocompleteOptions(this.myRoadControl.value, this.citySelected, this.myRoadNumberControl.value).subscribe(resp => {
      function removeDuplicateAddress(addressOptions: AutoAddress[]) {
        const uniqueAddress: AutoAddress[] = [];
        for (const autoAdd of addressOptions) {
          if (!uniqueAddress.some(e => e.adresse.vejnavn === autoAdd.adresse.vejnavn)) {
            uniqueAddress.push(autoAdd);
          }
        }
        return uniqueAddress;
      }

      if (resp.status === 200) {
        this.roadNrOptions = [];
        this.roadNrOptions = DawaService.parseAutoAdress(resp) as AutoAddress[];
        // this.roadNrOptions = removeDuplicateAddress(this.roadNrOptions);
      } else {
        console.log(resp.status);
      }
    }, error1 => {
      console.log(error1);
    });
  }

  citySelect($event: MatAutocompleteSelectedEvent) {
    this.addressOptions = [];
    this.myRoadControl.setValue('');
    this.citySelected = this.cityOptions.filter((item) => {
      return item.postnummer.navn === this.myCityControl.value;
    })[0];
    if (this.citySelected && this.citySelected.postnummer.nr !== this.postnummerControl.value) {
      this.postnummerControl.setValue(this.citySelected.postnummer.nr);

    }
    if (this.citySelected) {
      this.myRoadControl.reset({value: '', disabled: false});
    } else {
      this.myRoadControl.reset({value: '', disabled: true});
    }
  }

  postnummerSelect() {
    this.addressOptions = [];
    this.myRoadControl.setValue('');

    this.citySelected = this.postnummerOptions.filter((item) => {
      return item.postnummer.nr === this.postnummerControl.value;
    })[0];
    if (this.citySelected && this.citySelected.postnummer.navn !== this.myCityControl.value) {
      this.myCityControl.setValue(this.citySelected.postnummer.navn);
    }
    if (this.citySelected) {
      this.myRoadControl.reset({value: '', disabled: false});
    } else {
      this.myRoadControl.reset({value: '', disabled: true});
    }
  }

  addressSelect() {
    this.addressSelected = this.addressOptions.filter((item) => {
      console.log(item.adresse.vejnavn);
      return item.adresse.vejnavn === this.myRoadControl.value;
    })[0];

    if (this.addressSelected) {
      this.myRoadNumberControl.reset({value: '', disabled: false});
    } else {
      this.myRoadNumberControl.reset({value: '', disabled: true});
    }
  }

  roadNumberSelect() {
    this.roadNumberAddressSelected = this.roadNrOptions.filter((item) => {
      console.log(item.adresse.vejnavn);
      return item.adresse.husnr === this.myRoadNumberControl.value;
    })[0];
  }

  floorOptionsAutoComplete() {

  }

  floorSelect() {

  }

  mySingleLineAddresOptionsAutoComplete() {
    this.dawaService.getAutocompleteOptions(this.mySingleLineAddressControl.value, this.citySelected, null).subscribe(resp => {
      function removeDuplicateAddress(addressOptions: AutoAddress[]) {
        const uniqueAddress: AutoAddress[] = [];
        for (const autoAdd of addressOptions) {
          if (!uniqueAddress.some(e => e.adresse.vejnavn === autoAdd.adresse.vejnavn)) {
            uniqueAddress.push(autoAdd);
          }
        }
        return uniqueAddress;
      }

      if (resp.status === 200) {
        this.singleLineAddressOptions = [];
        // TODO
        // Sort out non distinct roads
        this.singleLineAddressOptions = DawaService.parseAutoAdress(resp) as AutoAddress[];
        // this.addressOptions = removeDuplicateAddress(this.addressOptions);
        // this.addressOptions = removeDuplicateAddress(this.addressOptions);
      } else {
        console.log(resp.status);
      }
    }, error1 => {
      console.log(error1);
    });
  }

  mySingleLineAddressSelect() {
    console.log(this.mySingleLineAddressControl.value);
    this.singleLineAddressSelected = this.singleLineAddressOptions.filter((item) => {
      return item.tekst === this.mySingleLineAddressControl.value;
    })[0];
    console.log(this.singleLineAddressSelected);


  }
}
