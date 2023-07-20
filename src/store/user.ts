import { defineStore } from 'pinia'
import type { User } from 'pinia'

export const useUserStore = defineStore('user', {
  state: (): User => ({})
})
