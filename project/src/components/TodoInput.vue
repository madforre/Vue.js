<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="메모를 입력하세요 ^_^" v-on:keyup.enter="addTodo">
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn far fa-clock" aria-hidden="true"></i>
    </span>

<!-- use the modal component, pass in the prop -->
  <modal v-if="showModal" @close="showModal = false">
    <h3 slot="header">알림</h3>
    <h4 slot="body">메모 내용이 없습니다!</h4>
    <span slot="footer" @click="showModal = false">
      <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
    </span>
  </modal>
  <modal v-if="showModal_2" @close="showModal_2 = false">
    <h3 slot="header">알림</h3>
    <h4 slot="body">똑같은 메모 내용이 이미 있습니다!</h4>
    <span slot="footer" @click="showModal_2 = false">
      <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
    </span>
  </modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
  data: function() {
    return {
      newTodoItem : '',
      showModal: false,
      showModal_2:false,
    }
  },
  props: ['propsdata'],
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        // 앞 뒤 공백 제거
        var value = String(this.newTodoItem).trim()
        // 중복 방지
        for(var i=0;i<this.propsdata.length;i++) {
          if(this.propsdata[i] == value) {
            this.showModal_2 = !(this.showModal_2);
            return;
          }
        }
        // 상위 컴포넌트인 App.vue로 이벤트 전달
        this.$emit('addTodo', value);
        // input 값 비우기
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = '';
    }
  },
  components: {
    Modal: Modal
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
  .addContainer:hover {
    background: #39c337;
  }
  .addBtn {
    color: white;
    vertical-align: middle;
  }
  .closeModalBtn {
    cursor: pointer;
    color: limegreen;
  }
</style>
