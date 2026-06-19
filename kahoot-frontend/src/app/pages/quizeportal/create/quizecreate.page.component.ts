import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmBreadcrumbImports } from '@ui-lib/breadcrumb';
import { QuestioneditorComponent } from '../components/create/questioneditor/questioneditor.quizecreate.component';
import { EditorcanvasComponent } from '../components/create/editorcanvas/editorcanvas.quizecreate.component';
import { QuestionsidebarComponent } from '../components/create/questionsidebar/questionsidebar.quizecreate.component';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';

@Component({
  selector: 'page-quizecreate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HlmButtonImports,
    HlmBreadcrumbImports,
    QuestionsidebarComponent,
    EditorcanvasComponent,
    QuestioneditorComponent,
  ],
  templateUrl: './quizecreate.page.component.html',
})
export class QuizecreatePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly stateService = inject(QuestionStateManagementService);

  readonly quizId = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? 'new')));
}
