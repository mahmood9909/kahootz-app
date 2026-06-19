import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucidePanelLeft } from '@ng-icons/lucide';
import { HlmButton, provideBrnButtonConfig } from '@ui-lib/button';
import { HlmIconImports } from '@ui-lib/icon';
import { HlmSidebarService } from './hlm-sidebar.service';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[hlmSidebarTrigger]',
	imports: [HlmIconImports],
	providers: [provideIcons({ lucidePanelLeft }), provideBrnButtonConfig({ variant: 'ghost', size: 'icon-sm' })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: HlmButton,
		},
	],
	host: {
		'data-slot': 'sidebar-trigger',
		'data-sidebar': 'trigger',
		'(click)': '_onClick()',
	},
	template: `
		<ng-icon hlm name="lucidePanelLeft" size="sm"></ng-icon>
	`,
})
export class HlmSidebarTrigger {
	private readonly _sidebarService = inject(HlmSidebarService);

	protected _onClick(): void {
		this._sidebarService.toggleSidebar();
	}
}
