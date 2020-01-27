import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';

export type MethodReturning<T> = (...args: any[]) => T;

export interface ShareOptions {
  when?: MethodReturning<boolean>;
}

export function Share(opts: ShareOptions = {}) {
  const cache = new Map<string, Observable<any>>();

  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<MethodReturning<Observable<any>>>
  ) => {
    if (!descriptor.value) { return descriptor; }

    const originalMethod = descriptor.value;

    descriptor.value = function(this: any) {
      const context = this;
      const args = arguments;
      const key = JSON.stringify([...args]);

      const updatedCall = (originalMethod.apply(context, args as any) as Observable<any>)
        .pipe(
          share(),
          tap(() => cache.delete(key))
        );

      if (!opts.when || (opts.when as any).apply(context, args)) {
        const loadingInProcess = cache.get(key);

        if (loadingInProcess) {
          return loadingInProcess;
        }

        cache.set(key, updatedCall);
      }

      return updatedCall;
    };

    return descriptor;
  };
}
