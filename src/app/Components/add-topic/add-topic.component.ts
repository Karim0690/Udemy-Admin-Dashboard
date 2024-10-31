import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ISubcategories } from '../../Models/isubcategories';
import { ITopicCreate } from '../../Models/itopic-create';
import { SubcategoiesService } from '../../Services/subcategories.service';
import { TopicsService } from '../../Services/topics.service';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './add-topic.component.html',
  styleUrl: './add-topic.component.css',
})
export class AddTopicComponent implements OnInit {
  newTopic: ITopicCreate = { name: '', subcategory: '', nameAr: '' };
  subcategories: ISubcategories[] = [];
  constructor(
    private _subcategoriesService: SubcategoiesService,
    private _TopicsService: TopicsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllSubcategories();
  }

  getAllSubcategories() {
    this._subcategoriesService.getAllSubcategories().subscribe({
      next: (response: any) => {
        this.subcategories = response.result; // Assuming response.result is an array
      },
      error: (error) => {
        alert('Please try again!');
      },
    });
  }

  addNewTopic() {
    console.log('Data being sent:', this.newTopic);
    this._TopicsService.createTopic(this.newTopic).subscribe({
      next: (response) => {
        this.newTopic = { name: '', subcategory: '', nameAr: '' };
        this.router.navigateByUrl('/Topics');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
