<template>
  <div>
    <textarea v-model="content" class="memo-text"></textarea>
    <select name="sampleName[]" class="select-multiple" multiple>
      <option value="値Ａ">選択肢Ａ</option>
      <option value="値Ｂ">選択肢Ｂ</option>
      <option value="値Ｃ">選択肢Ｃ</option>
      <option value="値Ｄ">選択肢Ｄ</option>
      <option value="値Ｅ">選択肢Ｅ</option>
    </select>
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
  margin-left: 100px;
}
.select-multiple {
  margin-left: 100px;
  display: block;
}
</style>

