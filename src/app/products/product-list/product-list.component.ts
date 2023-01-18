import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]> = this.productService.products$;
  productsNumber$: Observable<number>;

  selectedProduct: Product;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  pageNumber = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.pageNumber--;
    this.selectedProduct = null;
  }

  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.pageNumber++;
    this.selectedProduct = null;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) {

    this.productsNumber$ = this
                            .products$
                            .pipe(
                              map(products => products.length),
                              startWith(0)
                            )

    // productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

}
