import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadingSubject = new BehaviorSubject(false);

  // Canvas loading screen
  showLoadingScreen(): void {
      this.isLoadingSubject.next(true);
  }

  hideLoadingScreen(): void {
      this.isLoadingSubject.next(false);
  }
}
