import { defineStore } from 'pinia'
import type { System } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: (): System => ({})
})
