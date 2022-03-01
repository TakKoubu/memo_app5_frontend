<template>
  <section>
    <input v-model="query.content_cont" />
    <select
      v-model="query.tags_name_in"
      name="tag-form"
      class="select-multiple"
      multiple
    >
      <option v-for="tag in loadedTags" :key="tag.id" :value="tag.name">
        {{ tag.name }}
      </option>
    </select>
    <button @click="searchMemo">Search</button>
    {{ loadedMemos[0] && loadedMemos[0].status }}
    <MemoPreview v-for="memo in loadedMemos" :key="memo.id" :memo="memo" />
  </section>
</template>

<script>
import MemoPreview from "@/components/MemoPreview";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      query: {
        content_cont: "",
        tags_name_in: [],
      },
    };
  },
  components: {
    MemoPreview,
  },
  created() {
    this.fetchMemos();
    this.fetchTags();
  },
  computed: {
    ...mapGetters(["loadedTags"]),
    ...mapGetters(["loadedMemos"]),
  },
  methods: {
    ...mapActions(["fetchMemos"]),
    searchMemo() {
      axios
        .get("http://localhost:5000/api/memos", {
          params: {
            q: this.query,
          },
          paramsSerializer(params) {
            return Qs.stringify(params, { arrayFormat: "brackets" });
          },
        })
        .then((res) => {
          this.$store.commit("setMemos", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ...mapActions(["fetchTags"]),
  },
};
</script>
