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
  <div class="bg-transparent z-50">
    <div
      class="
        bg-gray-200
        w-[16rem]
        h-[28rem]
        absolute
        right-0
        bottom-20
        m-7
        rounded
        transition-all
        ease-in-out
        transform
        duration-[300ms]
        opacity-1
      "
      :class="{ 'opacity-0': !store.isOpen, 'translate-y-20': !store.isOpen }"
    ></div>
    <div class="absolute bottom-0 right-0 m-7 bg-transparent">
      <img
        @click="store.toggleChat"
        src="@/components/icons/chat_icon.png"
        alt="chat icon"
        class="w-16 h-16 opacity-80 hover:opacity-100 hover:cursor-pointer"
      />
    </div>
  </div>
</template>