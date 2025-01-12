import type {
  DataTag,
  DefaultError,
  InitialDataFunction,
  OmitKeyof,
  QueryKey,
  SkipToken,
} from '@tanstack/query-core'
import type { UseQueryOptions } from './types'

export type UndefinedInitialDataOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  initialData?:
    | undefined
    | InitialDataFunction<NonUndefinedGuard<TQueryFnData>>
    | NonUndefinedGuard<TQueryFnData>
}

export type UnusedSkipTokenOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = OmitKeyof<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn'
> & {
  queryFn?: Exclude<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>['queryFn'],
    SkipToken | undefined
  >
}

type NonUndefinedGuard<T> = T extends undefined ? never : T

export type DefinedInitialDataOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  initialData:
    | NonUndefinedGuard<TQueryFnData>
    | (() => NonUndefinedGuard<TQueryFnData>)
}

type ExcludeExcessProperties<TInput, TRestrictTo> = {
  [K in keyof TInput]: K extends keyof TRestrictTo ? TRestrictTo[K] : never
}

export function queryOptions<
  TInput extends DefinedInitialDataOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >,
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: ExcludeExcessProperties<
    TInput,
    DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  >,
): TInput & {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>
}

export function queryOptions<
  TInput extends UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>,
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: ExcludeExcessProperties<
    TInput,
    UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
  >,
): TInput & {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>
}

export function queryOptions<
  TInput extends UndefinedInitialDataOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >,
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: ExcludeExcessProperties<
    TInput,
    UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  >,
): TInput & {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>
}

export function queryOptions(options: unknown) {
  return options
}
