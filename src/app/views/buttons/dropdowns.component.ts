import {Component, OnDestroy} from '@angular/core';

@Component({
  templateUrl: 'dropdowns.component.html',
  styleUrls: ['dropdowns.component.css']
})
export class DropdownsComponent implements OnDestroy {

  status: { isOpen: boolean } = { isOpen: false };
  disabled: boolean = false;
  isDropup: boolean = true;
  autoClose: boolean = false;

  /*items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];*/
  items:any=[
  {
    "name":"César",
    "lastName":"Cárdenas",
    "motherLastName":"Luna",
    "age":32,
    "gender":"Masculino",
    "degree":"6"
  },
  {
    "name":"Armando",
    "lastName":"Cárdenas",
    "motherLastName":"Luna",
    "age":45,
    "gender":"Masculino",
    "degree":"3"
  },
  {
    "name":"Claudia",
    "lastName":"Cárdenas",
    "motherLastName":"Luna",
    "age":32,
    "gender":"Femenino",
    "degree":"1"
  },
  {
    "name":"Héctor",
    "lastName":"Cárdenas",
    "motherLastName":"Luna",
    "age":32,
    "gender":"Masculino",
    "degree":"5"
  },
  {
    "name":"Alejandro",
    "lastName":"Cárdenas",
    "motherLastName":"Luna",
    "age":32,
    "gender":"Masculino",
    "degree":"2"
  }
  ];

  constructor() { }

  ngOnDestroy () {
    this.status.isOpen = false;
  }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isOpen = !this.status.isOpen;
  }

  change(value: boolean): void {
    this.status.isOpen = value;
  }
}
