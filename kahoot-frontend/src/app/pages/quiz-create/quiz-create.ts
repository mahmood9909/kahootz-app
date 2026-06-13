import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';
import { QuizCreateQuestionEditorComponent } from './components/quiz-create-question-editor';
import { QuizCreateQuestionPreviewComponent } from './components/quiz-create-question-preview';
import { QuizCreateQuestionsSidebarComponent } from './components/quiz-create-questions-sidebar';

export interface QuizQuestion {
  id: number;
  title: string;
  type: 'multiple-choice' | 'true-false';
  points: number;
  timeLimit: number;
  options: string[];
  imageUrl?: string;
}

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'What is the capital of France?',
    type: 'multiple-choice',
    points: 10,
    timeLimit: 30,
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
  {
    id: 2,
    title: 'The Earth is flat.',
    type: 'true-false',
    points: 5,
    timeLimit: 15,
    options: ['True', 'False'],
  },
  {
    id: 3,
    title: 'Which planet is closest to the Sun?',
    type: 'multiple-choice',
    points: 10,
    timeLimit: 30,
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
  },
];

@Component({
  selector: 'app-quiz-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmBreadcrumbImports,
    QuizCreateQuestionsSidebarComponent,
    QuizCreateQuestionPreviewComponent,
    QuizCreateQuestionEditorComponent,
  ],
  providers: [],
  template: `
    <div class="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">

      <!-- Toolbar -->
      <header class="flex h-14 shrink-0 items-center gap-3 border-b border-border/50 bg-background px-4">
        <nav hlmBreadcrumb>
          <ol hlmBreadcrumbList>
            <li hlmBreadcrumbItem>
              <a hlmBreadcrumbLink link="/quizzes">Quizzes</a>
            </li>
            <li hlmBreadcrumbSeparator></li>
            <li hlmBreadcrumbItem>
              <span hlmBreadcrumbPage>Edit Quiz</span>
            </li>
          </ol>
        </nav>
        <div class="ml-auto flex items-center gap-2">
          <a [routerLink]="['/quiz', quizId(), 'preview']" hlmBtn variant="outline" size="sm">
            Preview
          </a>
          <button hlmBtn variant="outline" size="sm">Save Draft</button>
          <button hlmBtn size="sm">Publish</button>
        </div>
      </header>

      <!-- 3-column workspace -->
      <div class="grid min-h-0 flex-1 grid-cols-[260px_1fr_320px] divide-x divide-border/50">
        <quiz-create-questions-sidebar
          [questions]="questions"
          [activeIndex]="activeIndex()"
          (selectQuestion)="activeIndex.set($event)"
        />
        <quiz-create-question-preview [question]="activeQuestion()" />
        <quiz-create-question-editor [question]="activeQuestion()" />
      </div>

    </div>
  `,
})
export class QuizCreateComponent {
  private readonly route = inject(ActivatedRoute);
  readonly quizId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? 'new')));

  readonly questions = MOCK_QUESTIONS;
  readonly activeIndex = signal(0);
  readonly activeQuestion = computed(() => this.questions[this.activeIndex()]);
}
