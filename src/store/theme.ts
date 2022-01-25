import { defineStore } from 'pinia';
import type { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface';
import { darkTheme } from 'naive-ui'


type themeStore = {
  theme: null | BuiltInGlobalTheme
}

export const useThemeStore = defineStore('themeStore', {
  state: (): themeStore => ({
    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : null
  }),
  actions: {
    changeTheme(isDark?:boolean) {
      if (isDark === undefined) {
        this.theme = this.theme ? null : darkTheme
      } else {
        this.theme = isDark ? darkTheme : null
      }

    }
  }
})