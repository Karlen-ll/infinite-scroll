export interface User {
  gender: UserGender
  id: { name: string; value: string }
  name: { title: string; first: string; last: string }
  location: UserLocation
  email: string
  login: UserLoginData
  dob: UserDate
  registered: UserDate
  phone: string
  cell: string
  picture: UserPicture
  nat: string
}

export enum UserGender {
  Male = 'male',
  Female = 'female',
}

export interface UserLocation {
  city: string
  state: string
  country: string
  postcode: string
  street: { number: number; name: string }
  coordinates: { latitude: string; longitude: string }
  timezone: { offset: string; description: string }
}

export interface UserPicture {
  large: string
  medium: string
  thumbnail: string
}

export interface UserDate {
  date: string
  age: number
}

export interface UserLoginData {
  uuid: string
  username: string
  password: string
  md5: string
  sha1: string
  sha256: string
  salt: string
}
