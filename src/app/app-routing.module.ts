import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-list/todo-detail/todo-detail.component';

const routes: Routes = [
  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: TodoDetailComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
