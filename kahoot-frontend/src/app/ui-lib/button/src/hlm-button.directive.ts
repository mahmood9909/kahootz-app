import { BrnButton } from '@spartan-ng/brain/button';
import { computed, Directive, inject, InjectionToken, input, type Provider } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { hlm } from '../../utils';

export const buttonVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50',
        destructive: 'bg-destructive/10 hover:bg-destructive/20 text-destructive',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 gap-1.5 px-2.5',
        xs: 'h-6 gap-1 px-2 text-xs',
        sm: 'h-8 gap-1 px-2.5',
        lg: 'h-10 gap-1.5 px-2.5',
        icon: 'size-9',
        'icon-xs': 'size-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface BrnButtonConfig {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
}

export const BRN_BUTTON_CONFIG = new InjectionToken<BrnButtonConfig>('BrnButtonConfig');

export function provideBrnButtonConfig(config: BrnButtonConfig): Provider {
  return { provide: BRN_BUTTON_CONFIG, useValue: config };
}

@Directive({
  selector: 'button[hlmBtn], a[hlmBtn]',
  exportAs: 'hlmBtn',
  hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
  host: {
    'data-slot': 'button',
    '[class]': '_computedClass()',
  },
})
export class HlmButton {
  private readonly _config = inject(BRN_BUTTON_CONFIG, { optional: true });
  public readonly variant = input<ButtonVariants['variant']>(this._config?.variant ?? 'default');
  public readonly size = input<ButtonVariants['size']>(this._config?.size ?? 'default');

  protected readonly _computedClass = computed(() =>
    hlm(buttonVariants({ variant: this.variant(), size: this.size() })),
  );
}

export const HlmButtonImports = [HlmButton] as const;
