<script>
import { useChatStore } from "@/stores/chat";

export default {
  setup() {
    const store = useChatStore();

    return {
      store,
    };
  },
};
</script>

<template>
  <div @click="store.toggleChat">
    <div v-if="store.isOpen">open</div>
    <img
      src="@/components/icons/chat_icon.png"
      alt=""
      class="w-20 h-20 opacity-80 hover:opacity-100 hover:cursor-pointer"
    />
  </div>
</template>