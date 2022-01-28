<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { Clip } from '@/types'

interface Props {
  clip: Clip,
  style?: StyleSheet
}
const props = defineProps<Props>()


const el = document.getElementById(props.clip.id)
const { width, height, left, top } = el?.getBoundingClientRect() || {}
const background = el?.style.background

const style = ref({
  width: width + 'px',
  height: height + 'px',
  left: left + 'px',
  top: top + 'px',
  background
})
</script>

<template>
  <div class="clip-mini" :id="'mini-' + props.clip.id" :style="style">
    <p>{{props.clip.name}}</p>
  </div>
</template>

<style scoped lang="scss">
.clip-mini {
  position: fixed;
  box-sizing: border-box;
  border-radius: 3px;
  border: 2px solid var(--primaryColor);
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 4px 8px;
    color: var(--primaryColor);
  }
}
</style>
