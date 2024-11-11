import { readonly, ref } from 'vue'

export enum Method {
  Fetch = 'fetch',
  Mock = 'mock',
  Error = 'error',
}

const STORAGE_KEY = 'method'

function getMethodFromStorage(defaultMethod: Method) {
  return (localStorage.getItem(STORAGE_KEY) as Method | undefined) || defaultMethod
}

const method = ref<Method>(getMethodFromStorage(Method.Mock))

/** @desc Method of working with users.
 * For testing... */
export default function useMethod() {
  const changeMethod = async (newValue: Method) => {
    method.value = newValue
    localStorage.setItem(STORAGE_KEY, newValue)
  }

  return {
    method: readonly(method),
    changeMethod,
  }
}
