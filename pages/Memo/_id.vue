<template>
  <div>{{ memo.content }}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  async asyncData({ store, route }) {
    store.dispatch("fetchMemo", route.params.id);
  },
  computed: {
    ...mapState(["memo"]),
  },
};
</script>
