import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@ui-lib/badge';
import { HlmButtonImports } from '@ui-lib/button';
import { QuizQuestion } from '../quiz-create';

@Component({
  selector: 'quiz-create-questions-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgIcon, HlmButtonImports, HlmBadgeImports],
  providers: [provideIcons({ lucidePlus })],
  template: `
    <div class="flex h-full flex-col overflow-hidden bg-muted/20">

      <!-- Header -->
      <div class="flex h-12 shrink-0 items-center justify-between border-b border-border/50 px-4">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Questions</span>
        <span class="text-xs text-muted-foreground">{{ questions().length }}</span>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        @for (question of questions(); track question.id; let i = $index) {
          <button
            class="w-full rounded-lg border px-3 py-2.5 text-left transition-colors"
            [ngClass]="activeIndex() === i
              ? 'border-primary bg-primary/5'
              : 'border-border hover:bg-muted'"
            (click)="selectQuestion.emit(i)"
          >
            <div class="flex items-center gap-2">
              <span
                hlmBadge
                [variant]="activeIndex() === i ? 'default' : 'secondary'"
                class="size-5 shrink-0 rounded-full p-0 text-[10px]"
              >{{ i + 1 }}</span>
              <span class="truncate text-sm font-medium">{{ question.title }}</span>
            </div>
            <div class="mt-1 pl-7 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{{ question.type === 'multiple-choice' ? 'Multiple choice' : 'True / False' }}</span>
              <span>·</span>
              <span>{{ question.points }} pts</span>
              <span>·</span>
              <span>{{ question.timeLimit }}s</span>
            </div>
          </button>
        }
      </div>

      <!-- Add question -->
      <div class="shrink-0 border-t border-border/50 p-2">
        <button hlmBtn variant="ghost" size="sm" class="w-full justify-start gap-1.5">
          <ng-icon name="lucidePlus" class="size-4" />
          Add Question
        </button>
      </div>

    </div>
  `,
})
export class QuizCreateQuestionsSidebarComponent {
  readonly questions = input.required<QuizQuestion[]>();
  readonly activeIndex = input.required<number>();
  readonly selectQuestion = output<number>();
}
