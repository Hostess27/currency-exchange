<template>
  <div>
    <MessageOperation />
    <router-view />
  </div>
</template>

<script>
import MessageOperation from '@/components/MessageOperation.vue'
export default {
  name: "success",
  components: {MessageOperation}
};
</script>
