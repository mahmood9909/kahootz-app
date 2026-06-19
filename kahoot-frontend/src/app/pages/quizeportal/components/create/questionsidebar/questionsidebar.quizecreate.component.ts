import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideTrash2 } from '@ng-icons/lucide';
import { HlmAlertDialogImports } from '@ui-lib/alert-dialog';
import { HlmBadgeImports } from '@ui-lib/badge';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmCardImports } from '@ui-lib/card';
import { HlmDialogImports } from '@ui-lib/dialog';
import { HlmInputImports } from '@ui-lib/input';
import { HlmLabelImports } from '@ui-lib/label';
import { HlmTextareaImports } from '@ui-lib/textarea';
import { HlmSelectImports } from '@ui-lib/select';
import { QuestionType, QuizQuestion } from '@app-types';

@Component({
  selector: 'quizeportal-questionsidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgIcon, HlmButtonImports, HlmBadgeImports, HlmCardImports, HlmDialogImports, HlmAlertDialogImports, HlmSelectImports, HlmInputImports, HlmLabelImports, HlmTextareaImports],
  providers: [provideIcons({ lucidePlus, lucideTrash2 })],
  templateUrl: './questionsidebar.quizecreate.component.html',
})
export class QuestionsidebarComponent {
  readonly questions = input.required<QuizQuestion[]>();
  readonly activeIndex = input.required<number>();
  readonly selectQuestion = output<number>();
  readonly addQuestion = output<{ name: string; description: string; type: QuestionType }>();
  readonly deleteQuestion = output<number>();

  readonly newQuestionName = signal('');
  readonly newQuestionDescription = signal('');
  readonly newQuestionType = signal<QuestionType>('multiple-choice');

  readonly questionTypeLabel = (value: string): string =>
    ({ 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False' })[value] ?? value;

  initDialog(): void {
    this.newQuestionName.set(`Question ${this.questions().length + 1}`);
    this.newQuestionDescription.set('');
    this.newQuestionType.set('multiple-choice');
  }

  confirmAdd(): void {
    this.addQuestion.emit({
      name: this.newQuestionName(),
      description: this.newQuestionDescription(),
      type: this.newQuestionType(),
    });
  }
}
