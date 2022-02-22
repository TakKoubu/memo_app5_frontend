<template>
  <div>
    {{ memo.content }}
  </div>
</template>

<script>
export default {
  props: {
    memo: {
      type: Object,
      required: true,
    },
  },
  async asyncData({ store, route }) {
    console.log(route);
    // アクションを呼び出し、フロントのmemoのidを引数として渡す
    await Promise.all([store.dispatch("fetchMemo", route.params.id)]);
  },
};
</script>
