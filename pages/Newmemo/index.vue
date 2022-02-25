<template>
  <div id="memoapp">
    <textarea v-model="content" class="memo-text"></textarea>
    <select
      v-model="selectTag"
      name="tag-form"
      class="select-multiple"
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
      selectTag: [],
    };
  },
  methods: {
    addMemo() {
      this.$store
        .dispatch("addMemo", [this.content, this.selectTags])
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

