<template>
<div class="loading"></div>
</template>

<script>

</script>

<style lang="less" scoped>
  .loading{
    width: 50px;
    height: 50px;
    border: 3px solid @light-yellow;
    border-radius: 50%;
    border-top-color: @yellow;
    margin: auto;

    animation: spin 1s linear infinite
  }

  @keyframes spin {
    to {
      transform : rotate(360deg);
    }
  }
</style>