import { Injectable } from '@angular/core';

import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITopics } from '../Models/itopics';
import { ITopicCreate } from '../Models/itopic-create';
import { ITopicUpdate } from '../Models/itopic-update';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllTopics(pageItem?: number, pageNumber?: number): Observable<ITopics[]> {
    return this.httpClient.get<ITopics[]>(`${this.apiUrl}topic`);
  }

  getTopicById(id: string): Observable<ITopics> {
    return this.httpClient.get<ITopics>(`${this.apiUrl}topic/${id}`);
  }
  deleteTopic(id: string): Observable<ITopics> {
    return this.httpClient.delete<ITopics>(`${this.apiUrl}topic/${id}`);
  }
  createTopic(topic: ITopicCreate): Observable<ITopics> {
    return this.httpClient.post<ITopics>(`${this.apiUrl}topic`, topic);
  }
  updateTopic(topic: ITopicUpdate): Observable<ITopicUpdate> {
    return this.httpClient.put<ITopicUpdate>(
      `${this.apiUrl}topic/${topic._id}`,
      {
        name: topic.name,
        nameAr: topic.nameAr,
        subcategory: topic.subcategory,
      }
    );
  }
  getTopicByName(name: string): Observable<ITopics[]> {
    return this.httpClient.post<ITopics[]>(
      `${this.apiUrl}topic/searchTopic?keyword=${name}`,
      {}
    );
  }
}
