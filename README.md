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


### ICON
https://www.xicons.org/#/zh-CN

### 深色模式
1. 实用css变量(`styles/var.scss`)
2. `<style>`直接使用`color: var(--color)`
3. `<script>`使用`useCssVar`
  ```ts
    import { useCssVar } from "@vueuse/core";
    const color = useCssVar('--color', document.body)
  ```