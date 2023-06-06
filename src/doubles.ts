/* eslint-disable */
import type { VisitOptions } from '@inertiajs/core';

// from here: https://github.com/inertiajs/inertia/blob/master/packages/vue3/src/useForm.ts
export const Inertia = {
  visit: (url: string): void => {},
  post: (url: string, payload: any, options?: Partial<VisitOptions>): void => {},
};

export interface RequestPayload {}
