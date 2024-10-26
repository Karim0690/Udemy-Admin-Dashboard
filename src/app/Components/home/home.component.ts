import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { OrderService } from '../../Services/order.service';
import { ReviewService } from '../../Services/review.service';
import { ProductService } from '../../Services/product.service';
import { CatecoriesService } from '../../Services/catecories.service';
import { ICategory } from '../../Models/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../Models/iproduct';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pieChart: Chart | undefined;
  TotalOrders: number = 0;
  TotalCustomers: number = 0;
  TotalReviews: number = 0;
  TotalProducts: number = 0;
  TotalCategories: number = 0;

  Categories: ICategory = {
    _id: '',
    name: '',
    slug: '',
  };
  categoryProducts: number[] = []; // Initialize categoryProducts as an empty object
  categoyId: number = 0;
  constructor(
    private _userService: UserService,
    private _orderService: OrderService,
    private _reviewService: ReviewService,
    private _productService: ProductService,
    private _caegoryService: CatecoriesService
  ) {}

  ngOnInit() {
    this.allUsers();
    this.allOrders();
    this.allReviews();
    this.allProducts();
    this.getCategories();
  }
  allUsers() {
    this._userService.getAllUsers(10, 1).subscribe((response: any) => {
      this.TotalCustomers = response.count;
      this.updateChart();
    });
  }
  allOrders() {
    this._orderService.getOrders(10, 1).subscribe((response: any) => {
      this.TotalOrders = response.count;
      this.updateChart();
    });
  }
  allReviews() {
    this._reviewService.getAllReviews(10, 1).subscribe((response: any) => {
      this.TotalReviews = response.count;
      this.updateChart();
    });
  }
  allProducts() {
    this._productService.grtAllProducts(10, 1).subscribe((response: any) => {
      this.TotalProducts = response.count;
      this.updateChart();
    });
  }
  getCategories() {
    this._caegoryService.getAllCategories().subscribe((response: any) => {
      this.Categories = response;
      // this.TotalCategories = response.count;
      this.updateChart();

      // this.Categories.forEach((category: any, index: number) => {
      //   this._productService
      //     .getProductsByCategory(10, 1, category.id)
      //     .subscribe((res: any) => {
      //       if (res.count) {
      //         this.categoryProducts[index] = res.count;
      //       } else {
      //         this.categoryProducts[index] = 0;
      //       }
      //     });
      // });
    });
  }

  updateChart() {
    if (
      this.TotalCustomers &&
      this.TotalOrders &&
      this.TotalReviews &&
      this.TotalProducts &&
      this.TotalCategories
    ) {
      const chartData = [
        { name: 'Users', y: this.TotalCustomers, color: '#eeeeee' },
        { name: 'Categories', y: this.TotalCategories, color: '#393e46' },
        { name: 'Products', y: this.TotalProducts, color: '#00adb5' },
        { name: 'Orders', y: this.TotalOrders, color: '#506ef9' },
      ];

      this.pieChart = new Chart({
        chart: {
          type: 'pie',
          plotShadow: false,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            innerSize: '99%',
            borderWidth: 10,
            borderColor: '',
            slicedOffset: 0,
          },
        },
        title: {
          verticalAlign: 'middle',
          floating: true,
          text: 'Udemy',
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            type: 'pie',
            data: chartData,
          },
        ],
      });
    }
  }
}
