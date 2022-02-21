<template>
  <section>
    <div class="memo-header">
      <ul class="header-list">
        <li class="nav-items"><nuxt-link to="/memo">メモ一覧</nuxt-link></li>
        <li class="nav-items">
          <nuxt-link to="/newmemo">メモ作成</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style scoped>
.header-list {
  height: 40px;
}
.nav-items {
  color: white;
  display: inline-block;
  padding: 10px;
  text-decoration: none;
}
</style>
