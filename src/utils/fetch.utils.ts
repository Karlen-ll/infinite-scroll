export type SearchParams = Record<string, unknown>

/** Preparing parameters for the URLSearchParams method */
export function prepareParams(params?: SearchParams): Record<string, string> | undefined {
  if (!params) {
    return
  }

  const result: Record<string, string> = {}

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      result[key] = String(params[key])
    }
  }

  return result
}

/** Saturating a link with parameters */
export function saturateUrl(url: string, params?: SearchParams, defaultParams?: SearchParams) {
  const searchParams = new URLSearchParams(prepareParams({ ...defaultParams, ...params }))

  if (!searchParams.size) {
    return url
  }

  return `${url}?${searchParams.toString()}`
}
