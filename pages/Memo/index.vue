<template>
  <section>
    <input v-model="query.content_or_tags_name_cont" />
    <button @click="searchMemo">Search</button>
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
        content_or_tags_name_cont: "",
      },
    };
  },
  components: {
    MemoPreview,
  },
  created() {
    this.fetchMemos();
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
  },
  computed: {
    ...mapGetters(["loadedMemos"]),
  },
};
</script>
