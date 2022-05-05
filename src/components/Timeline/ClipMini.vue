<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'
import { Clip } from '@/types'
import { CLIP_TYPE, us2px, VIDEO_TRACK_HEIGHT, OTHER_TRACK_HEIGHT, getClipThumbs } from '@/utils'
interface Props {
  clip: Clip,
  style?: StyleSheet
}
const props = defineProps<Props>()


const el = document.getElementById(props.clip.id)

let [width, height, left, top] = [us2px(props.clip.duration), props.clip.type === CLIP_TYPE.VIDEO ? VIDEO_TRACK_HEIGHT : OTHER_TRACK_HEIGHT, 0, 0]
if (el) {
  const rect = el.getBoundingClientRect() || {}
  width = rect.width
  height = rect.height
  left = rect.left
  top = rect.top
}

const background = el?.style.background || getClipThumbs(props.clip).join(',')
const style = ref({
  width: width + 'px',
  height: height + 'px',
  left: left + 'px',
  top: top + 'px',
  background
})
</script>

<template>
  <div
   :class="{
    'clip-mini': true,
    'center-clip': ![CLIP_TYPE.VIDEO, CLIP_TYPE.AUDIO].includes(props.clip.type), // 文字居中的clip
    }"
    :id="'mini-' + props.clip.id" :style="style">
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
    font-size: 13px;
    color: white;
    // color: var(--primaryColor);
  }
  &.center-clip {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
