import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

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
  products: IProduct[] =[
    {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2016",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "rating": 3.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      "productId": 2,
      "productName": "Garden Cart",
      "productCode": "GDN-0023",
      "releaseDate": "March 18, 2016",
      "description": "15 gallon capacity rolling garden cart",
      "price": 32.99,
      "rating": 4.2,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    },
    {
      "productId": 5,
      "productName": "Hammer",
      "productCode": "TBX-0048",
      "releaseDate": "May 21, 2016",
      "description": "Curved claw steel hammer",
      "price": 8.9,
      "rating": 4.8,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    },
    {
      "productId": 8,
      "productName": "Saw",
      "productCode": "TBX-0022",
      "releaseDate": "May 15, 2016",
      "description": "15-inch steel blade hand saw",
      "price": 11.55,
      "rating": 3.7,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    },
    {
      "productId": 10,
      "productName": "Video Game Controller",
      "productCode": "GMG-0042",
      "releaseDate": "October 15, 2015",
      "description": "Standard two-button video game controller",
      "price": 35.95,
      "rating": 4.6,
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }
  ];
  filteredProducts: IProduct[];
  productHeaders: string[];
  headerMap: Object;
  filterType: string;
  textWidth: number = 55;
  recievedMessage: string;
 
  constructor() {
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
