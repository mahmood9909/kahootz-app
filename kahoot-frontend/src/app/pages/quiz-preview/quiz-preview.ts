import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';

@Component({
  selector: 'app-quiz-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HlmBreadcrumbImports],
  template: `
    <div class="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">

      <!-- Toolbar -->
      <header class="flex h-14 shrink-0 items-center gap-3 border-b border-border/50 bg-background px-4">
        <nav hlmBreadcrumb>
          <ol hlmBreadcrumbList>
            <li hlmBreadcrumbItem>
              <a hlmBreadcrumbLink link="/quizzes">Quizzes</a>
            </li>
            <li hlmBreadcrumbSeparator></li>
            <li hlmBreadcrumbItem>
              <a hlmBreadcrumbLink [link]="['/quiz', quizId()]">Edit Quiz</a>
            </li>
            <li hlmBreadcrumbSeparator></li>
            <li hlmBreadcrumbItem>
              <span hlmBreadcrumbPage>Preview</span>
            </li>
          </ol>
        </nav>
      </header>

      <!-- Preview content (stub) -->
      <div class="flex flex-1 items-center justify-center bg-muted/10">
        <p class="text-sm text-muted-foreground">Quiz preview coming soon…</p>
      </div>

    </div>
  `,
})
export class QuizPreviewComponent {
  private readonly route = inject(ActivatedRoute);
  readonly quizId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? 'new')));
}
