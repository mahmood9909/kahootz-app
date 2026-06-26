import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucidePencil, lucideTrash2 } from '@ng-icons/lucide';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmCardImports } from '@ui-lib/card';
import { HlmBadgeImports } from '@ui-lib/badge';

interface PlanSummary {
  id: string;
  title: string;
  questionCount: number;
  updatedAt: string;
}

const MOCK_PLANS: PlanSummary[] = [
  { id: '1', title: 'World Capitals', questionCount: 10, updatedAt: 'Jun 12, 2026' },
  { id: '2', title: 'Science Basics', questionCount: 8, updatedAt: 'Jun 11, 2026' },
  { id: '3', title: 'History 101', questionCount: 15, updatedAt: 'Jun 10, 2026' },
];

@Component({
  selector: 'page-plans',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIcon, HlmButtonImports, HlmCardImports, HlmBadgeImports],
  providers: [provideIcons({ lucidePlus, lucidePencil, lucideTrash2 })],
  templateUrl: './plans.page.component.html',
})
export class PlansPageComponent {
  readonly plans = MOCK_PLANS;
}
