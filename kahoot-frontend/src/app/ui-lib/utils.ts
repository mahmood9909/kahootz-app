import { DestroyRef, ElementRef, Injector, PLATFORM_ID, effect, inject, runInInjectionContext } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function hlm(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function toClassList(value: ClassValue[] | string): string[] {
  const str = typeof value === 'string' ? value : twMerge(clsx(value));
  return str.split(' ').filter(Boolean);
}

export function classes(
  computed: () => ClassValue[] | string,
  options: { elementRef?: ElementRef<HTMLElement>; injector?: Injector } = {},
) {
  runInInjectionContext(options.injector ?? inject(Injector), () => {
    const elementRef = options.elementRef ?? inject<ElementRef<HTMLElement>>(ElementRef);
    const platformId = inject(PLATFORM_ID);
    const destroyRef = inject(DestroyRef);
    const el = elementRef.nativeElement as HTMLElement;

    let managed = new Set<string>();

    function apply(): void {
      const next = new Set(toClassList(computed()));
      managed.forEach((c) => { if (!next.has(c)) el.classList.remove(c); });
      next.forEach((c) => el.classList.add(c));
      managed = next;
    }

    if (isPlatformBrowser(platformId)) {
      const eff = effect(apply);
      destroyRef.onDestroy(() => eff.destroy());
    } else {
      effect(apply);
    }
  });
}
