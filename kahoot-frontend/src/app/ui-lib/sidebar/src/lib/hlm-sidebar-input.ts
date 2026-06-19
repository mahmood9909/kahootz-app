import { Directive } from '@angular/core';
import { HlmInput } from '@ui-lib/input';
import { classes } from '@ui-lib/utils';

@Directive({
	selector: 'input[hlmSidebarInput]',
	hostDirectives: [HlmInput],
	host: {
		'data-slot': 'sidebar-input',
		'data-sidebar': 'input',
	},
})
export class HlmSidebarInput {
	constructor() {
		classes(() => 'bg-background h-8 w-full shadow-none');
	}
}
