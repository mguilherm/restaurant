<template>
  <div class="items-list">
    <EachItem
      v-for="item in itemsList" :key="item.id" :item="item"
    />
  </div>
</template>

<script>
import axios from "axios";
import EachItem from "./EachItem";

export default {
  name: "ItemsList",
  components: {
    EachItem,
  },
  data() {
    return {
      itemsList: [],
    };
  },
  created() {
    axios.get("http://localhost:3000/burguers").then((response) => {
      this.itemsList = response.data;
    });
  },
};
</script>

<style lang="less" scoped>
  .items-list {
    margin: 50px;
    display: flex;
  }
</style>
