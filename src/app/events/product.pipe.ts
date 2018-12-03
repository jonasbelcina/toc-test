import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter(event => {
      if (event.products.length > 0) {
        let productFound = false;

        event.products.forEach(product => {
          if (product.name.toLowerCase().includes(args.toLowerCase())) {
            productFound = true;
          }
        });

        if (productFound)
          return true;
      }
    });
  }

}
