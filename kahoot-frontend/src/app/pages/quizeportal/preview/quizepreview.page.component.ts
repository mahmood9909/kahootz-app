import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';

@Component({
  selector: 'page-quizepreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HlmBreadcrumbImports],
  templateUrl: './quizepreview.page.component.html',
})
export class QuizepreviewPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly quizId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? 'new')));
}
