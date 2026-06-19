import { ChangeDetectionStrategy, Component, ComponentRef, effect, inject, viewChild, ViewContainerRef } from '@angular/core';
import { QuizQuestion } from '@app-types';
import { QUESTION_COMPONENT_REF } from '@core/config/component.config';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';
import { HlmButton } from '@ui-lib/button/src/hlm-button.directive';

@Component({
  selector: 'quizeportal-editorcanvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editorcanvas.quizecreate.component.html',
  imports: [HlmButton],
})
export class EditorcanvasComponent {
  private readonly stateService = inject(QuestionStateManagementService);
  readonly containerRef = viewChild.required('placeholder', { read: ViewContainerRef });
  readonly questionComponentConfig = inject(QUESTION_COMPONENT_REF);

  private componentRef: ComponentRef<unknown> | null = null;

  constructor() {
    effect(() => {
      const q = this.stateService.activeQuestion();
      if (q) this.loadComponent(q);
    });
  }

  private async loadComponent(question: QuizQuestion): Promise<void> {
    const config = this.questionComponentConfig[question.type];
    this.containerRef().clear();
    this.componentRef = this.containerRef().createComponent(await config.component());
    this.componentRef.setInput(config.input['question'], question);
  }
}
