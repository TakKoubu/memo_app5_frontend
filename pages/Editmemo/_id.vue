<template>
  <div id="memoapp">
    <textarea v-model="content" class="memo-text"></textarea>
    <select
      v-model="selectTags"
      name="tag-form"
      class="select-multiple"
      multiple
    >
      <option v-for="tag in loadedTags" :key="tag.id" :value="tag.id">
        {{ tag.id }}-{{ tag.name }}
      </option>
    </select>
    <button @click="updateMemo(memo.id)" class="memo-add-button">作成</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      content: "",
      selectTags: [],
    };
  },
  methods: {
    updateMemo(id) {
      this.$store
        .dispatch("updateMemo", {
          id: id,
          content: this.content,
          tag_ids: this.selectTags,
        })
        .then(() => {
          this.$router.push("/memo");
        });
    },
    ...mapActions(["fetchTags"]),
  },
  async asyncData({ store, route }) {
    store.dispatch("fetchMemo", route.params.id);
  },
  created() {
    this.fetchTags();
    this.content = this.memo.content;
  },
  computed: {
    ...mapGetters(["loadedTags"]),
    ...mapState(["memo"]),
  },
};
</script>

<style scoped>
.memo-text {
  display: block;
  margin-left: 40px;
}
.memo-add-button {
  display: block;
  margin-left: 100px;
}
.select-multiple {
  margin-left: 100px;
  display: block;
}
</style>

