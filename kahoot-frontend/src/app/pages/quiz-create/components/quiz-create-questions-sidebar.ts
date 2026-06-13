import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideTrash2 } from '@ng-icons/lucide';
import { HlmAlertDialogImports } from '@ui-lib/alert-dialog';
import { HlmBadgeImports } from '@ui-lib/badge';
import { HlmButtonImports } from '@ui-lib/button';
import { HlmDialogImports } from '@ui-lib/dialog';
import { HlmInputImports } from '@ui-lib/input';
import { HlmLabelImports } from '@ui-lib/label';
import { HlmSelectImports } from '@ui-lib/select';
import { QuizQuestion } from '../quiz-create';

@Component({
  selector: 'quiz-create-questions-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgIcon, HlmButtonImports, HlmBadgeImports, HlmDialogImports, HlmAlertDialogImports, HlmSelectImports, HlmInputImports, HlmLabelImports],
  providers: [provideIcons({ lucidePlus, lucideTrash2 })],
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
          <div class="group relative">
            <button
              class="w-full rounded-lg border px-3 py-2.5 text-left transition-colors"
              [ngClass]="activeIndex() === i
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-muted'"
              (click)="selectQuestion.emit(i)"
            >
              <div class="flex items-center gap-2 pr-6">
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

            <!-- Delete button — only on active card -->
            @if (activeIndex() === i) {
              <hlm-alert-dialog>
                <button
                  hlmAlertDialogTrigger
                  hlmBtn variant="ghost" size="icon"
                  class="absolute right-1 top-1 size-7 text-destructive opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                  (click)="$event.stopPropagation()"
                >
                  <ng-icon name="lucideTrash2" class="size-3.5" />
                </button>
                <ng-template hlmAlertDialogPortal>
                  <div hlmAlertDialogContent>
                    <div hlmAlertDialogHeader>
                      <h3 hlmAlertDialogTitle>Delete question?</h3>
                      <p hlmAlertDialogDescription>
                        Are you sure you want to delete <strong>"{{ question.title }}"</strong>?
                        This action cannot be undone.
                      </p>
                    </div>
                    <div hlmAlertDialogFooter>
                      <button hlmAlertDialogCancel>Cancel</button>
                      <button hlmAlertDialogAction variant="destructive" (click)="deleteQuestion.emit(i)">
                        Delete
                      </button>
                    </div>
                  </div>
                </ng-template>
              </hlm-alert-dialog>
            }
          </div>
        }
      </div>

      <!-- Add question -->
      <div class="shrink-0 border-t border-border/50 p-2">
        <hlm-dialog>
          <button
            hlmDialogTrigger
            hlmBtn variant="ghost" size="sm"
            class="w-full justify-start gap-1.5 border border-primary text-primary hover:bg-primary/10 hover:text-primary"
            (click)="initDialog()"
          >
            <ng-icon name="lucidePlus" class="size-4" />
            Add Question
          </button>
          <ng-template hlmDialogPortal>
            <hlm-dialog-content class="sm:max-w-2xl">
              <hlm-dialog-header>
                <h3 hlmDialogTitle>Add Question</h3>
              </hlm-dialog-header>

              <div class="grid grid-cols-2 gap-6">

                <!-- Left — form -->
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label hlmLabel for="new-q-name">Question Name</label>
                    <input
                      hlmInput
                      id="new-q-name"
                      type="text"
                      [value]="newQuestionName()"
                      (input)="newQuestionName.set($any($event.target).value)"
                      placeholder="Question name…"
                    />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label hlmLabel>Question Type</label>
                    <hlm-select [value]="newQuestionType()" [itemToString]="questionTypeLabel" (valueChange)="newQuestionType.set($any($event))">
                      <hlm-select-trigger class="w-full">
                        <hlm-select-value />
                      </hlm-select-trigger>
                      <ng-template hlmSelectPortal>
                        <hlm-select-content>
                          <hlm-select-item value="multiple-choice">Multiple Choice</hlm-select-item>
                          <hlm-select-item value="true-false">True / False</hlm-select-item>
                        </hlm-select-content>
                      </ng-template>
                    </hlm-select>
                  </div>
                </div>

                <!-- Right — description -->
                <div class="flex flex-col gap-1.5">
                  <label hlmLabel for="new-q-desc">Description <span class="text-muted-foreground font-normal">(optional)</span></label>
                  <textarea
                    hlmInput
                    id="new-q-desc"
                    rows="6"
                    placeholder="Add context or notes for this question…"
                    class="resize-none overflow-y-auto"
                    (input)="newQuestionDescription.set($any($event.target).value)"
                  ></textarea>
                </div>

              </div>

              <div class="flex gap-2 pt-2">
                <button hlmBtn hlmDialogClose (click)="confirmAdd()">Create</button>
                <button hlmBtn variant="destructive" brnDialogClose>Cancel</button>
              </div>
            </hlm-dialog-content>
          </ng-template>
        </hlm-dialog>
      </div>

    </div>
  `,
})
export class QuizCreateQuestionsSidebarComponent {
  readonly questions = input.required<QuizQuestion[]>();
  readonly activeIndex = input.required<number>();
  readonly selectQuestion = output<number>();
  readonly addQuestion = output<{ name: string; description: string; type: 'multiple-choice' | 'true-false' }>();
  readonly deleteQuestion = output<number>();

  readonly newQuestionName = signal('');
  readonly newQuestionDescription = signal('');
  readonly newQuestionType = signal<'multiple-choice' | 'true-false'>('multiple-choice');

  readonly questionTypeLabel = (value: string): string =>
    ({ 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False' })[value] ?? value;

  initDialog(): void {
    this.newQuestionName.set(`Question ${this.questions().length + 1}`);
    this.newQuestionDescription.set('');
    this.newQuestionType.set('multiple-choice');
  }

  confirmAdd(): void {
    this.addQuestion.emit({
      name: this.newQuestionName(),
      description: this.newQuestionDescription(),
      type: this.newQuestionType(),
    });
  }
}
