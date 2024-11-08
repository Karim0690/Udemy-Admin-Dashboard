// src/app/models/course.model.ts
export interface ICourse {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  instructor: { name: string };
  price: string;
  level: string;
  courseImage: string;
  promotionalVideo: string;
  bestSaller: boolean;
  highestRated: boolean;
  category: string;
  subcategory: string;
  topics: string[];
  language: string;
  rating: {
    average: number;
    count: number;
  };
  enrollments: number;
  learningObjective: string[];
  requirements: string[];
  courseFor: string[];
  progress: number;
}
