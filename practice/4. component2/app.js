

Vue.component('sibling-component', {
  props:['pd'],
  template: '<p>{{ pd }}</p>',
});

Vue.component('child-component', {
  props: ['propsdata'],
  template: '<p>{{ propsdata }}</p>',
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue! passed from Parent Component',
    anotherMessage: 'Can you see me?'
  }
});
