import { Component, input } from '@angular/core';
import { QOptionsStruct } from '@app-types';

@Component({
  selector: 'planportal-truefalse-option',
  imports: [],
  templateUrl: './optiontruefalse.html',
})
export class QTrueFalseOption {
  input = input<QOptionsStruct>()
}
