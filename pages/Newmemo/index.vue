<template>
  <div>
    <textarea v-model="content" class="memo-text"></textarea>
    <button @click="addMemo" class="memo-add-button">作成</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    addMemo() {
      console.log(this.memo);
      this.$store.dispatch("addMemo", this.content).then(() => {
        this.$router.push("/memo");
      });
    },
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
  margin-left: 160px;
}
</style>

