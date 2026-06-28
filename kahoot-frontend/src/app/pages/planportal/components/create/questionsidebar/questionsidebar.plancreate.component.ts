import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { QType } from '@app-types';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'planportal-questionsidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgClass, NgIcon, HlmButtonImports, HlmBadgeImports, HlmCardImports, HlmDialogImports, HlmAlertDialogImports, HlmSelectImports, HlmInputImports, HlmLabelImports, HlmTextareaImports],
  providers: [provideIcons({ lucidePlus, lucideTrash2 })],
  templateUrl: './questionsidebar.plancreate.component.html',
})
export class QuestionsidebarComponent {
  readonly stateService = inject(QuestionStateManagementService);
  readonly planId = toSignal(
    inject(ActivatedRoute).paramMap
      .pipe(
        map((p) => p.get('id')),
        tap((id) => this.stateService.activeQuestionIdState.set(id)))
  );

  readonly newQuestionName = signal('');
  readonly newQuestionDescription = signal('');
  readonly newQuestionType = signal<QType>('multiple-choice');

}
