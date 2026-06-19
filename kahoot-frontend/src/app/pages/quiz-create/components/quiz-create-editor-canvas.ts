import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, viewChild, ViewContainerRef } from '@angular/core';
import { QuizQuestion } from '@app-types';
import { QUESTION_COMPONENT_REF } from '@core/config/component.config';

@Component({
  selector: 'quiz-create-editor-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container #placeholder />
  `,
})
export class QuizCreateEditorCanvasComponent implements AfterViewInit {
  readonly question = input.required<QuizQuestion>();
  readonly containerRef = viewChild.required('placeholder', { read: ViewContainerRef });
  readonly questionComponentConfig = inject(QUESTION_COMPONENT_REF);

  async ngAfterViewInit() {
    const ref = this.questionComponentConfig[this.question().type];
    const refg =   this.containerRef().createComponent(await ref.component());
  }
}
