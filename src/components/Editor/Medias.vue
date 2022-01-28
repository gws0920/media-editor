<script setup lang="ts">
import Mock from 'mockjs'
import { ref } from 'vue'
import { NGrid, NGridItem, NCard, NEllipsis, NScrollbar } from 'naive-ui'
const data = {
  code: 200,
  "data|20": [{
    "duration|1000000-20000000": 20000000,
    "url": "@image(480x270, @color, #fff, 1)",
    "name": "@name",
    "id": "@guid"
  }]
}
const res = Mock.mock(data)
const list = ref(res.data)

</script>

<template>
  <n-scrollbar style="max-height: 100%;">
    <NGrid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen" :x-gap="12">
      <NGridItem v-for="item in list" :key="item.id">
        <NCard :bordered="false">
          <template #cover>
            <img :src="item.url" />
          </template>
          <n-ellipsis style="max-width: 100%;">{{ item.name }}</n-ellipsis>
        </NCard>
      </NGridItem>
    </NGrid>
  </n-scrollbar>
</template>

<style scoped lang="scss">
img {
  aspect-ratio: 16 / 9;
  width: 100%;
}
</style>
