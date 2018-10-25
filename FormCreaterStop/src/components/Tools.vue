<template>
    <div class="tools">
      <ul>
        <li><h1>Tools</h1></li>
        <li class="table">
            <p>표 (최대 12 x 12)</p>
            <div class="value" v-for="n in table.count" @click="setTable" @keyup="cutInput" v-show="table.shows[n-1]" :key="n">
              행　<input type="number" v-model="table.row[n-1]" @keyup="setTable" min=1 max=12>
              열　<input type="number" v-model="table.column[n-1]" @keyup="setTable" min=1 max=12>
            </div>
            삽입된 표 : {{table.count-1}} 개
            <div v-for="n in table.count" v-show="table.shows[n-1]" v-bind:key="`C-${n}`">
                Cell 개수 : {{ table.row[n-1] }} * {{ table.column[n-1] }} = {{ table.row[n-1] * table.column[n-1] }}<br>
            </div>
            <div :class=" 'drag table '+(n-1) " draggable="true" v-for="n in table.count"  :key="`A-${n}`">
                <ul>
                    <li v-for="n in table.row[n-1] * table.column[n-1]" v-bind:key="`B-${n}`">
                        <div class="resizer column" v-show="n % table.row !== 0" @mousedown="colResize" @mouseup="stop" @mouseout="stop"></div>
                        <div class="resizer row"  @mousedown="rowResize" @mouseup="stop" @mouseout="stop"></div>
                    </li>
                </ul>
            </div>
        </li>
        <li class="input">
            <p>인풋 박스 생성</p>
            <br>
            <div class="drag" draggable="true">
                <input type="text">
            </div>
        </li>
        <li class="check">
            <h4>체크 박스 추가</h4>
            <div class="drag" draggable="true">
                <input class="checkbox" type="checkbox" checked>
            </div>
        </li>
        <li class="select">
            <p>
                셀렉트 박스 생성
            </p>
            <input v-for="n in select.count" :key="n" class="selectValue" type="text" @keyup="setSelects" v-show="select.shows[n-1]" v-model="select.inputs[n-1]" placeholder="ex) 딸기,바나나,키위">
            <p>추가할 요소들은<br>
            쉼표로 구분합니다.</p>
            <div :class=" 'drag select '+(n-1)" draggable="true" v-for="n in select.count" :key="`D-${n}`">
                <select>
                    <option>선택해주세요.</option>
                    <option v-for="index in select.outputs[n-1]" :key="index">{{index}}</option>
                </select>
            </div>
        </li>
        <li class="sign">
            <p>전자서명란 (1회)</p>
            <div class="drag" draggable="true">
                <vueSignature class="board" ref="signature" :sigOption="option" :w="'100%'" :h="'100%'"></vueSignature>
            </div>
        </li>
        <button @click="clear">Clear</button>
		<button @click="undo">Undo</button>
      </ul>
    </div>
</template>
<script>

import { eventBus } from '../main.js'
import resizeTableMixin from '../mixins/mixin.js';

export default {
    mixins:[resizeTableMixin],
    data: function() {
        return {
        }
    },
    props: ["option", "table", "select"],
    methods: {
        /* 전자서명 관련 메소드 */
        clear() {
			var _this = this;
			_this.$refs.signature.clear();
		},
		undo() {
			var _this = this;
			_this.$refs.signature.undo();
        },
        // 계산된 속성을 실행할 수 없는 중첩된 v-for는 메소드로 처리한다.
        setTable : function (event) {

            if (event.target.value.length <= 2){

                let lis = document.querySelectorAll(".table .drag:last-child ul > li");
                let wid;
                let hei;
                
                wid =  100 / this.table.row[this.table.count-1];
                hei =  100 / this.table.column[this.table.count-1];
                let li = this.table.row[this.table.count-1] * this.table.column[this.table.count-1];

                for(let i=0; i< li; i++) {
                    lis[i].style.width = wid+"%";
                    lis[i].style.height = hei+"%";
                }

                /* 
                 * 아래에 쓰인 forEach문은 edge에서 지원이 안된다.
                 *
                 * lis.forEach(element => {
                 *     element.style.width = this.width+"%";
                 *     element.style.height = this.height+"%";
                 * });
                 * 
                 */

            }
        },

        cutInput : function(event) {

            // 인풋 실시간 감시 로직

            let toolsRow = this.table.row[this.table.count-1];
            let toolsCol = this.table.column[this.table.count-1];

            // console.log("이벤트 감지")

            this.$emit('cutInput', toolsRow, toolsCol);

        },
        setSelects : function (event) {

            let eventArr = event.target.value.split(",");

            console.log(eventArr);
            
            this.$emit('setSelects', eventArr)

        },
    },
    created() {

        // 이벤트 버스를 이용한 이벤트 발행
        eventBus.$emit('clear', this.clear);
        eventBus.$emit('undo', this.undo);

    },
}
</script>
<style>

.tools {
    min-width : 250px;
    overflow : auto;
    height : 51rem;
    /* background: rgba(7, 102, 255, 0.294); */
}

.tools>ul {
    min-width : 250px;
}

.tools>ul>li {
    margin : 1rem;
    display : flex;
}

/* 글자 */

.tools ul .words {
    border : 1px solid rgba(2, 109, 250, 0.986);
}

/* 표 */

.tools ul> .table{
    color : rgb(80, 150, 255);
    flex-direction: column;
    border: 2px solid rgb(80, 150, 255);
    padding : 1rem;
    box-sizing: border-box;
}

.tools ul .table ul {
    background: rgb(80, 135, 255);
    margin : 0.5rem 0;
    width : auto;
    height : 12rem;
    display : flex;
    flex-flow: row wrap;
    align-items : flex-start;
}

.tools ul .table ul li {
    padding : 0;
    height : auto;
    box-sizing : border-box;
    border : 1px solid rgb(255, 255, 255);
    word-break:break-word;
}

.tools ul .table input{
    width : 30px;
    text-align: center;
}

/* 인풋 박스 */

.tools ul .input {
    flex-direction: column;
    border : 2px solid rgb(80, 150, 255);
    padding : 5%;
    color : rgb(80, 150, 255);
}

.tools ul .input .drag {
    margin-top : 6%;
    padding : 4%;
    
}

.tools ul .input .drag input {
    box-sizing: border-box;
    width : 100%;
}

/* 체크 박스 */

.tools ul .check {
    border-right : 0px;
    position : relative;
    justify-content: center;
    align-items: center;
    padding : 0.5rem;
    border : 2px solid rgb(80, 150, 255);
    color : rgb(80, 150, 255);
}

.tools ul .check:after {
    content : "";
    width : 40px;
    height : 40px;
}

.tools ul .check .drag {
    background: #fff;
    border : 5px solid rgb(80, 150, 255);
    position : absolute;
    right : 4px;
}

.tools ul .check .drag input[type="checkbox"] {
    display : block;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border : 1px solid black;
    position : relative;
    cursor: pointer;
}

.tools ul .check .drag input[type="checkbox"] {
    width : 40px;
    height : 40px;
}

.tools ul .check .drag input[type="checkbox"]:checked:after {
    border : 0px;
    position : relative;
    font-size : 2em;
    font-weight: bold;
    top: 0%;
    left : 20%;
    content: '✔';
}

/* 셀렉트 박스 */

.tools ul .select {
    flex-direction: column;
    color : rgb(80, 150, 255);
    border : 3px solid rgb(80, 150, 255);
    padding : 0.5rem;
    box-sizing: border-box;
}

.tools ul .select .drag {
    margin : 0.5rem;
    padding : 0.7rem;
    box-sizing : border-box;
    border : 3px solid rgb(80, 150, 255);
}

.tools ul .select .drag select {
    width : auto;
    max-width : 90%;
}

.tools ul .select input {
    display : block;
    width : auto;
    margin: 3% 0;
    height : 1.5rem;
    text-indent: 0.5rem;
    border : 1px dotted;
}

.tools ul .select p:nth-child(4) {
    font-size : 13px;
}

/* 전자 서명 */

.tools ul .sign {
    position : relative;
    flex-direction: column;
}

.tools ul .sign .drag {
    border : 5px solid rgb(124, 124, 124);
    box-sizing : border-box;
}

.tools ul .sign .drag .board {
    cursor : pointer;
}

</style>