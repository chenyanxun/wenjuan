export interface IAnyJson {
  [key: string]: any
}

export interface IRes {
  errno: number
  data: {
    [key: string]: any
  }
  message: string
}
