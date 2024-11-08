import { Routes } from '@angular/router';
import { CategoryComponent } from './Components/category/category.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { UpdateCategoryComponent } from './Components/update-category/update-category.component';
import { CourseComponent } from './Components/course/course.component';
import { OrderComponent } from './Components/order/order.component';
import { ReviewComponent } from './Components/review/review.component';
import { HomeComponent } from './Components/home/home.component';
import { UserComponent } from './Components/user/user.component';
import { CreateUserAccountComponent } from './Components/create-user-account/create-user-account.component';
import { LoginComponent } from './Components/login/login.component';
import { adminGuard } from './Guards/admin.guard';
import { AddSpecificationCategoryComponent } from './Components/add-specification-category/add-specification-category.component';
import { CategorySpecificationComponent } from './Components/category-specification/category-specification.component';
import { OrderItemsComponent } from './Components/order-items/order-items.component';
import { UpdateOrderStatusComponent } from './Components/update-order-status/update-order-status.component';
import { SubcategoriesComponent } from './Components/subcategories/subcategories.component';
import { AddSubcategoryComponent } from './Components/add-subcategory/add-subcategory.component';
import { UpdateSubcategoryComponent } from './Components/update-subcategory/update-subcategory.component';
import { TopicsComponent } from './Components/topics/topics.component';
import { AddTopicComponent } from './Components/add-topic/add-topic.component';
import { UpdateTopicComponent } from './Components/update-topic/update-topic.component';

export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent ,canActivate: [adminGuard] },
  {
    path: 'Categories',
    component: CategoryComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'AddCategory',
    component: AddCategoryComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'UpdateCategory/:id',
    component: UpdateCategoryComponent,
    canActivate: [adminGuard],
  },
  { path: 'courses', component: CourseComponent, canActivate: [adminGuard] },
  { path: 'Orders', component: OrderComponent, canActivate: [adminGuard] },
  {
    path: 'UpdateOrderStatus/:id',
    component: UpdateOrderStatusComponent,
    canActivate: [adminGuard],
  },
  { path: 'Reviews', component: ReviewComponent, canActivate: [adminGuard] },
  { path: 'Users', component: UserComponent, canActivate: [adminGuard] },
  {
    path: 'CreateUserAccount',
    component: CreateUserAccountComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'AddSubcategory',
    component: AddSubcategoryComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'UpdateSubcategory/:id',
    component: UpdateSubcategoryComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'Subcategories',
    component: SubcategoriesComponent,
    canActivate: [adminGuard],
  },
  { path: 'OrderItems/:id', component: OrderItemsComponent },
  {
    path: 'AddSpecificationCategory/:id',
    component: AddSpecificationCategoryComponent,
  },
  {
    path: 'SpecificationCategory/:id',
    component: CategorySpecificationComponent,
  },
  { path: 'Login', component: LoginComponent },
  { path: 'Topics', component: TopicsComponent },
  { path: 'AddTopic', component: AddTopicComponent },
  { path: 'UpdateTopic/:id', component: UpdateTopicComponent },
];
