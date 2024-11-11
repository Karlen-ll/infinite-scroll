import { saturateUrl } from '@/utils/fetch.utils'
import { UserRequest, UserRequestError, UserRequestParams } from '@/api/user/user.type'
import mockData from './user.mock.json'

const USER_URL = 'https://randomuser.me/api/'
const DEFAULT_USER_RESULTS = 10
const MOCK_TIMEOUT = 2000

export async function fetchUser(params?: UserRequestParams) {
  console.log(params)
  try {
    const url = saturateUrl(USER_URL, params, { results: DEFAULT_USER_RESULTS })
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}, request could not be sent.`)
    }

    return (await response.json()) as UserRequest | UserRequestError
  } catch (error) {
    console.error(error)
  }
}

/** ↓↓↓ For testing */
/** */

export async function getMockUser(_params?: UserRequestParams): Promise<UserRequest | UserRequestError> {
  return new Promise((resolve) => setTimeout(() => resolve(mockData as UserRequest), MOCK_TIMEOUT))
}

export async function getErrorUser(_params?: UserRequestParams): Promise<UserRequest | UserRequestError> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ error: '❌ Error. The server is not responding!' }), MOCK_TIMEOUT)
  )
}
