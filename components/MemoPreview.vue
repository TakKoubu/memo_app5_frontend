<template>
  <div>
    <nuxt-link :to="`/memo/${memo.id}`">
      {{ memo.id }}
      {{ memo.content }}
      <li class="tag-list" v-for="tag in memo.tags" :key="tag.id">
        タグ-{{ tag.name }}
      </li>
    </nuxt-link>
    <button @click="deleteMemo(memo)">削除</button>
    <button v-if="memo.is_like" @click="unFavo(memo)">お気に入り解除</button>
    <button v-else @click="addFavo(memo)">お気に入り</button>
    {{ memo.favorite_count }}いいね
  </div>
</template>

<script>
export default {
  name: "MemoPreview",
  props: {
    memo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteMemo(memo) {
      this.$store.dispatch("deleteMemo", memo.id).then(() => {
        this.$router.push("/memo");
      });
    },
    addFavo(memo) {
      this.$store.dispatch("addFavo", memo.id).then(() => {
        this.$router.push("/memo");
      });
    },
    unFavo(memo) {
      this.$store.dispatch("unFavo", memo.id).then(() => {
        this.$router.push("/memo");
      });
    },
  },
};
</script>

<style scoped>
.tag-list {
  display: inline-block;
  padding: 10px;
  text-decoration: none;
}
</style>
