<template>
  <div class="logo">
    <img :src="logo" alt="Keydo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/logo.svg")
    };
  }
};
</script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  left: 3rem;
  top: 2rem;
}
</style>
