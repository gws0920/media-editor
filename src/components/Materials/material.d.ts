// 左侧菜单分类
export enum Type {
  media = "media",
  caption = "caption",
  theme = "theme",
}
// 每个菜单的数据结构
export interface Item {
  type: Type
  icon: string
  label: string
}

// 每个素材的数据结构
export interface MediaItem {
  duration: number
  name: string,
  id: string,
  url: string
}

// 每个素材分类的数据结构
export interface Material {
  isGot: boolean,
  total: number
  list: Array<MediaItem>
}