import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    open: false,
  }),
  getters: {
    isOpen: state => state.open,
  },
  actions: {
    toggleChat() {
      this.open = !this.open
    },
  }
})
