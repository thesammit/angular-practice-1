import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  isImageDisplayed: boolean = false;
  imageWidth: number = 22;
  private _listFilter: string;
  private _listFilterFrom: string;
  private _listFilterTo: string;
  products: IProduct[];
  filteredProducts: IProduct[];
  productHeaders: string[];
  headerMap: Object;
  filterType: string;
  textWidth: number = 55;
  recievedMessage: string;
 
  constructor(private productService: ProductService) {
    this.productHeaders = ['Product','Code','Availabe','Price','Rating'];
    this.filterType = this.productHeaders[0];
    this.headerMap = {
      Product : "productName",
      Code : "productCode",
      Availabe : "releaseDate",
      Price : "price",
      Rating : "rating"
    };
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  public get listFilter(): string {
    return this._listFilter;
  }  
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.filterProducts(this._listFilter) : this.products;
  }
  public get listFilterFrom(): string {
    return this._listFilterFrom;
  }
  public set listFilterFrom(value: string) {
    this._listFilterFrom = value;
    this.filteredProducts = this.filterProductsRange(this._listFilterFrom, this._listFilterTo);
  }
  public get listFilterTo(): string {
    return this._listFilterTo;
  }
  public set listFilterTo(value: string) {
    this._listFilterTo = value;
    this.filteredProducts = this.filterProductsRange(this._listFilterFrom, this._listFilterTo);
  }
  
  toggleImage() {
    this.isImageDisplayed = !this.isImageDisplayed;
  }

  onRatingClicked(message: string) : void{
    this.recievedMessage = message;
  }

  filterProducts(criteria: string): IProduct[] {
    this.recievedMessage = "";
    criteria = criteria.toLowerCase();
    console.log(this.headerMap[this.filterType]);
    return this.products.filter((product: IProduct) =>
      product[this.headerMap[this.filterType]].toLowerCase().indexOf(criteria) !== -1
    );
  }
  
  filterProductsRange(criteriaFrom: string, criteriaTo: string): IProduct[] {
    this.recievedMessage = "";
    criteriaTo = +criteriaFrom > +criteriaTo ? null : criteriaTo;
    console.log(this.headerMap[this.filterType]);
    if (criteriaTo && criteriaFrom) {
      let filteredProductsCopy = this.products.filter((product: IProduct) =>
        product[this.headerMap[this.filterType]] >= criteriaFrom
      );
      return filteredProductsCopy.filter((product: IProduct) =>
        product[this.headerMap[this.filterType]] <= criteriaTo
      );
    }
    if (criteriaFrom && !criteriaTo)
      return this.products.filter((product: IProduct) =>
        product[this.headerMap[this.filterType]] >= criteriaFrom
      );
    if(!criteriaFrom && criteriaTo)
      return this.products.filter((product: IProduct) =>
          product[this.headerMap[this.filterType]] <= criteriaTo
        );
    return this.products;
  }
}
