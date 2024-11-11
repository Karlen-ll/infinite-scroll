import { User } from '@/types/user'
import { SearchParams } from '@/utils/fetch.utils'

export interface UserRequestError {
  error: string
}

export interface UserRequest {
  results: User[]
  info: {
    page: number
    results: number
    version: string
    seed: string
  }
}

export interface UserRequestParams extends SearchParams {
  page?: number
  results?: number
}
