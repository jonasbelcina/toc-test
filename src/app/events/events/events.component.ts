import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventsService } from '../events.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: any;
  products: any;
  userImage: string;
  menuActive: boolean = false;
  nameQuery: string = '';
  productQuery: string = '';
  locationQuery: string = '';

  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEvents();
    this.getUserImage();
  }

  // get events from database
  getEvents(): void {
    this.eventsService.getEvents().subscribe(
      data => {
        const _data : any = data;
        const _events = _data.results;
        let eventsArr = []; // events array holder

        for (let i = 0; i < _events.length; i++) {

          // check if event has at least a name, if not event will not be displayed
          if (_events[i].name) {
            // create object to hold event
            const event = {
              id: _events[i].objectId,
              name: _events[i].name,
              locationName: _events[i].locationName,
              address: _events[i].address,
              city: _events[i].city,
              startDate: _events[i].startDate,
              endDate: _events[i].endDate,
              products: []
            };

            // push event object to events array holder
            eventsArr.push(event);
          }
        }

        this.events = eventsArr;
        this.getProducts();
      },
      err => {
        console.log(err);

      }
    );
  }

  // get products from database
  getProducts() {
    this.eventsService.getProducts().subscribe(
      data => {
        const _data: any = data;
        const _products = _data.results;

        // loop through all products
        for (let i = 0; i < _products.length; i++) {

          // loop through all events and find which event product is attached
          for (let j = 0; j < this.events.length; j++) {
            if (_products[i].event.objectId == this.events[j].id) {
              // save product to event
              this.events[j].products.push(_products[i]);
            }
          }

        }
      },
      err => {
        console.log(err);

      }
    );
  }

  logout() : void {
    this.authService.logout().subscribe(
      data => {

        // remove token from localStorage
        this.authService.deleteToken();
        this.authService.getToken();
        // remove user profile picture
        localStorage.removeItem('userImage');

        this.router.navigate(['login']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getUserImage(): void {
    const userImage = localStorage.getItem('userImage');
    if (userImage)
      this.userImage = userImage;
  }
}
