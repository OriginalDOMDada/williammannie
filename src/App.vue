<template>
    <div id="app">
      <router-view name="loadingscreen"></router-view>
      <router-view name="header"></router-view>
      <div class="panel" id="og">
        <router-view name="appicons"></router-view>
        <div class="windows">
          <router-view name="aboutme"></router-view>
          <router-view name="eightball"></router-view>
          <router-view name="solitare"></router-view>
          <router-view name="skills"></router-view>
          <router-view name="resume"></router-view>
          <router-view name="email"></router-view>
          <router-view name="threedee"></router-view>
          <router-view name="video"></router-view>
          <router-view name="music"></router-view>
          <router-view name="wammie"></router-view>
        </div>
        <router-view name="blog"></router-view>
        <img class="computer-bounce" src="./assets/svg/dummy.svg">
      </div>
    </div>
</template>

<script>
// import GyroNorm from 'gyronorm'
// var GyroNorm = require('../libs/gyronorm.complete.js')
// import Fulltilt from '@hughsk/fulltilt'
export default {
  name: 'app',
  mounted () {
    // const element = document.querySelector('.hello-wrap')
    // VanillaTilt.init(element, {
    //   max: 40,
    //   speed: 100,
    //   reverse: true,
    //   perspective: 900,
    //   reset: false
    // })
    // function myScript (event) {
    // /* eslint-disable */
    //   var windowMafW = (((window.innerWidth / 2) - event.clientX) / (window.innerWidth / 2)) * 6
    //   var windowMafH = (((window.innerHeight / 2) - event.clientY) / (window.innerHeight / 2)) * 1.25
    //   var shift = document.getElementById('shifter').getElementsByTagName('g')
    //   var shifter = []
    //   for (let i = 0; i < shift.length; i++) {
    //     shifter.push(shift[i])
    //   }
    //   shifter.reverse()
    //   for (let i = 0; i < shifter.length; i++) {
    //     shifter[i].style.transform = 'translate3d(' + windowMafW * i + 'px, ' + windowMafH * i + 'px, 20px)'
    //   }
    //
    // }
    // document.addEventListener('mousemove', myScript)
    //
    // here
    // comment out
    // var gn = new GyroNorm()
    // console.log(gn)
    // var ongnReady = function () {
    //   console.log(this)
    // }
    // gn.init().then(ongnReady)
    // var ongnReady = function () {
    //   console.log(this)
    // }
  }
}
</script>
<style type="css" scope>
  @import './main.css';
    #shifter g {
      transition:  transform .1s linear;
      transform-origin: center center;
    }
    #shifter g:first-child {
      transition:  transform .1s linear;
    }
    #shifter g:nth-child(2) {
      transition:  transform .11s linear;
    }
    #shifter g:nth-child(3) {
      transition:  transform .12s linear;
    }
    #shifter g:nth-child(4) {
      transition:  transform .13s linear;
    }
    #shifter g:nth-child(5) {
      transition:  transform .14s linear;
    }
    #shifter g:nth-child(6) {
      transition:  transform .15s linear;
    }
    #shifter g:nth-child(7) {
      transition:  transform .16s linear;
    }
    #shifter g:nth-child(8) {
      transition:  transform .17s linear;
    }
    #shifter g:nth-child(9) {
      transition:  transform .18s linear;
    }
    #shifter g:nth-child(10) {
      transition:  transform .19s linear;
    }
    #shifter g:nth-child(11) {
      transition:  transform .2s linear;
    }
    #shifter g:nth-child(12) {
      transition:  transform .21s linear;
    }
    #shifter g:nth-child(13) {
      transition:  transform .22s linear .22s;
    }
    .hello:hover #shifter g:first-child  {
      /* fill: #FF0080; */
      transition: all .1s linear 2s;
      animation: helloblink11 1s 4 ease-in-out 5.1s;
    }
    .hello:hover #shifter g:nth-child(2)  {
      /* fill: #00FF80; */
      /* stroke: blue; */
      transition: all .2s linear 1.9s;
      animation: helloblink10 1s 4 ease-in-out 5s;
    }
    .hello:hover #shifter g:nth-child(3)  {
      /* fill: #0000FF; */
      transition: all .3s linear 1.8s;
      animation: helloblink9 1s 4 ease-in-out 4.9s;
    }
    .hello:hover #shifter g:nth-child(4)  {
      /* fill: #FFFF00; */
      /* stroke: blue; */
      transition: all .4s linear 1.7s;
      animation: helloblink8 1s 4 ease-in-out 4.8s;
    }
    .hello:hover #shifter g:nth-child(5)  {
      /* fill: #FF0080; */
      transition: all .5s linear 1.6s;
      animation: helloblink7 1s 4 ease-in-out 4.7s;
    }
    .hello:hover #shifter g:nth-child(6)  {
      /* fill: #00FF80; */
      /* stroke: blue; */
      transition: all .6s linear 1.5s;
      animation: helloblink6 1s 4 linear 4.6s;
    }
    .hello:hover #shifter g:nth-child(7)  {
      /* fill: #0000FF; */
      transition: all .7s linear 1.4s;
      animation: helloblink5 1s 4 ease-in-out 4.5s;
    }
    .hello:hover #shifter g:nth-child(8)  {
      /* fill: #FFFF00;
      stroke: blue; */
      transition: all .8s linear 1.3s;
      animation: helloblink4 1s 4 ease-in-out 4.4s;
    }
    .hello:hover #shifter g:nth-child(9)  {
      /* fill: #FF0080; */
      transition: all .9s linear 1.2s;
      animation: helloblink3 1s 4 ease-in-out 4.3s;
    }
    .hello:hover #shifter g:nth-child(10)  {
      /* fill: #00FF80;
      stroke: blue; */
      transition: all 1s linear 1.1s;
      animation: helloblink2 1s 4 ease-in-out 4.2s;
    }
    .hello:hover #shifter g:nth-child(11)  {
      /* fill: #0000FF; */
      transition: all 1.1s linear 1s;
      animation: helloblink1 1s 4 ease-in-out 4.1s;
    }
    .hello:hover #shifter g:nth-child(12)  {
      fill: #FFFFFF;
      transition: .75s ease-in-out .75s;
      stroke: #0000FF;
      animation: helloblink 1s 4 ease-out 4s;
      /* transform-origin: 50% 50%; */
    }
    @keyframes helloblink {
      0% {
        transform: translate(0, 0) rotate(0);
        fill: #FFFF00;
        stroke: #0000FF;
        opacity: 1;
      }
      25% {
        transform: translate(1.5px, 1.25px) rotate(2.5deg);
        fill: #FFFF00;
        opacity: .95;
        stroke: #0000FF;
      }
      50% {
        transform: translate(-1.5px, -1.25px) rotate(-5deg);
        fill: #FFFFFF;
        opacity: .99;
        stroke: #0000FF;
      }
      75% {
        fill: #FFFFFF;
        stroke: #0000FF;
      }
      100% {
        transform: translate(0, 0) rotate(0);
        fill: #FFFFFF;
        stroke: #0000FF;
        opacity: 1;
      }
    }
    @keyframes helloblink1 {
      0% {
        fill: #0000FF;
        stroke: #FFFFFF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        stroke: #0000FF;
        transform: translate(3.5px, 1px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #0000FF;
        stroke: #FFFFFF;
        transform: translate(-3.5px, -1px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #0000FF;
        stroke: #FFFFFF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink2 {
      0% {
        fill: #00FF80;
        sroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(4.5px, 2px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #00FF80;
        sroke: #0000FF;
        transform: translate(-4.5px, -1.5px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #00FF80;
        sroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink3 {
      0% {
        /* fill: white; */
        fill: #FF0080;
        sroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(5.5px, 3px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #FF0080;
        sroke: #0000FF;
        transform: translate(-5.5px, -3px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #FF0080;
        sroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink4 {
      0% {
        /* fill: white; */
        fill: #FFFF00;
        sroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(6.5px, 4px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #FFFF00;
        sroke: #0000FF;
        transform: translate(-6.5px, -4px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #FFFF00;
        sroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink5 {
      0% {
        fill: #0000FF;
        sroke: #FFFFFF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(7.5px, 5px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #0000FF;
        sroke: #FFFFFF;
        transform: translate(-7.5px, -5px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #0000FF;
        sroke: #FFFFFF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink6 {
      0% {
        fill: #00FF80;
        sroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(8.5px, 6px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #00FF80;
        sroke: #0000FF;
        transform: translate(-8.5px, -6px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #00FF80;
        sroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink7 {
      0% {
        fill: #FF0080;
        sroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(7.5px, 5px);
        opacity: .75;
      }
      50% {
        fill: #FF0080;
        sroke: #0000FF;
        transform: translate(-7.5px, -5px);
        opacity: .9;
      }
      100% {
        fill: #FF0080;
        sroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink8 {
      0% {
        fill: #FFFF00;
        sroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(6.5px, 4px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #FFFF00;
        sroke: #0000FF;
        transform: translate(-6.5px, -4px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #FFFF00;
        sroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink9 {
      0% {
        fill: #0000FF;
        sroke: #FFFFFF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        sroke: #0000FF;
        transform: translate(5.5px, 3px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #0000FF;
        sroke: #FFFFFF;
        transform: translate(-5.5px, -3px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #0000FF;
        sroke: #FFFFFF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink10 {
      0% {
        fill: #00FF80;
        stroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        stroke: #0000FF;
        transform: translate(4.5px, 2px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #00FF80;
        stroke: #0000FF;
        transform: translate(-4.5px, -1.5px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #00FF80;
        stroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
    @keyframes helloblink11 {
      0% {
        fill: #FF0080;
        stroke: #0000FF;
        opacity: 1;
        transform: translate(0, 0) rotate(0);
      }
      25% {
        fill: #FFFFFF;
        stroke: #0000FF;
        transform: translate(3.5px, 1px) rotate(2.5deg);
        opacity: .75;
      }
      50% {
        fill: #FF0080;
        stroke: #0000FF;
        transform: translate(-3.5px, -1px) rotate(-5deg);
        opacity: .9;
      }
      100% {
        fill: #FF0080;
        stroke: #0000FF;
        transform: translate(0, 0) rotate(0);
        opacity: 1;
      }
    }
</style>
