<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { Clip } from '@/types'
import { us2px } from '@/utils';
import { useThemeVars } from 'naive-ui'
interface Props {
  clip: Clip
}
const themeVars = useThemeVars()
const props = defineProps<Props>()
const style = computed<{}>(
  () => {
    const { clip } = toRefs(props)
    const { inPoint, duration } = toRefs(clip.value)
    return {
      left: us2px(inPoint.value) + 'px',
      width: us2px(duration.value) + 'px'
    }
  }
)
const click = () => {
  console.log(themeVars.value);
}
</script>

<template>
  <div class="clip" :style="style" @click="click">
    <p>{{props.clip.name}}</p>
  </div>
</template>

<style scoped lang="scss">
.clip {
  height: calc(100% - 4px);
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid var(--borderColor);
  position: absolute;
  overflow: hidden;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 4px 8px;
  }
}
</style>
