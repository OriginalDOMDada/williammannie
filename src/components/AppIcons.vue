<template>
   <div class="my-applications" id="graph" v-bind="graphPos">
        <div tabindex="0" v-for="(app, name) in appData.applications" v-bind:id="name" :key="app.id" class="desktop application" v-on:click="doubleup" @mousedown="startMove" @touchstart="startMove" v-bind:style="{ left: icons[name].x + 'px', top: icons[name].y + 'px' }">
          <svgicon v-for="(icon, iconName) in icons" v-if="iconName === name" v-bind:class="app.classname" width="50" height="50" :original="true"  v-bind:id="name" v-bind:name="name" :key="app.id"></svgicon>
          <div class="nest">
            <p class="name">{{app.text}}</p>
          </div>
        </div>
   </div>
</template>

<script>
  import appData from '../appData.json'
  import '../compiled-icons'
  export default {
    name: 'AppIcons',
    data () {
      return {
        appPos: {
          left: 0,
          top: 0
        },
        appData,
        h: 90,
        w: 60,
        icons: {
          aboutme: {
            svg: require('../assets/svg/icons-01.svg'),
            x: 0,
            y: 0,
            clicks: 0
          },
          eightball: {
            svg: require('../assets/svg/icons-02.svg'),
            x: 0,
            y: 117,
            clicks: 0
          },
          solitare: {
            svg: require('../assets/svg/icons-03.svg'),
            x: 0,
            y: 234,
            clicks: 0
          },
          skills: {
            svg: require('../assets/svg/icons-04.svg'),
            x: 0,
            y: 351,
            clicks: 0
          },
          resume: {
            svg: require('../assets/svg/icons-05.svg'),
            x: 0,
            y: 468,
            clicks: 0
          },
          email: {
            svg: require('../assets/svg/icons-06.svg'),
            x: 100,
            y: 0,
            clicks: 0
          },
          threedee: {
            svg: require('../assets/svg/icons-07.svg'),
            x: 100,
            y: 117,
            clicks: 0
          },
          video: {
            svg: require('../assets/svg/icons-08.svg'),
            x: 100,
            y: 351,
            clicks: 0
          },
          music: {
            svg: require('../assets/svg/icons-09.svg'),
            x: 100,
            y: 234,
            clicks: 0
          },
          wammie: {
            svg: require('../assets/svg/icons-09.svg'),
            x: 100,
            y: 468,
            clicks: 0
          },
          graphHeight: '',
          graphWidth: ''
        }
      }
    },
    computed: {
      graphPos () {
        var $this = this
        $this.graphHeight = window.innerHeight
        $this.graphWidth = window.innerWidth
        var sizeHeight = this.graphHeight
        var sizeWidth = this.graphWidth
        return {
          width: sizeWidth,
          height: sizeHeight
        }
      }
    },
    methods: {
      startMove: function (event) {
        var $this = this
        const touch = event.type === 'touchstart'
        if (!touch && event.button !== 0) return
        const events = touch ? {move: 'touchmove', stop: 'touchend'} : {move: 'mousemove', stop: 'mouseup'}
        var dragApp = event.target.closest('.application').id
        const point = {
          x: event.clientX || event.touches[0].clientX,
          y: event.clientY || event.touches[0].clientY
        }
        var appPos = $this.icons[dragApp]
        const getPos = touch ? getTouchPos : getMousePos
        var moving = true
        var differenceX = Math.abs(appPos.x - point.x)
        var differenceY = Math.abs(appPos.y - point.y)
        const updateFn = () => {
          if (moving && !isNaN(differenceY)) {
            requestAnimationFrame(updateFn)
            appPos.x = point.x - Math.abs(differenceX)
            appPos.y = point.y - Math.abs(differenceY)
          } else {
            appPos.x = parseInt(document.getElementById(dragApp).style.left, 10)
            appPos.y = parseInt(document.getElementById(dragApp).style.top, 10)
          }
        }
        const moveFn = event => getPos(event, point)
        const stopFn = event => {
          moving = false
          window.removeEventListener(events.move, moveFn)
          window.removeEventListener(events.stop, stopFn)
        }
        requestAnimationFrame(updateFn)
        moveFn(events)
        window.addEventListener(events.move, moveFn)
        window.addEventListener(events.stop, stopFn)
      },
      openSesemie: function (event) {
        var highApp = event.target.closest('.application').id
        if (highApp === 'email') {
          window.location.href = 'mailto:willmannie@gmail.com'
        } else {
          if (appData.applications[highApp].openApp === false) {
            appData.applications[highApp].openApp = true
          }
          this.topActive()
        }
      },
      doubleup: function (event) {
        var highApp = event.target.closest('.application').id
        var $this = this
        this.icons[highApp].clicks = this.icons[highApp].clicks + 1
        if (this.icons[highApp].clicks === 2) {
          if (highApp === 'email') {
            window.location.href = 'mailto:willmannie@gmail.com'
          } else {
            if (appData.applications[highApp].openApp === false) {
              appData.applications[highApp].openApp = true
            }
            this.icons[highApp].clicks = 0
            this.topActive()
          }
        } else {
          setTimeout(function () {
            $this.icons[highApp].clicks = 0
          }, 500)
        }
      },
      topActive: function () {
        var highApp = event.target.closest('.application').id
        if (appData.applications[highApp].openApp === true) {
          var activeApps = document.getElementsByClassName('app')
          var initalHi = 200
          var zIndexs = []
          for (var i = 0; i < activeApps.length; i++) {
            var zindex = parseInt(activeApps[i].style.zIndex)
            zIndexs.push(zindex)
          }
          var largest = Math.max.apply(Math, zIndexs)
          if (initalHi <= largest) {
            appData.applications[highApp].z = largest + 1
          }
        }
      }
    }
  }
  function getMousePos (mouseEvent, point) {
    point.x = mouseEvent.clientX
    point.y = mouseEvent.clientY
  }
  function getTouchPos (touchEvent, point) {
    point.x = event.touches[0].clientX
    point.y = event.touches[0].clientY
  }
  document.addEventListener('touchmove', function (event) {
    event = event.originalEvent || event
    if (event.scale !== 1) {
      event.preventDefault()
    }
  }, false)
  </script>


<style>
  .wild {
    position: absolute;
    width: 100px;
    height: 100px;
    display: block;
    background-color: white;
  }
  svg#music:hover .spinner {
    transform-origin: 37.879px 37.4px;
    -webkit-transform-origin: 37.879px 37.4px;
    -moz-transform-origin: 50% 50%;
    animation: spin .75s ease-in-out 2;
    -webkit-animation: spin .75s ease-in-out 2;
  }
  svg#music:hover .note {
    animation: note 1.25s ease-in-out 1;
    transform-origin: 14.597px 19.1px;
    -webkit-transform-origin: 14.597px 19.1px;
  }

  svg#aboutme:hover path[pid="3"] {
    animation: question 1s 1 ease;
    -webkit-animation: question 1s 1 ease;
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
  }
  svg#aboutme:hover {
    animation: float 1s;
    -webkit-animation: float 1s;
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
  }

  svg#eightball:hover, svg#eightball:hover .eightinner {
    transform-origin: 50%, 50%;
    -webkit-transform-origin: 50%, 50%;
    animation: ballshake 1.25s cubic-bezier(.36,.07,.19,.97) forwards;
    -webkit-animation: ballshake 1.25s cubic-bezier(.36,.07,.19,.97) forwards;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  svg#resume:hover .lower {
    animation: movedown .7s ease;
    -webkit-animation: movedown .7s ease;
  }

  svg#resume:hover .upper {
    animation: moveup .7s ease;
    -webkit-animation: moveup .7s ease;
  }

  svg#email:hover #globe #worldmove path {
    animation: globe 2.5s ease-in-out 1 alternate;
    -webkit-animation: globe 2.5s ease-in-out 1 alternate;
    transform-origin: 50%, 50%;
    -webkit-transform-origin: 50%, 50%;
  }

  svg#email:hover #globe {
    animation: globefloat 1s ease-in-out 2 alternate;
    transform-origin: 50%, 50%;
    -webkit-animation: globefloat 1s ease-in-out 2 alternate;
    -webkit-transform-origin: 50%, 50%;
}

  svg#email:hover #letter {
    animation: letter .7s ease 1;
    transform-origin: 50%, 50%;
    -webkit-animation: letter .7s ease 1;
    -webkit-transform-origin: 50%, 50%;
  }

  svg#email:hover .mail {
    animation: letter 1s ease 1;
    transform-origin: 50%, 50%;
    -webkit-animation: letter 1s ease 1;
    -webkit-transform-origin: 50%, 50%;
  }

  svg#threedee:hover path[pid="12"] {
    animation: glassright .5s linear 3;
    -webkit-animation: glassright .5s linear 3;
  }

  svg#threedee:hover path[pid="13"] {
    animation: glassleft .5s linear 3;
    -webkit-animation: glassleft .5s linear 3;
  }

  svg#video:hover path[pid="5"] {
    animation: blink1 .25s linear 2;
    -webkit-animation: blink1 .25s linear 2;
  }

  svg#video:hover path[pid="4"] {
    animation: blink2 .25s linear 2;
    -webkit-animation: blink2 .25s linear 2;
  }

  svg#video:hover path[pid="3"] {
    animation: blink3 .25s linear 2 .25s;
    -webkit-animation: blink3 .25s linear 2 .25s;
  }

  svg#video:hover path[pid="2"] {
    animation: blink4 .25s linear 3;
    -webkit-animation: blink4 .25s linear 3;
  }

  svg#video:hover path[pid="1"] {
    animation: blink5 .25s linear 1 .25s;
    -webkit-animation: blink5 .25s linear 1 .25s;
  }

  svg#video:hover path[pid="0"] {
    animation: blink .5s linear;
    -webkit-animation: blink .5s linear;
  }

  svg#solitare:hover, svg#solitare:hover path[pid="8"],  svg#solitare:hover path[pid="9"], svg#solitare:hover path[pid="10"]  {
    transform-origin: 50%, 50%;
    -webkit-transform-origin: 50%, 50%;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    animation: cardmove .75s ease-out forwards;
  }

  svg#skills:hover path[pid="10"] {
    animation: beep 5s linear 2;
    -webkit-animation: beep 5s linear 2;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  svg#skills:hover path[pid="8"] {
    animation: flash 1s linear;
    -webkit-animation: flash 1s linear;
  }

  @keyframes flash {
    0%{
      fill:#00FF80;
    }
    50%{
      fill:#FF0080;
    }
    100%{
      fill:#00FF80;
    }
  }

  @keyframes beep {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes cardmove {
    0%{
      transform: translate(0px,0px);
    }
    20%{
      transform: translate(0px,2px) scale(1) rotate(.5deg);
    }
    40%{
      transform: translate(0px,-3px) scale(1) rotate(-.5deg);
    }
    60%{
      transform: translate(0px,-1px) scale(1) rotate(0deg);
    }
    100%{
      transform: translate(0px,0px) rotate(0deg);
    }
  }

  @keyframes blink {
    0%{
      opacity: 1;
      fill: ;
    }
    50%{
      opacity: .1;
      fill: #0000FF;
    }
    100%{
      opacity: 1;
      fill: ;
    }
  }

  @-webkit-keyframes blink {
    0%{
      opacity: 1;
      fill: ;
    }
    50%{
      opacity: .1;
      fill: #0000FF;
    }
    100%{
      opacity: 1;
      fill: ;
    }
  }

  @keyframes blink1 {
    0%{
      opacity: 1;
      fill: ;
    }
    50%{
      opacity: .1;
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: ;
    }
  }

  @-webkit-keyframes blink1 {
    0%{
      opacity: 1;
      fill: ;
    }
    50%{
      opacity: .1;
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: ;
    }
  }

  @keyframes blink2 {
    0%{
      opacity: 1;
      fill: #FFFF00;
    }
    50%{
  /*     opacity: .1; */
      fill: #5D5D5D;
    }
    100%{
      opacity: 1;
      fill: #FFFF00;
    }
  }

  @-webkit-keyframes blink2 {
    0%{
      opacity: 1;
      fill: #FFFF00;
    }
    50%{
  /*     opacity: .1; */
      fill: #5D5D5D;
    }
    100%{
      opacity: 1;
      fill: #FFFF00;
    }
  }

  @-webkit-keyframes blink3 {
    0%{
      opacity: 1;
      fill: #00FF80;
    }
    50%{
  /*     opacity: .1; */
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: #00FF80;
    }
  }

  @keyframes blink4 {
    0%{
      opacity: 1;
      fill: #FF0080;
    }
    50%{
  /*     opacity: .1; */
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: #FF0080;
    }
  }

  @-webkit-keyframes blink4 {
    0%{
      opacity: 1;
      fill: #FF0080;
    }
    50%{
  /*     opacity: .1; */
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: #FF0080;
    }
  }

  @keyframes blink5 {
    0%{
      opacity: 1;
      fill: #0000FF;
    }
    50%{
  /*     opacity: .1; */
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: #0000FF;
    }
  }

  @-webkit-keyframes blink5 {
    0%{
      opacity: 1;
      fill: #0000FF;
    }
    50%{
  /*     opacity: .1; */
      fill: #FFFFFF;
    }
    100%{
      opacity: 1;
      fill: #0000FF;
    }
  }

  @keyframes glassright {
    0%{
      fill:#0000FF;
    }
    50%{
      fill:#FF0080;
    }
    100%{
      fill:#0000FF;
    }
  }

  @-webkit-keyframes glassright {
    0%{
      fill:#0000FF;
    }
    50%{
      fill:#FF0080;
    }
    100%{
      fill:#0000FF;
    }
  }

  @keyframes glassleft {
    0%{
      fill:#FF0080;
    }
    50%{
      fill:#0000FF;
    }
    100%{
      fill:#FF0080;
    }
  }

  @-webkit-keyframes glassleft {
    0%{
      fill:#FF0080;
    }
    50%{
      fill:#0000FF;
    }
    100%{
      fill:#FF0080;
    }
  }

  @keyframes globe {
    0%{
      transform: translate(0px,0px);
  /*     opacity: .1; */
    }
    5% {
      transform: translate(-40px,0px);
    }
    7% {
      transform: translate(-45px,0px);
    }
    55%{
      transform: translate(350px,0px);
    }
    57%{
      transform: translate(350px,0px);
    }
    90%{
      transform: translate(-5px,0px);
    }
    95%{
      transform: translate(1px,0px);
    }
    99%{
  /*     transform: translate(5px,0px); */
    }
    100%{
      transform: translate(0px,0px);
    }
  }

  @-webkit-keyframes globe {
    0%{
      -webkit-transform: translate(0px,0px);
  /*     opacity: .1; */
    }
    5% {
      -webkit-transform: translate(-40px,0px);
    }
    7% {
      -webkit-transform: translate(-45px,0px);
    }
    55%{
      -webkit-transform: translate(350px,0px);
    }
    57%{
      -webkit-transform: translate(350px,0px);
    }
    90%{
      -webkit-transform: translate(-5px,0px);
    }
    95%{
      -webkit-transform: translate(1px,0px);
    }
    99%{
  /*  -webkit-transform: translate(5px,0px); */
    }
    100%{
      -webkit-transform: translate(0px,0px);
    }
  }


  @keyframes letter {
     0%{
      transform: translate(-60px,0px);
      opacity: 0;
    }
    70%{
      transform: translate(-60px,0px);
      opacity: 0;
    }
    90% {
      transform: translate(1px,0px);
    }
    95% {
      transform: translate(-2px,0px);
    }
    100%{
      transform: translate(0px,0px);
      opacity: 1;
    }
  }

  @-webkit-keyframes letter {
     0%{
      -webkit-transform: translate(-60px,0px);
      opacity: 0;
    }
    70%{
      -webkit-transform: translate(-60px,0px);
      opacity: 0;
    }
    90% {
      -webkit-transform: translate(1px,0px);
    }
    95% {
      -webkit-transform: translate(-2px,0px);
    }
    100%{
      -webkit-transform: translate(0px,0px);
      opacity: 1;
    }
  }


  @keyframes globefloat {
     0% {
      transform: translate(0px,0px);
    }
    45% {
      transform: translate(-2px,0px) rotate(-1deg);
    }
    50% {
      transform: translate(3px,3px) rotate(1deg);
    }
    100% {
      transform: translate(0px,0px);
    }
  }

  @-webkit-keyframes globefloat {
     0% {
      -webkit-transform: translate(0px,0px);
    }
    45% {
      -webkit-transform: translate(-2px,0px) rotate(-1deg);
    }
    50% {
      -webkit-transform: translate(3px,3px) rotate(1deg);
    }
    100% {
      -webkit-transform: translate(0px,0px);
    }
  }

  @keyframes movedown {
    0%{
      transform: translate(0px,0px);
    }
    50%{
      transform: translate(3px,5px);
    }
    65%{
      transform: translate(-2px,-1px);
    }
    90%{
      transform: translate(1px,1px);
    }
    100%{
      transform: translate(0px,0px);
    }
  }

  @-webkit-keyframes movedown {
    0%{
      -webkit-transform: translate(0px,0px);
    }
    50%{
      -webkit-transform: translate(3px,5px);
    }
    65%{
      -webkit-transform: translate(-2px,-1px);
    }
    90%{
      -webkit-transform: translate(1px,1px);
    }
    100%{
      -webkit-transform: translate(0px,0px);
    }
  }

  @keyframes moveup {
    0%{
      transform: translate(0px,0px);
    }
    50%{
      transform: translate(-3px,-5px);
    }
    65%{
      transform: translate(2px,1px);
    }
    90%{
      transform: translate(-1px,-1px);
    }
    100%{
      transform: translate(0px,0px);
    }
  }

  @-webkit-keyframes moveup {
    0%{
      -webkit-transform: translate(0px,0px);
    }
    50%{
      -webkit-transform: translate(-3px,-5px);
    }
    65%{
      -webkit-transform: translate(2px,1px);
    }
    90%{
      -webkit-transform: translate(-1px,-1px);
    }
    100%{
      -webkit-transform: translate(0px,0px);
    }
  }

  @keyframes ballshake {
    10%, 90% {
      transform: translate3d(0px, 2px, 0);
    }

    20%, 80% {
      transform: translate3d(-1px, -1px, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-1px, -2px, 2px);
    }

    40%, 60% {
      transform: translate3d(0px, 4px, 0);
    }
  }

  @-webkit-keyframes ballshake {
    10%, 90% {
      -webkit-transform: translate3d(0px, 2px, 0);
    }

    20%, 80% {
      -webkit-transform: translate3d(-1px, -1px, 0);
    }

    30%, 50%, 70% {
      -webkit-transform: translate3d(-1px, -2px, 2px);
    }

    40%, 60% {
      -webkit-transform: translate3d(0px, 4px, 0);
    }
  }

  @keyframes question {
    0% {
      transform: scale(1), rotate(0deg);
    }
    25% {
      transform: rotate(25deg);
    }
    50% {
      transform: scale(1.1);
    }
    75% {
      transform: rotate(-16deg);
    }
    100% {
      transform: scale(1) rotate(-2deg);
    }
  }

  @-webkit-keyframes question {
    0% {
      -webkit-transform: scale(1), rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(25deg);
    }
    50% {
      -webkit-transform: scale(1.1);
    }
    75% {
      -webkit-transform: rotate(-16deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(-2deg);
    }
  }

  @keyframes float {
    0% {
      transform: translate(0px,0px);
    }
    25% {
      transform: translate(0px,5px);
    }
    50% {
      transform: translate(0px,0px);
    }
    75% {
      transform: translate(0px,5px);
    }
    100% {
      transform: translate(0px,0px);
    }
  }

  @-webkit-keyframes float {
    0% {
      -webkit-transform: translate(0px,0px);
    }
    25% {
      -webkit-transform: translate(0px,5px);
    }
    50% {
      -webkit-transform: translate(0px,0px);
    }
    75% {
      -webkit-transform: translate(0px,5px);
    }
    100% {
      -webkit-transform: translate(0px,0px);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg) translate(0,0);
    }
    25% {
      transform: rotate(-90deg) translate(0,0);
    }
    100% {
      transform: rotate(359deg) translate(0,0);
    }
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg) translate(0,0);
    }
    25% {
      -webkit-transform: rotate(-90deg) translate(0,0);
    }
    100% {
      -webkit-transform: rotate(359deg) translate(0,0);
    }
  }

  @keyframes note {
    0% {
      transform: rotate(0deg) translate(0,-3px);;
    }
    25% {
      transform: rotate(-15deg) translate(2px,2px);
    }
    50% {
      transform: rotate(10deg) translate(0,-3px);
    }
    75% {
      transform: rotate(-18deg) translate(0,1px);
    }
    100% {
      transform: rotate(0deg) translate(0,0);
    }
  }

  @-webkit-keyframes note {
    0% {
      -webkit-transform: rotate(0deg) translate(0,-3px);;
    }
    25% {
      -webkit-transform: rotate(-15deg) translate(2px,2px);
    }
    50% {
      -webkit-transform: rotate(10deg) translate(0,-3px);
    }
    75% {
      -webkit-transform: rotate(-18deg) translate(0,1px);
    }
    100% {
      -webkit-transform: rotate(0deg) translate(0,0);
    }
  }
</style>
