import { ChangeDetectorRef, Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ang-app';
  isLoading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initLoadingScreenSubscriber();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initLoadingScreenSubscriber(): void {
    this.loadingService.isLoadingSubject.pipe(takeUntil(this.destroy$)).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
      this.cdr.detectChanges();
    });
  }
}
