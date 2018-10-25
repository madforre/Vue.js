<template>
  <div id="app">
    <div class="header">
      <ul class="gnb">
        <li><h1>Form CMS</h1></li>
        <li><p>{{msg}}　<font-awesome-icon icon="marker"/> </p></li>
      </ul>
    </div>
    <div class="middle">
      <div class="left">
        <Tools v-bind:option="option" :table="table" :select="select" v-on:cutInput="cut" v-on:setSelects="set" draggable="false"></Tools>
      </div>
      <div class="right">
        <div class="section one">
          <Document v-bind:option="option" :table="table" :select="select"></Document>
        </div>
      </div>
    </div>
    <p style="color : white;">{{table.row}} {{table.column}} </p>
  </div>
</template>

<script>

import Document from './components/Document.vue'
import Tools from './components/Tools.vue'

// 데이터를 표현하거나 데이터 조작에 대해 요청하는 루트 컴포넌트
export default {
    data : function () {
        return {
            table : {
                count : 1,
                row : [1],
                column : [1],
                shows : [true],
            },
            select : {
                count : 1,
                inputs : [""],
                outputs : [],
                shows : [true],
            },
            msg: '원하는 재료를 선택 / 동의서를 구성',
            option: {
                penColor:"rgb(0, 0, 0)",
                backgroundColor:"rgb(233, 233, 233)",
            },
        }
    },
    components: {
        'Tools' : Tools,
        'Document' : Document,
    },
    methods : {

        cut : function(toolsRow, toolsCol) {
            console.log("이벤트 컷 수신")
            this.table.row[this.table.count-1] = toolsRow;
            this.table.column[this.table.count-1] = toolsCol;

        },
        set : function(eventArr) {
            console.log("이벤트 set 수신")
            this.select.outputs[this.select.count-1] = eventArr;
        },
    },
    mounted() {

        /* 
         * 알아두기 : mounted와 마찬가지로 vm.$nextTick를 사용하면 
         * 전체가 렌더링된 상태를 보장할 수 있다. 
         * mounted단계에서 내장 함수인 HTML5 Drag & Drop API 를 사용하였다.
         */
        
        let dragged;
        let draggedParentClass;
        
        // events fired on the draggable target (필수 코드 : dragover)
        document.addEventListener("dragover", (event) => {

            // prevent default to allow drop
            event.preventDefault();

        }, false);
    
        // store a ref. on the dragged elem - 사용자가 요소나 텍스트 블록을 드래그시 발생
        document.addEventListener("dragstart", (event) => {

            // 초기화
            dragged = null;
            draggedParentClass = null;

            // 크로스 브라우징용 코드 (edge, firefox)
            event.dataTransfer.setData('text', 'anything');

            console.log(event.target.className);

            // 클래스 이름이 drag 있는 것만 drop 되게끔 설정 event.target.className == "dropped" || 제외
            if ( event.target.className == "drag select "+(this.select.count-1) || 
                event.target.className == "drag table "+(this.table.count-1) || 
                event.target.className == "drag" ) {
                
                dragged = event.target;
                draggedParentClass = event.target.parentNode.className;

            } else {

                // alert("생성 또는 추가할 항목만 드래그 해주세요!")
                return;

            }

            // make it half transparent (드래그 시 투명도 조절)
            event.target.style.opacity = .5;
        
        }, false);
    
        document.addEventListener("dragend", (event) => {

            event.target.style.border = "";

            // reset the transparency
            event.target.style.opacity = "";
    
        }, false);
    
        // events fired on the drop targets
        document.addEventListener("drop", (event) => {

            event.preventDefault();

            console.log(event);
            console.log(event.target);
            console.log(event.target.className);

            // move dragged elem to the selected drop target

            /* 
             * 이벤트 타겟의 부모 노드가 document이면 document에 맞게 사이즈 조절한다.
             * 부모 노드가 document가 아니라 표 안속에 있는 경우는 정해진 대로 가공한다.
             */

            if ( event.target.className == "document" ) {

                // 드롭 후 복구를 위해 자식 노드를 포함하여 미리 복사
                let dupElement = dragged.cloneNode(true);
                let count;

                event.target.appendChild( dragged );

                if (draggedParentClass == "table") {

                    count = this.table.count;
                    twoWayBindCase(dupElement, count);

                    // 카운트 추가
                    this.table.count = this.table.count + 1
                    // 카운트가 추가 되기전의 bool을 false로 하여 tools에서 안보이게 처리한다.
                    this.table.shows[this.table.count-2] = false;
                    // 다음에 드래그 앤 드랍할 표를 준비시킨다.
                    this.table.shows.push(true);
                    this.table.row.push(1)
                    this.table.column.push(1)

                } else if (draggedParentClass == "select") {

                    count = this.select.count;
                    twoWayBindCase(dupElement, count);

                    // 카운트 추가
                    this.select.count = this.select.count + 1;
                    // 카운트가 추가 되기전의 bool을 false로 하여 tools에서 안보이게 처리한다.
                    this.select.shows[this.select.count-2] = false;
                    // 다음에 드래그 앤 드랍할 표를 준비시킨다.
                    this.select.shows.push(true);
                    this.select.inputs.push("");

                } else if (draggedParentClass == "sign") {

                    // document의 높이에 dragged의 높이가 auto로 적용이 안되므로 잠깐 풀어줘야 한다.
                    dragged.parentNode.height = "auto";

                    dragged.setAttribute("class", "dropped");
                    dragged.style.width = "100%";
                    dragged.style.height = "15%";
                    dragged.style.resize = "none";
                    dragged.style.border = "";
                    dragged.setAttribute("draggable", "false");

                } else {

                    commonCase(dupElement);

                }

            }

            if (event.target.className == "bin") {
                console.log("delete");
            }

        }, false);

        function commonCase(dupElement) {

            let restoreMe = document.querySelector("." + draggedParentClass);
                
            dupElement.style.opacity = "";
            restoreMe.appendChild(dupElement);

            dragged.setAttribute("class", "dropped");

            // document의 높이에 dragged의 높이가 auto로 적용이 안되므로 잠깐 풀어줘야 한다.
            dragged.parentNode.height = "auto";

            switch (draggedParentClass) {

                case "check":
                dragged.style.width ="3.9%";
                dragged.style.height ="3%";
                break;

                case "words":
                dragged.style.fontSize = "2rem";
                dragged.style.width = "auto";
                dragged.style.height = "3%";
                break;

                case "input":
                dragged.style.width ="auto";
                dragged.firstChild.style.width ="90%";
                dragged.firstChild.style.height ="90%";
                dragged.firstChild.style.justifyContent = "center";
                break;

            }

        }
        function twoWayBindCase(dupElement, count) {

            // 드래그했던 Elements 의 부모 위치 변수로 저장
            dragged.setAttribute("class", "dropped "+(count-1));

            // document의 높이에 dragged의 높이가 auto로 적용이 안되므로 잠깐 풀어줘야 한다.
            dragged.parentNode.height = "auto";

            switch (draggedParentClass) {

                case "select":
                dragged.style.width = "auto";
                dragged.style.height = "1.3%";
                break;

                case "table":
                dragged.style.height = "auto";
                dragged.style.width = "100%";
                let lis = dragged.querySelectorAll("ul > li");
                for(let i=0; i<lis.length; i++) {
                    lis[i].style.height = "50px";
                    lis[i].setAttribute("class", i+1);
                }
                break;
            }

        }
    },
    beforeUpdate() {

        // 행, 열 input 실시간 감시

        if (this.table.column[this.table.count-1].length > 2 || this.table.column[this.table.count-1] > 12) {

            let cut = String(this.table.column[this.table.count-1]);
            cut = cut.slice(0,-1);
            cut = cut.slice(0, 2);
            this.table.column[this.table.count-1] = cut;

        }
            
        if (this.table.row[this.table.count-1].length > 2 || this.table.row[this.table.count-1] > 12) {

            let cut = String(this.table.row[this.table.count-1]);
            cut = cut.slice(0,-1);
            cut = cut.slice(0, 2);
            this.table.row[this.table.count-1] = cut;

        }

    },
}
</script>

<style>

/* reset init */

@charset "utf-8";

*{
    margin: 0;
    padding: 0;
}
html,body{
    width:100%;
    height:100%;
}
a{
    text-decoration: none;
    color:#333;
}
ul,ol,li{
    list-style: none;
}
img{
    border:0px;
}

/* app */

html {
    min-width : 900px;
    overflow: hidden;
}

#app {
    height : auto;
    text-align: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    box-sizing: border-box;
    padding : 0.5rem;
}

/* app header */

#app .header {
    display : flex;
    flex-direction: row;
    box-sizing: border-box;
    background : rgb(80, 150, 255);
    color : white;
    border-bottom : 2px solid rgb(85, 144, 233);
    padding : 1rem;
    margin-bottom : 8px;
    background-image: linear-gradient(to bottom right, rgb(35, 72, 235), rgb(85, 144, 233));
}

#app .header .gnb {
    display : flex;
    flex-direction: row;
    align-items: center;
    margin : 0 auto;
}

#app .header .gnb li {
    margin : 0 0.5rem;
}

#app .header h1, h3 {
    font-weight: normal;
}

#app .header h1 {
    color : rgb(255, 255, 255);
}

#app .header h3 {
    color : rgb(12, 88, 44);
}

.middle {
    height : auto;
    width : 100%;
    display : flex;
    flex-direction: row;
}

.middle .left {
    border : 3px solid rgb(80, 150, 255);
    width : 16%;
    margin-right : 0.5%;
    min-width : 300px;
}

.middle .left {
    box-sizing : border-box;
    padding : 0.5rem;
}
.middle .right {
    width : 83%;
    /* height : 100%;
    background: #333; */
}

.middle .right .one {
    box-sizing : border-box;
    border : 2px solid rgb(80, 150, 255);
    overflow: auto;
    align-items: center;
    box-sizing: border-box;
    margin-bottom : 1rem;
}

.tools .drag {
    cursor : all-scroll;
}

</style>
