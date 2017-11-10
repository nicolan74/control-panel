import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchProductService } from '../search-product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(
    private searchProductService: SearchProductService
  ) { }

  ngOnInit() {
  }

  performSearch(searchParam): void {
    console.log(`User entered: ${searchParam.value}`);

    this.searchProductService.searchProducts(searchParam.value).subscribe(products => {
      this.products = products;
      console.log('THIS PRODUCTS ', this.products);
    },
      errMsg => {
        console.log('SEARCH ERROR MESSAGE', errMsg);
      },
      () => {

        console.log('SEARCH COMPLETE');
      }
    );
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    // console.log('Selected Product - OBJECT ', this.selectedProduct);
    console.log('Selected Product - ID ', this.selectedProduct.id);
    console.log('Selected Product - NAME ', this.selectedProduct.name);

  }

}
