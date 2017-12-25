<template>
   <div class="my-applications">
      <vue-draggable-resizable :resizable="false" :w="w" :h="h" :z="200" class="application" v-for="(app, name) in appData.applications" :x="app.x" :y="app.y" v-bind:id="name" :key="app.id" :parent="true" :grid="[25,25]">
        <div tabindex="0" class="desktop" @dblclick ="openSesemie" @click="topActive">
          <svgicon v-for="(icon, iconName) in icons" v-if="iconName === name" v-bind:class="app.classname" width="50" height="50" :original="true"  v-bind:id="name" v-bind:name="name" :key="app.id"></svgicon>
          <div class="nest">
            <p>{{app.text}}</p>
          </div>
        </div>
      </vue-draggable-resizable>
   </div>
</template>

<script>
  import appData from '../appData.json'
  import '../compiled-icons'
  export default {
    name: 'AppIcons',
    data () {
      return {
        appData,
        h: 90,
        w: 60,
        icons: {
          aboutme: {
            svg: require('../assets/svg/icons-01.svg'),
            x: 0,
            y: 0
          },
          eightball: {
            svg: require('../assets/svg/icons-02.svg'),
            x: 0,
            y: 117
          },
          solitare: {
            svg: require('../assets/svg/icons-03.svg'),
            x: 0,
            y: 234
          },
          skills: {
            svg: require('../assets/svg/icons-04.svg'),
            x: 0,
            y: 351
          },
          resume: {
            svg: require('../assets/svg/icons-05.svg'),
            x: 0,
            y: 468
          },
          email: {
            svg: require('../assets/svg/icons-06.svg'),
            x: 100,
            y: 0
          },
          threedee: {
            svg: require('../assets/svg/icons-07.svg'),
            x: 100,
            y: 117
          },
          video: {
            svg: require('../assets/svg/icons-08.svg'),
            x: 100,
            y: 351
          },
          music: {
            svg: require('../assets/svg/icons-09.svg'),
            x: 100,
            y: 234
          }
        }
      }
    },
    methods: {
      openSesemie: function (event) {
        var highApp = event.target.closest('.application').id
        if (appData.applications[highApp].openApp === false) {
          appData.applications[highApp].openApp = true
        }
        this.topActive()
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
</script>


<style>
  svg#music:hover .spinner {
    transform-origin: 50%, 50%;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    animation: spin .75s ease-in-out 2;
  }
  svg#music:hover .note {
    animation: note 1.25s ease-in-out 1;
    transform-origin: 50% 50%;
  }

  svg#aboutme:hover path[pid="3"] {
    animation: question 1s 1 ease;
    transform-origin: 50% 50%;
  }
  svg#aboutme:hover {
    animation: float 1s;
    transform-origin: 50% 50%;
  }

  svg#eightball:hover, svg#eightball:hover .eightinner {
    transform-origin: 50%, 50%;
    animation: ballshake .75s ease-in-out 1;
  }

  svg#resume:hover .lower {
    animation: movedown .7s ease;
  }

  svg#resume:hover .upper {
    animation: moveup .7s ease;
  }

  svg#email:hover #globe #worldmove path {
    animation: globe 2.5s ease-in-out 1 alternate;
    transform-origin: 50%, 50%;
  }

  svg#email:hover #globe {
    animation: globefloat 1s ease-in-out 2 alternate;
    transform-origin: 50%, 50%;
}

  svg#email:hover #letter {
    animation: letter .7s ease 1;
    transform-origin: 50%, 50%;
  }

  svg#email:hover .mail {
    animation: letter 1s ease 1;
    transform-origin: 50%, 50%;
  }

  svg#threedee:hover path[pid="12"] {
    animation: glassright .5s linear 3;
  }

  svg#threedee:hover path[pid="13"] {
    animation: glassleft .5s linear 3;
  }

  svg#video:hover path[pid="5"] {
    animation: blink1 .25s linear 2;
  }

  svg#video:hover path[pid="4"] {
    animation: blink2 .25s linear 2;
  }

  svg#video:hover path[pid="3"] {
    animation: blink3 .25s linear 2 .25s;
  }

  svg#video:hover path[pid="2"] {
    animation: blink4 .25s linear 3;
  }

  svg#video:hover path[pid="1"] {
    animation: blink5 .25s linear 1 .25s;
  }

  svg#video:hover path[pid="0"] {
    animation: blink .5s linear;
  }

  svg#solitare:hover, svg#solitare:hover path[pid="8"],  svg#solitare:hover path[pid="9"], svg#solitare:hover path[pid="10"]  {
    transform-origin: 50%, 50%;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    animation: cardmove .75s ease-out forwards;
  }

  svg#skills:hover path[pid="10"] {
    animation: beep 5s linear 2;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  svg#skills:hover path[pid="8"] {
    animation: flash 1s linear;
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

  @keyframes blink3 {
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

  @keyframes ballshake {
    0%{
      transform: translate(0px,-2px);
    }
    20%{
      transform: translate(-2px,2px);
    }
    40%{
      transform: translate(-2px,-2px);
    }
    60%{
      transform: translate(0px,0px);
    }
    80%{
      transform: translate(0px,2px);
    }
    100%{
      transform: translate(0px,0px);
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
</style>
