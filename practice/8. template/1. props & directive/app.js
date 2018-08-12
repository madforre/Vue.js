var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Ronaldo',
    hou: '노력하는 형',
    uid: '10',
    flag: true
  },
  methods: {
    // ES6 문법
    clickBtn() {
      console.log("hi");
    },
    // ES5 문법
    eventMethod: function() {
      alert('eventMethod 동작!');
    }
  }
})
