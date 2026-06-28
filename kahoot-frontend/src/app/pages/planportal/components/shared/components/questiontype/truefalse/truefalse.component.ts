import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { QStruct } from '@app-types';
import { QuestionContentcardComponent } from '../../questioncontentcard/questioncontentcard.component';
import { form } from '@angular/forms/signals';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';
import { QTrueFalseOption } from './componenets/optiontruefalse/optiontruefalse';

interface TrueFalseModel {
  title: string;

}

@Component({
  selector: 'planportal-truefalse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuestionContentcardComponent, QTrueFalseOption],
  templateUrl: './truefalse.component.html',
  host: { class: 'block h-full' },
})
export class TrueFalseComponent {

  //region state controller
  readonly stateService = inject(QuestionStateManagementService);
  //endregion

  //region component ctx controller
  private readonly _model = signal<Partial<QStruct>>
    ({
      title: this.stateService.activeQuestionState().title ?? '',
      options: this.stateService.activeQuestionState().options ?? []
    });

  readonly formModel = form(this._model);
  //endregion

  t() {
    // if (this.formModel.options!!() && this.formModel.options!!().value.length <= 2) return;
    this.formModel.options!!().value.update(old =>
      [...old,
      {
        id: crypto.randomUUID(),
        title: 'test new title',
        config: { cssClass: 'option-london' }
      }
      ])
    //  { id: crypto.randomUUID(), title: 'test new title', config: { cssClass: 'option-london' } },
    // )
  }


}
