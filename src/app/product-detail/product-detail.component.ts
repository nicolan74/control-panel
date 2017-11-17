import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchProductService } from '../search-product.service';
import { Product } from '../../models/product';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private searchProductService: SearchProductService
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('ID PASSATO DA PRODUCT COMPONENT ', id);

    this.searchProductService.loadProductDetails(id).subscribe(product => {
      console.log('PRODOTTO ', product);
      this.product = product;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
