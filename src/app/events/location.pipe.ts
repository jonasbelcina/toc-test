import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((event: any) => {
      if (event.locationName.toLowerCase().includes(args.toLowerCase())
        || event.address.toLowerCase().includes(args.toLowerCase())
        || event.city.toLowerCase().includes(args.toLowerCase()) ) {
        return true;
      }
    });
  }

}
