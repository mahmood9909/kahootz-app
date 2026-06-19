import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';
import { QuestionType, QuizQuestion } from '@app-types';
import { QuestioneditorComponent } from '../components/create/questioneditor/questioneditor.quizecreate.component';
import { EditorcanvasComponent } from '../components/create/editorcanvas/editorcanvas.quizecreate.component';
import { QuestionsidebarComponent } from '../components/create/questionsidebar/questionsidebar.quizecreate.component';

export type { QuizQuestion };

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    name: 'What is the capital of France?',
    type: 'multiple-choice',
    points: 10,
    calculationAlgorithm: 'standard',
    timeLimit: 30,
    quizConfig: [
      {
        id: '1',
        title: 'What is the capital of France?',
        options: [
          { id: '1', title: 'Paris', config: { cssClass: 'option-paris' }, isCorrect: true },
          { id: '2', title: 'London', config: { cssClass: 'option-london' } },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'The Earth is flat.',
    type: 'true-false',
    points: 5,
    calculationAlgorithm: 'standard',
    timeLimit: 10,
    quizConfig: [],
  },
  {
    id: 3,
    name: 'Which planet is closest to the Sun?',
    type: 'multiple-choice',
    points: 10,
    calculationAlgorithm: 'standard',
    timeLimit: 30,
    quizConfig: [],
  },
];

@Component({
  selector: 'page-quizecreate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmBreadcrumbImports,
    QuestionsidebarComponent,
    EditorcanvasComponent,
    QuestioneditorComponent,
  ],
  templateUrl: './quizecreate.page.component.html',
})
export class QuizecreatePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly quizId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? 'new')));

  readonly questions = signal<QuizQuestion[]>(MOCK_QUESTIONS);
  readonly activeIndex = signal(0);
  readonly activeQuestion = computed(() => this.questions()[this.activeIndex()]);

  addQuestion(payload: { name: string; description: string; type: QuestionType }): void {}

  removeQuestion(index: number): void {
    this.questions.update((qs) => qs.filter((_, i) => i !== index));
    this.activeIndex.update((i) => Math.min(i, this.questions().length - 1));
  }

  updateQuestion(updated: QuizQuestion): void {
    this.questions.update((qs) => qs.map((q) => (q.id === updated.id ? updated : q)));
  }
}
