import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucidePencil, lucideTrash2 } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmCardImports } from '@ui-lib/card';
import { HlmBadgeImports } from '@ui-lib/badge';

interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
  updatedAt: string;
}

const MOCK_QUIZZES: QuizSummary[] = [
  { id: '1', title: 'World Capitals', questionCount: 10, updatedAt: 'Jun 12, 2026' },
  { id: '2', title: 'Science Basics', questionCount: 8, updatedAt: 'Jun 11, 2026' },
  { id: '3', title: 'History 101', questionCount: 15, updatedAt: 'Jun 10, 2026' },
];

@Component({
  selector: 'app-quizzes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIcon, HlmButtonImports, HlmCardImports, HlmBadgeImports],
  providers: [provideIcons({ lucidePlus, lucidePencil, lucideTrash2 })],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-10">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">My Quizzes</h1>
          <p class="mt-1 text-sm text-muted-foreground">Manage and create your quizzes.</p>
        </div>
        <a [routerLink]="['/quiz', 'new']" hlmBtn size="sm" class="gap-1.5">
          <ng-icon name="lucidePlus" class="size-4" />
          New Quiz
        </a>
      </div>

      <!-- Quiz grid -->
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (quiz of quizzes; track quiz.id) {
          <div hlmCard class="flex flex-col justify-between gap-4 p-5">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h2 class="text-sm font-semibold leading-tight">{{ quiz.title }}</h2>
                <span hlmBadge variant="secondary" class="shrink-0">
                  {{ quiz.questionCount }} Qs
                </span>
              </div>
              <p class="mt-1.5 text-xs text-muted-foreground">Updated {{ quiz.updatedAt }}</p>
            </div>
            <div class="flex items-center gap-2">
              <a [routerLink]="['/quiz', quiz.id]" hlmBtn variant="outline" size="sm" class="flex-1 gap-1.5">
                <ng-icon name="lucidePencil" class="size-3.5" />
                Edit
              </a>
              <button hlmBtn variant="ghost" size="icon" class="size-8 text-destructive hover:text-destructive">
                <ng-icon name="lucideTrash2" class="size-4" />
              </button>
            </div>
          </div>
        }
      </div>

      @if (quizzes.length === 0) {
        <div class="mt-20 flex flex-col items-center gap-3 text-center">
          <p class="text-sm text-muted-foreground">No quizzes yet.</p>
          <a [routerLink]="['/quiz', 'new']" hlmBtn size="sm" class="gap-1.5">
            <ng-icon name="lucidePlus" class="size-4" />
            Create your first quiz
          </a>
        </div>
      }

    </div>
  `,
})
export class QuizzesComponent {
  readonly quizzes = MOCK_QUIZZES;
}
