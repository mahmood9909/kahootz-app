import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input, viewChild, ViewContainerRef } from '@angular/core';
import { QuizQuestion } from '@app-types';
import { QUESTION_COMPONENT_REF } from '@core/config/component.config';

@Component({
  selector: 'quizeportal-editorcanvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editorcanvas.quizecreate.component.html',
})
export class EditorcanvasComponent implements AfterViewInit {
  readonly question = input.required<QuizQuestion>();
  readonly containerRef = viewChild.required('placeholder', { read: ViewContainerRef });
  readonly questionComponentConfig = inject(QUESTION_COMPONENT_REF);

  async ngAfterViewInit() {
    const ref = this.questionComponentConfig[this.question().type];
    const componentRef = this.containerRef().createComponent(await ref.component());
    componentRef.setInput('question', this.question());
  }
}
