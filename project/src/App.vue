<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- v-on:addTodo로 하위 컴포넌트인 TodoInput에서 올려보낸 이벤트 수신 -->
    <TodoInput v-on:addTodo="addTodo" :propsdata="todoItems"></TodoInput>
     <!-- 하위 컴포넌트인 TodoList에 propsdata로 앱(상위) 컴포넌트의 데이터 전달,
     하위 컴포넌트 TodoList.vue에서 이벤트 전달 -> 상위 컴포넌트인 App.vue에서 이벤트 수신.
     v-bind:하위 컴포넌트 에서 전달받을 propsdata명="상위에서 전달할 데이터"
     v-on:하위 컴포넌트에서 보낸 이벤트명="이벤트를 처리할 상위 컴포넌트 메소드 명" -->
    <TodoList v-bind:propsdata="todoItems" :pd="edit" :uI="updateInput" v-on:removeTodo="removeTodo" v-on:updateTodo="updateTodo" @beforeUpdateTodo="beforeUpdateTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
// 하위 컴포넌트들은 그 데이터를 표현하거나 데이터 조작에 대한 요청(이벤트 발생)만 한다.
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

// 할 일 데이터는 모두 App 컴포넌트에서 관리한다.
// CRUD를 모두 App 컴포넌트에서 처리한다.
export default {
  data() {
    return {
      todoItems: [], // todoItems는 현재 데이터의 값을 의미
      edit: [], // 리스트를 숨겼다 표시하기 위한 불린 값
      updateInput: []
    }
  },
  created() {
    if (this.edit.length < 1) {
      for (var i = 0; i < localStorage.length; i++) {
        this.edit.push(false)
      }
    }
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        this.todoItems.push(localStorage.getItem(localStorage.key(i)))
      }
    }
    if (this.updateInput.length < 1) {
      for (var i = 0; i < localStorage.length; i++) {
        this.updateInput[i] = localStorage.getItem(localStorage.key(i))
      }
    }
  },
  methods: {
    addTodo(todoItem) { // todoItem은 TodoInput 컴포넌트에서 올려 보낸 할 일 텍스트 값 인자이다.
      localStorage.setItem(new Date().toUTCString(), todoItem);
      this.todoItems.push(todoItem);
      this.edit.push(false);
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(localStorage.key(index));
      this.todoItems.splice(index, 1);
      this.edit.pop();
    },
    beforeUpdateTodo(index) {
      this.edit[index] = !this.edit[index]
    },
    updateTodo(updateTodoItem, index) {
      localStorage.setItem(localStorage.key(index), updateTodoItem);
      this.todoItems.splice(index, 1, updateTodoItem)
      this.edit[index] = !this.edit[index]
      console.log(updateTodoItem, index)
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
      this.edit = [];
    }
  },
  components: {
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter
  }
}
</script>

<style>
body {
  text-align: center;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 155, 0, 0.03)
}
</style>
