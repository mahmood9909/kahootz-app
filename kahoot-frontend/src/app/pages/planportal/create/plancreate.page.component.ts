import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';
import { QuestioneditorComponent } from '../components/create/questioneditor/questioneditor.plancreate.component';
import { EditorcanvasComponent } from '../components/create/editorcanvas/editorcanvas.plancreate.component';
import { QuestionsidebarComponent } from '../components/create/questionsidebar/questionsidebar.plancreate.component';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';

@Component({
  selector: 'page-plancreate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmBreadcrumbImports,
    QuestionsidebarComponent,
    EditorcanvasComponent,
    QuestioneditorComponent,
  ],
  templateUrl: './plancreate.page.component.html',
})
export class PlancreatePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly stateService = inject(QuestionStateManagementService);

  readonly planId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id'))));
}
