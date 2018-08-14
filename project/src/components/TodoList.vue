<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
        <!-- {{pd}}
        {{pd[index]}} -->
        <i class="checkBtn fas fa-feather" aria-hidden="true"></i>
        <small>{{ todoItem }}</small>
        <div class="edit">
          <input type="text" v-model="updateTodoItem" placeholder="수정할 내용을 입력합니다." v-on:keyup.enter="updateTodo(index)" v-show="pd[index]">
        </div>
        <div class="icon">
          <span class="removeBtn" @click="removeTodo(todoItem, index)">
            <i class="fas fa-trash-alt" aria-hidden="true"><small></small></i>
          </span>
          <span class="updateBtn">
            <i class="fas fa-edit" aria-hidden="true" @click="beforeUpdateTodo(index)" v-show="!pd[index]"><small> 수정</small></i>
          </span>
          <span class="updateAfterBtn">
            <i class="fas fa-edit" aria-hidden="true" @click="updateTodo(index)" v-show="pd[index]"><small> 저장</small></i>
          </span>
        </div>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default{
  data() {
    return {
      updateTodoItem : ''
    }
  },
  props: ['propsdata', 'pd'],
  methods: {
    removeTodo(todoItem, index) {
      this.$emit('removeTodo', todoItem, index); // 이벤트 전달시 인자를 여러개 보낼 수 있다.
    },
    beforeUpdateTodo(index) {
      this.$emit('beforeUpdateTodo', index);
      this.updateTodoItem = localStorage.getItem(localStorage.key(index))
    },
    updateTodo(index) {
      this.$emit('updateTodo', this.updateTodoItem, index);
      this.clearInput();
    },
    clearInput() {
      this.updateTodoItem = '';
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
    height: auto;
    margin: 0.5rem 0;
    border: 1px solid limegreen;
    border-radius: 8px;
    padding: 1rem;
  }

  .checkBtn {
    color: limegreen;
    margin-right: 0.5rem;
  }

  .updateBtn {
    margin-right: 0.5rem;
    float : right;
    color : limegreen;
    cursor: pointer;
  }

  .updateBtn:hover {
    color : blue;
  }

  .updateAfterBtn {
    margin-right : 0.5rem;
    float : right;
    color : limegreen;
    cursor : pointer;
  }

  .updateAfterBtn:hover {
    color : blue;
  }

  .removeBtn {
    float : right;
    color : green;
    cursor: pointer;
  }

  .removeBtn:hover {
    color : red;
  }

  .icon {
    padding-top : 1rem;
    margin-bottom : 1rem;

  }

  .edit {
    margin: 1rem;
    margin-bottom: 0.3rem;
  }

  .edit input {
    width : 100%;
    height : 3rem;
    border: 1px dashed limegreen;
  }

  .edit input:focus {
      outline: none;
  }

  /* 뷰 애니메이션 */
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter {
    opacity: 0;
    transform: translateY(-40px);
    transition-timing-function: ease-in-out;
  }
  .list-leave-to {
    opacity: 0;
    transform: translateY(40px);
    transition-timing-function: ease-in-out;
  }
</style>
