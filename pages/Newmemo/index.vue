<template>
  <div>
    <textarea v-model="content" class="memo-text"></textarea>
    <select
      name="tag-form"
      class="select-multiple"
      v-model="selectTag"
      multiple
    >
      <option v-for="tag in loadedTags" :key="tag.id" :value="tag.name">
        {{ tag.name }}
      </option>
    </select>
    <button @click="addMemo" class="memo-add-button">作成</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      content: "",
      selectTag: "",
    };
  },
  methods: {
    addMemo() {
      this.$store
        .dispatch("addMemo", {
          memo: { content: this.content, tags: this.selectTag },
        })
        .then(() => {
          this.$router.push("/memo");
        });
    },
    ...mapActions(["fetchTags"]),
  },
  created() {
    this.fetchTags();
  },
  computed: {
    ...mapGetters(["loadedTags"]),
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

