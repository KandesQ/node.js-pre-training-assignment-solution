/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  sourceIsNotNullOrUndefined(source)

  const res: R[] = []
  for (let i = 0, len = source.length; i < len; i++) {
    res.push(mapper(source[i], i))
  }

  return res
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  sourceIsNotNullOrUndefined(source)

  const res: T[] = []
  for (let i = 0, len = source.length; i < len; i++) {
    if (predicate(source[i], i)) {

      res.push(source[i])
    }
  }

  return res
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  sourceIsNotNullOrUndefined(source)

  let local_acc = initial

  for (let i = 0; i < source.length; i++) {
    local_acc = reducer(local_acc, source[i], i)
  }

  return local_acc
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  sourceIsNotNullOrUndefined(source)

  const passed: T[] = []
  const failed: T[] = []

  for (let i = 0; i < source.length; i++) {
    if (predicate(source[i])) {
      passed.push(source[i])
    } else {
      failed.push(source[i])
    }
  }

  return [passed, failed]
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  sourceIsNotNullOrUndefined(source)

  const resultRecord: Record<K, T[]> = {} as Record<K, T[]> 
  for (const entity of source) {
    const k: K = keySelector(entity)

    if (!resultRecord[k]) {
      resultRecord[k] = []
    }

    resultRecord[k].push(entity)
  }

  return resultRecord
}


function sourceIsNotNullOrUndefined<T>(source: readonly T[] | null | undefined) {
  if (source == null) {
    throw new TypeError("Source is null or undefined")
  }
}