<template>
  <div class="bg">
    <div class="bar">
      <div class="fonts">
        <ul>
          <li class="size">
            <select>
              <option>글꼴</option>
              <option>8px</option>
              <option>9px</option>
              <option>10px</option>
              <option>11px</option>
              <option>12px</option>
              <option>14px</option>
              <option>16px</option>
              <option>18px</option>
              <option>20px</option>
            </select>
          </li>
          <li class="bold">
            <h3><font-awesome-icon icon="bold"/></h3>
          </li>
          <li class="underline">
            <h3><font-awesome-icon icon="underline"/></h3>
          </li>
          <li class="align">
            <h3><font-awesome-icon icon="align-left"/></h3>
          </li>
          <li class="align">
            <h3><font-awesome-icon icon="align-center"/></h3>
          </li>
          <li class="align">
            <h3><font-awesome-icon icon="align-right"/></h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="a4">
        <div class="document">
          {{table.count}}
          {{select.count}}
          <br>
        </div>
        <div class="bin">
            <h1><font-awesome-icon icon="trash-alt"/></h1>
        </div>
    </div>
  </div>
</template>

<script scoped>
import { eventBus } from '../main.js';
import resizeTableMixin from '../mixins/mixin.js';

export default {
  mixins:[resizeTableMixin],
  data () {
    return {

    }
  },
  props: ["option", "table", "select"],
  created() {
    eventBus.$on("clear", method => {
      this.clear = method;
    }),
    eventBus.$on("undo", method => {
      this.undo = method;
    })
  },
  methods : {
    clear(){
    },
    undo(){
    },
  },
}
</script>

<style>

/* 
 * A4 용지 기준
 * width : 1190px;
 * height : 1684px;
 */

/* 휴지통 */

.bin {
    position : absolute;
    right : 3%;
    bottom : 7%;
    background : rgb(255, 255, 255);
    padding : 0.5rem;
    color : rgba(158, 38, 38, 0.445);
    cursor : pointer;
}

.bin:hover {
    color : rgba(255, 31, 31, 0.822);
}

.bg {
    position : relative;
    overflow: auto;
    height : 52rem;
    background: #ccc;
}

.bg .a4 {
    border : 1px solid gray;
    padding : 2.3%;
    margin : 0 auto;
    margin-top : 2rem;
    margin-bottom : 2rem;
    width : 1190px;
    height : 1684px;
    background : #fff;
}

.bg .a4> .document {
    display : flex;
    box-sizing: border-box;
    flex-flow : row wrap;
    align-content: flex-start;
    height : 1684px;
}

/* 글 도구 모음 */

.bg .bar {
  position : relative;
  width : 500px;
  margin : 0 auto;
}

.bg .bar .fonts {
  position : fixed;
  color : #000;
  font-size : 15px;
  z-index: 99;
}

.bg .bar .fonts ul {
  display : flex;
  flex-direction: row;  
}

.bg .bar .fonts ul li {
  display : flex;
  box-sizing: border-box;
  border : 1px solid rgb(255, 255, 255);
  background: rgb(84, 110, 228);
  color : white;
  width : 80px;
  height : 35px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.bg .bar .fonts ul li:hover {
  background: rgb(54, 81, 202);
}

.bg .bar .fonts ul li input {
  display : block;
  margin : 0 auto;
  width : 100%;
}

/* Drop된 요소의 Resize를 위한 css 설정 */

.bg .a4 .document .dropped {
    text-align: left;
    margin-bottom : 1px;
    margin-top : 1px;
    /* 자동 늘림 방지 */
    align-self : flex-start;
    height : auto;
    display : block;
    z-index: 98;
}

.bg .a4 .document .dropped ul {
    position : relative;
    display : flex;
    width : 100%;
    height : auto;
    flex-flow : row wrap;
    box-sizing: border-box;
    border-left : 1px solid #000;
    border-top : 1px solid #000;
    text-align: center;
    top : 0px;
    left : 0px;
} 

.bg .a4 .document .dropped ul > li {
    position : relative;
    width : 100%;
    word-break : break-word;
    border-bottom : 1px solid rgb(0, 0, 0);
    border-right : 1px solid rgb(0, 0, 0);
    box-sizing : border-box;
    flex : 1 1 auto;
}

.bg .a4 .document .dropped ul li .resizer.column {
    position : absolute;
    right :-17px;
    top : 5%;
    width : 32px;
    height : 90%;
    /* background: #222; */
    cursor : w-resize;
    z-index : 98;
}

.bg .a4 .document .dropped ul li .resizer.row {
    position : absolute;
    bottom : -16px;
    width : 100%;
    cursor : s-resize;
    height : 32px;
    /* background: #555; */
    z-index: 98;
}

</style>