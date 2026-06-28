import { CdkConnectedOverlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, Component, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { QOptionsStruct } from '@app-types';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideLogIn, lucideLogOut, lucideMoon, lucideSettings, lucideSun, lucideUser, lucideUserPlus } from '@ng-icons/lucide';
import { BrnInput } from '@spartan-ng/brain/input';
import { HlmButton } from '@ui-lib/button/src';
import { HlmCardImports } from '@ui-lib/card/src';
import { HlmInput } from "@ui-lib/input/src";

@Component({
  selector: 'planportal-truefalse-option',
  imports: [HlmCardImports, NgIcon,FormField , HlmButton, OverlayModule],
  templateUrl: './optiontruefalse.html',
  encapsulation: ViewEncapsulation.None,
  providers : provideIcons({ lucideUser, lucideSun, lucideMoon, lucideLogIn, lucideLogOut, lucideUserPlus, lucideLayoutDashboard, lucideSettings })
})
export class QTrueFalseOption {
  // ngAfterViewInit(): void {
  //   this.colorPickerIn()?.focus()
  // }
  detailsOpen = signal(false);
  input = input.required<FieldTree<QOptionsStruct, number, "writable">>()
  colorPickerIn = viewChild('colorPicker' , { read : HTMLInputElement });


  toggle() {
    this.detailsOpen.update(old => !old)
  }
  
}
