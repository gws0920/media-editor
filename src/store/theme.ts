import { defineStore } from 'pinia';
import type { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface';
import { darkTheme } from 'naive-ui'

type themeStore = {
  theme: null | BuiltInGlobalTheme
}

export const useThemeStore = defineStore('themeStore', {
  state: (): themeStore => {
    const isDark = localStorage.getItem('isDark')
    let theme = null
    if (isDark === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = darkTheme
        document.body.classList.add('dark')
      }
    } else {
      if (isDark === 'true') {
        theme = darkTheme
        document.body.classList.add('dark')
      }
    }
    return {
      theme
    }
  },
  actions: {
    changeTheme(isDark?:boolean) {
      const body = document.body
      if (isDark === undefined) {
        this.theme = this.theme ? null : darkTheme
      } else {
        this.theme = isDark ? darkTheme : null
      }
      if (this.theme) {
        body.classList.add('dark')
        localStorage.setItem('isDark', 'true')
      } else {
        body.classList.remove('dark')
        localStorage.setItem('isDark', 'false')
      }
    }
  }
})