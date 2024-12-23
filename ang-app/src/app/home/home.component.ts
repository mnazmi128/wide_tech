import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Todos } from '../services/todo/interfaces/todos.interface';
import { Subject, takeUntil } from 'rxjs';
import { TodoService } from '../services/todo/todo.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  emailForm: FormGroup;
  todos: Todos;

  private readonly $destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private todosService: TodoService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl("", [Validators.required])
    },
    {
      validators: this.matchValidator('password', 'confirmPassword')
    });
    this.loadingService.showLoadingScreen();
    this.todosService.getTodos()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (response) => {
          this.loadingService.hideLoadingScreen();
          this.todos = response;
        },
        error: (err) => {
          this.loadingService.hideLoadingScreen();
          console.log(err);
        },
        complete: () => {
          this.loadingService.hideLoadingScreen();
          console.log("Fetch todos complete");
        }
      })
  }

  onSubmit() {
    if (this.emailForm.valid) {
      console.log(this.emailForm);
      alert('Form submitted successfully!');
    } else {
      this.emailForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  get name() {
    return this.emailForm.get('name');
  }

  get email() {
    return this.emailForm.get('email');
  }

  get password() {
    return this.emailForm.get('password');
  }

  get confirmPassword() {
    return this.emailForm.get('confirmPassword');
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }
  }

  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
  }
}
