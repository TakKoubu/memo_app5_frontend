<template>
  <section>
    <input v-model="searchWord" @input="onInput" />
    <MemoPreview v-for="memo in loadedMemos" :key="memo.id" :memo="memo" />
  </section>
</template>

<script>
import MemoPreview from "@/components/MemoPreview";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchWord: "",
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
    oninput() {
      this.$store.dispatch("fetchMemos", this.searchWord);
    },
  },
  computed: {
    ...mapGetters(["loadedMemos"]),
  },
};
</script>
