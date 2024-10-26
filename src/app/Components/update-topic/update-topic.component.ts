import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ISubcategories } from '../../Models/isubcategories';
import { SubcategoiesService } from '../../Services/subcategories.service';
import { ITopicResult } from '../../Models/itopic-result';
import { ITopicUpdate } from '../../Models/itopic-update';
import { TopicsService } from '../../Services/topics.service';

@Component({
  selector: 'app-update-topic',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './update-topic.component.html',
  styleUrl: './update-topic.component.css',
})
export class UpdateTopicComponent implements OnInit {
  subcategories: ISubcategories[] = [];
  topic: ITopicResult = {
    message: '',
    result: { _id: '', name: '', slug: '', subcategory: '' },
  };
  newTopic: ITopicUpdate = {
    _id: '',
    name: '',
    subcategory: '',
  };
  topicId: string = '';

  constructor(
    private _subcategoriesService: SubcategoiesService,
    private _topicsService: TopicsService,
    private _activeRouter: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.topicId = this._activeRouter.snapshot.paramMap.get('id') ?? '';
    if (this.topicId) {
      this.getTopic();
      this.newTopic._id = this.topicId;
    }
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

  getTopic() {
    this._topicsService
      .getTopicById(this.topicId)
      .subscribe((response: any) => {
        // console.log(response.result);
        this.newTopic = response.result;
        this.newTopic.name = response.result.name;
      });
  }

  UpdateTopic() {
    this._topicsService
      .updateTopic(this.newTopic)
      .subscribe({
        next: (res) => {
          console.log(res);

          this._router.navigateByUrl('/Topics');
        },
        error: (err) => {
          console.log(err);

          alert('Opps ! there is an error ,Please Try again');
        },
      });
  }
}
