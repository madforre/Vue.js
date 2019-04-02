
// 이벤트 버스 생성
var eventBus = new Vue();

// 하위 컴포넌트 등록

// show 버튼을 클릭하여 자식 컴포넌트 메소드인 showLog가 실행되었을 때
// eventBus의 이벤트가 발생한다.

Vue.component('child-component', {
  props: ['propsdata'],
  template: '<div>하위 컴포넌트 영역입니다. {{propsdata}} <button v-on:click="showLog">show</button></div>',
  methods: {
    showLog: function() {
      eventBus.$emit('triggerEventBus', 100);
    }
  }
});

// 뷰 인스턴스
var app = new Vue({
  el: '#app',
  created: function() {
    eventBus.$on('triggerEventBus', function(value) {
      console.log("자식에게서 이벤트를 전달받음. 전달받은 값 : ", value);
    });
  },
  data: {
    message : '* 부모로 부터 받은 데이터를 자식 컴포넌트에 표시하였다. *'
  }
});
