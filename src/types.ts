export type Clip = {
  inPoint: number
  outPoint: number
  duration: number
  name: string
  id: string
  thumbnail: string,
  trimOut: number,
  trimIn: number,
  speed?: number,
  trackId: string
}

export type Track = {
  id: string,
  clips: Array<Clip>
}

export type Timeline = {
  tracks: Track[]
}