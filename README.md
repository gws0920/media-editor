# Media Editor

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