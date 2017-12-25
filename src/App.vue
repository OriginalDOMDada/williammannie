<template>
    <div id="app">
      <router-view name="loadingscreen"></router-view>
      <router-view name="header"></router-view>
      <div class="panel">
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
        </div>
        <img class="computer-bounce" src="./assets/svg/dummy.svg">
        <div class="hello-wrap" data-tilt data-tilt-reset="false" data-tilt-reverse="true">
          <svgicon class="hello" name="Untitled" height="400" width="400" :original="true"></svgicon>
        </div>
      </div>
    </div>
</template>

<script>
import VanillaTilt from 'vanilla-tilt'
export default {
  name: 'app',
  mounted () {
    const element = document.querySelector('.hello-wrap')
    VanillaTilt.init(element, {
      max: 40,
      speed: 100,
      reverse: true,
      perspective: 900,
      reset: false
    })
    function myScript (event) {
    /* eslint-disable */
      var windowMafW = (((window.innerWidth / 2) - event.clientX) / (window.innerWidth / 2)) * 6
      var windowMafH = (((window.innerHeight / 2) - event.clientY) / (window.innerHeight / 2)) * 1.25
      var shift = document.getElementById('shifter').getElementsByTagName('g')
      var shifter = []
      for (let i = 0; i < shift.length; i++) {
        shifter.push(shift[i])
      }
      shifter.reverse()
      for (let i = 0; i < shifter.length; i++) {
        shifter[i].style.transform = 'translate3d(' + windowMafW * i + 'px, ' + windowMafH * i + 'px, 20px)'
      }

    }
    document.addEventListener('mousemove', myScript)
  }
}
</script>
<style type="css" scope>
  @import './main.css';
    #shifter g {
      transition:  transform .1s linear;
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
</style>
