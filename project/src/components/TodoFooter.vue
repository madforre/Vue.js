<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo"><h5>다 지우기</h5></span>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo() {
        this.$emit('removeAll')
    }
  }
}
</script>

<style scoped>
  .clearAllContainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    border-radius: 8px;
    margin : 0 auto;
  }

  .clearAllBtn {
    color : black;
    /* color: rgb(255, 128, 128); */
    display: block;
  }

  .clearAllBtn:hover {
    color : red
  }
</style>
