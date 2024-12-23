import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Todos } from './interfaces/todos.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private apiService: ApiService
  ) { }

  getTodos(): Observable<Todos> {
    return this.apiService.get("https://jsonplaceholder.typicode.com/todos/1", {})
  }
}
