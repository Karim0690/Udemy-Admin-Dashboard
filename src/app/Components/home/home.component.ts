import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { OrderService } from '../../Services/order.service';
import { ReviewService } from '../../Services/review.service';
import { CourseService } from '../../Services/course.service';
import { CatecoriesService } from '../../Services/catecories.service';
import { ICategory } from '../../Models/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, ChartModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pieChart: Chart | undefined;
  TotalOrders: number = 0;
  TotalCustomers: number = 0;
  TotalReviews: number = 0;
  TotalCourses: number = 0;
  TotalCategories: number = 0;

  Categories: ICategory[] =[ {
    _id: '',
    name: '',
    slug: '',
    nameAr: '',
  }];
  categoryProducts: number[] = []; // Initialize categoryProducts as an empty object
  categoyId: number = 0;
  constructor(
    private _userService: UserService,
    private _orderService: OrderService,
    private _reviewService: ReviewService,
    private _courseService: CourseService,
    private _categoryService: CatecoriesService
  ) {}

  ngOnInit() {
    this.allUsers();
    this.allOrders();
    this.allReviews();
    this.allCourses();
    this.getCategories();
  }

  allUsers() {
    this._userService.getAllUsers(10, 1).subscribe((response: any) => {
      this.TotalCustomers = response.count;
      this.updateChart();
    });
  }

  allOrders() {
    this._orderService.getOrders().subscribe((response: any) => {
      this.TotalOrders = response.count;
      this.updateChart();
    });
  }

  allReviews() {
    this._reviewService.getAllReviews().subscribe((response: any) => {
      this.TotalReviews = response.data;
      // this.TotalReviews = response.count;
      this.updateChart();
    });
  }

  allCourses() {
    this._courseService.getAllCourses().subscribe((response: any) => {
      this.TotalCourses = response.count;
      this.updateChart();
    });
  }

  getCategories() {
    this._categoryService.getAllCategories().subscribe((response: ICategory[]) => {
      this.Categories = response;
      this.TotalCategories = response.length; // Assuming you want the total number of categories
      this.updateChart();
    });
  }

  updateChart() {
    if (
      this.TotalCustomers &&
      this.TotalOrders &&
      this.TotalReviews &&
      this.TotalCourses &&
      this.TotalCategories
    ) {
      const chartData = [
        { name: 'Users', y: this.TotalCustomers, color: '#eeeeee' },
        { name: 'Categories', y: this.TotalCategories, color: '#393e46' },
        { name: 'Courses', y: this.TotalCourses, color: '#00adb5' },
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
          text: 'Udemy Statistics',
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
