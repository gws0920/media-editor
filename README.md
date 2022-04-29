# Media Editor
## 前言
这是个练手项目，用来熟悉Vue3/TypeScript/vite. 很多东西都在摸索中前进。
## 演示
- [github-page](https://gws0920.github.io/media-editor/)
## 仓库
- [github](https://github.com/gws0920/media-editor)
- [gitee](https://gitee.com/Gws9/media-editor)
## 安装
```
yarn
yarn dev
```

## 技术栈
- vue3
- vite
- typescript

## 插件
- Pinia
- scss
- naive-ui
- vue-use


## ICON
使用[xicons](https://www.xicons.org/#/zh-CN)中的carbon图标
```ts
import { Undo } from '@vicons/carbon'
import { NIcon } from 'naive-ui'
```
```html
<NIcon :size="18" class="icon" title="撤销">
  <Undo />
</NIcon>
```
- 通用样式`src\styles\index.scss`中`.n-icon`
- 禁用: `class="disabled"`
## 深色模式
1. 使用css变量(`styles/var.scss`)
2. `<style>`直接使用`color: var(--color)`
3. `<script>`使用`useCssVar`
  ```ts
    import { useCssVar } from "@vueuse/core";
    const color = useCssVar('--color', document.body)
  ```

## TODO:
### 22.4.21
短期内将要做的内容
- [x] 片段跨轨道拖拽
- [x] 片段拖拽碰撞覆盖
- [x] 片段入出点设置
- [x] 时间轴 `Ruler.vue`
- [x] 轨道控制器 `trackControls.vue`
- [ ] 片段 从媒体库添加到轨道上
