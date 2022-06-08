<template>
  <ListDemo />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListDemo from "./view/list-demo/list-demo.vue";
export default defineComponent({
  components: {
    ListDemo,
  },
  setup() {
    return {};
  },
});
</script>

<style>
body {
  padding: 0;
}
</style>
