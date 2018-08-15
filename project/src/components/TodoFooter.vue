<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo"><h5>다 지우기</h5></span>
    <p><h5>madforre@gmail.com</h5></p>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$emit('removeAll')
    }
  },
}
</script>

<style scoped>
  .clearAllContainer {
    width: 8.5rem;
    height: 30px;
    line-height: 30px;
    border-radius: 8px;
    margin : 0 auto;
  }

  .clearAllContainer>h5 {
    color : limegreen;
  }

  .clearAllBtn {
    color : black;
    /* color: rgb(255, 128, 128); */
    cursor: pointer;
    display: block;
  }

  .clearAllBtn:hover {
    color : red
  }
</style>
