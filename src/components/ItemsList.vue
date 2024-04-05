<template>
  <div class="items-list">
  <LoadingIcon v-if="isLoading" />
    <EachItem v-for="item in itemsList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import EachItem from "./EachItem";
import LoadingIcon from "./LoadingIcon"

export default {
  name: "ItemsList",
  components: {
    EachItem,
    LoadingIcon,
  },
  data() {
    return {
      itemsList: [],
      isLoading: false
    };
  },
  created() {
    this.getItemsList();
  },
  computed: {
    selectedCategory: {
      get() {
        return this.$store.state.selectedCategory;
      },
      
    },
  },
  methods: {
    getItemsList() {
      this.isLoading = true;
      this.itemsList = []
      setInterval(() => {
        axios.get(`http://localhost:3000/${this.selectedCategory}`).then((response) => {
          this.itemsList = response.data;
          this.isLoading = false;
        });
      }, 1000)
     
    },
  },
  watch: {
    selectedCategory() {
      this.getItemsList();
    },
  },
};
</script>

<style lang="less" scoped>
.items-list {
  margin: 30px 30px 0;
  width: 100%;
  height: 95vh;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: scroll;
  
  @media @tablets {
    flex-wrap: wrap;
    margin: 0;
    padding: 20px;
  }
}
</style>
