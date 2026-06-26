import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';

@Component({
  selector: 'page-planpreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HlmBreadcrumbImports],
  templateUrl: './planpreview.page.component.html',
})
export class PlanpreviewPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly planId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? 'new')));
}
