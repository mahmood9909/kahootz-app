import { ChangeDetectionStrategy, Component, ComponentRef, effect, inject, viewChild, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QStruct } from '@app-types';
import { QUESTION_COMPONENT_REF } from '@core/config/component.config';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';
import { HlmButton } from '@ui-lib/button/src/hlm-button.directive';

@Component({
  selector: 'planportal-editorcanvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editorcanvas.plancreate.component.html',
  imports: [HlmButton],
})
export class EditorcanvasComponent {
  private readonly stateService = inject(QuestionStateManagementService);
  readonly planId = this.stateService.activeQuestionIdState();
  readonly containerRef = viewChild.required('placeholder', { read: ViewContainerRef });
  readonly questionComponentConfig = inject(QUESTION_COMPONENT_REF);

  private componentRef: ComponentRef<unknown> | null = null;

  constructor() {
    effect(() => {
      const q = this.stateService.activeQuestionState();
      if (q) this.loadComponent(q);
    });
  }

  private async loadComponent(question: QStruct): Promise<void> {
    const config = this.questionComponentConfig[this.stateService.activeQuestionState().type];
    this.containerRef().clear();
    this.componentRef = this.containerRef().createComponent(await config.component());
  }
}
