<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="메모를 입력하세요 ^_^" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn far fa-clock" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newTodoItem : ''
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        var value = String(this.newTodoItem).trim()
        this.$emit('addTodo', value); // 상위 컴포넌트인 App.vue로 이벤트 전달
        this.clearInput();
      }
    },
    clearInput() {
      this.newTodoItem = '';
    }
  }
}
</script>

<style scoped>
  input:focus {
    outline: none;
  }
  .inputBox {
    background: #def7ac;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    text-align: left;
  }
  .inputBox input {
    background: #def7ac;
    border-style: none;
    font-size: 0.9rem;
    color : darkgreen;
    font-weight:600;
    width : 70%;
    text-indent: 1rem;
  }
  .addContainer {
    float: right;
    background: limegreen;
    width: 3rem;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    text-align: center;
  }
  .addBtn {
    color: white;
    vertical-align: middle;
  }
</style>
