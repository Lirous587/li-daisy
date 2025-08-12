<template>
  <div class="p-5 h-100">
    <div class="my-2 flex flex-col items-center justify-center gap-4 *:space-x-6">
      <div>
        <button class="btn btn-primary btn-soft" @click="addAtEnd">尾部插入</button>
        <button class="btn btn-secondary btn-soft" @click="deleteAtHead">头部删除</button>
      </div>
      <div>
        <button class="btn" @click="addOne">随机插入</button>
        <button class="btn" @click="deleteOne">随机删除</button>
      </div>
    </div>
    <TransitionGroup tag="div" name="list">
      <div v-for="item in items" :key="item">
        {{ item }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([1, 2, 3, 4, 5])

const getRandomNumber = (n: number = 100): number => {
  return Math.round(Math.random() * n)
}

const addAtEnd = () => {
  items.value.push(getRandomNumber())
}

const deleteAtHead = () => {
  items.value.splice(0, 1)
}

const addOne = () => {
  const index = Math.max(Math.floor(Math.random() * (items.value.length - 1)), 0)
  const random = getRandomNumber()
  items.value.splice(index, 0, random)
}

const deleteOne = () => {
  const index = Math.max(Math.floor(Math.random() * (items.value.length - 1)), 0)
  items.value.splice(index, 1)
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.list-move {
  transition: transform 1s ease;
}
</style>
