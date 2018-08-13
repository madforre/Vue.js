<template>
  <section>
    <ul>
      <li v-for="(todoItem, index) in propsdata" class="shadow">
        <i class="checkBtn fas fa-feather" aria-hidden="true"></i>
        {{ todoItem }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['propsdata'],
  methods: {
    removeTodo(todoItem, index) {
      this.$emit('removeTodo', todoItem, index); // 이벤트 전달시 인자를 여러개 보낼 수 있다.
    }
  },
}
</script>

<style>
  ul {
    list-style : none;
    padding-left: 0;
    margin-top: 0;
    text-align: left;
  }

  li {
    display: flex;
    min-height: 50px;
    height: auto;
    line-height: 50px;
    margin: 0.5rem 0;
    border: 1px solid limegreen;
    border-radius: 8px;
  }

  .checkBtn {
    line-height: 50px;
    text-indent: 1rem;
    color: limegreen;
    margin-right: 0.5rem;
  }

  .removeBtn {
    margin-left: auto;
    color: #de5757;
    margin-right: 1rem;
    cursor: pointer;
  }
</style>
