<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.resume.openApp}">
<transition-group name="fade" tag="div" class="windows">
<div v-if="appData.applications.resume.openApp" v-bind:name="appData.applications.resume.text" v-bind:open="appData.applications.resume.openApp" v-bind:key="4" id="resume" class="box-md app" @mousedown="high" v-bind:style="{ left: x + 'px', top: y + 'px', height: height + 'px', width: width + 'px', 'z-index': z }">
<div class="big-rap">
<div class="box-header" @mousedown.prevent="startMove" @touchstart.prevent="startMove">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><span class="two"><h2>{{appData.applications.resume.text}}</h2></span></span>
      </div>
      <div class="button-section">
        <button v-touch:tap="explode" v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.resume.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-touch:tap="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
      </div>
    </div>
    <div class="wrappa-da-rappa">
        <div class="app-content viewport" name="resume">
          <div class="paper">
            <div class="paper-content">
                 <textarea autofocus>William E. Mannie II&#10;Web Developer&#10;willmannie@gmail.com&#10;Phone: (312)-206-636&#10;&#10;feel free to change the text and make up stuff about me or download my resume below;)</textarea>
             </div>
          </div>
        </div>
    </div>
  </div>
  <div class="button-wrapper">
    <div class="prebee">
    <button id="answerButton" v-on:click.prevent="download" @mousedown="buttonpress" @mouseup="buttonup" v-bind:class="{ active: isActive }">Download</button>
    </div>
  </div>
  </div>
</div>
</transition-group>
</div>
</template>

<script>
import appData from '../../appData.json'
import '../../compiled-icons'

export default {
  data: function () {
    return {
      appData,
      dragState: false,
      isActive: false,
      parent: false,
      x: 0,
      y: 0,
      height: 400,
      width: 400,
      z: 200,
      count: 0
    }
  },
  updated () {
    if (this.count === 0) {
      this.startup()
      this.count = 1
    }
  },
  methods: {
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.resume.openApp = false
      this.count = 0
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
    },
    startup: function () {
      var initalWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      var initalX = (initalWidth / 2) - 200
      var initalY = 50
      var activeApps = document.getElementsByClassName('app')
      var appArray = []
      for (var i = 0; i < activeApps.length; i++) {
        var eachActive = activeApps[i]
        appArray.push(eachActive)
      }
      initalY = 50 + (50 * appArray.length)
      initalX = initalX + (50 * appArray.length)
      this.x = initalX
      this.y = initalY
    },
    fullSize: function () {
      this.height = window.innerHeight
      this.width = window.innerWidth
      this.x = 0
      this.y = 0
    },
    startMove: function (event) {
      var $this = this
      const touch = event.type === 'touchstart'
      if (!touch && event.button !== 0) return
      const events = touch ? {move: 'touchmove', stop: 'touchend'} : {move: 'mousemove', stop: 'mouseup'}
      const point = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
      }
      const getPos = touch ? getTouchPos : getMousePos
      var moving = true
      var differenceX = $this.x - point.x
      var differenceY = $this.y - point.y
      const updateFn = () => {
        if (moving) {
          requestAnimationFrame(updateFn)
          $this.x = point.x - Math.abs(differenceX)
          $this.y = point.y - Math.abs(differenceY)
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
    buttonpress: function () {
      this.isActive = true
    },
    buttonup: function () {
      this.isActive = false
    },
    dragOn: function () {
      this.dragState = true
    },
    dragOff: function () {
      this.dragState = false
    },
    parentOn: function () {
      this.parent = true
    },
    parentOff: function () {
      this.parent = false
    },
    high: function () {
      var activeApps = document.getElementsByClassName('app')
      var initalHi = 200
      var zIndexs = []
      for (var i = 0; i < activeApps.length; i++) {
        var zindex = parseInt(activeApps[i].style.zIndex)
        zIndexs.push(zindex)
      }
      var largest = Math.max.apply(Math, zIndexs)
      if (initalHi <= largest) {
        this.z = largest + 1
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
</script>

<style>

  .windows #resume {
    background: rgba(255,255,255,.6);
  }

  .rescontext {
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    color: #ff0080 !important;
    top: 100px;
    font-family: 'Handlee', cursive;
  }
  .paper {
      position: relative;
      width: 100%;
      min-width: 400px;
      height: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 0, .8);
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,.3);
      overflow: hidden;
  }
  .paper:before {
      content: '';
      position: absolute;
      top: 0; bottom: 0; left: 0;
      width: 60px;
      background-size: 30px 30px;
      border-right: 3px solid #ff0080;
      box-sizing: border-box;
      background-position: 10px;
  }

  .paper-content {
      position: absolute;
      top: 30px; right: 0; bottom: 30px; left: 60px;
      background: linear-gradient(transparent, transparent 28px, blue 28px);
      background-size: 30px 30px;
  }
  .paper-content textarea {
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      line-height: 30px;
      padding: 0 10px;
      border: 0;
      outline: 0;
      background: transparent;
      color: mediumblue;
      font-family: 'Handlee', cursive;
      font-weight: bold;
      font-size: 18px;
      box-sizing: border-box;
      z-index: 1;
  }

  .button-wrapper {
    position: absolute;
    width: 100%;
    bottom: 5%;
  }
  .button-wrapper p {
    color: #FFFF00;
    font-size: 26px;
  }
  .prebee {
    position: relative;
    width: 100px;
    height: 50px;
    z-index: 100;
    margin: 0 auto;
  }
  .prebee:before {
    content: "";
    width: 92px;
    height: 42px;
    background-color: #0000ff;
    border: 4px solid #0000ff;
    position: absolute;
    z-index: -99;
    bottom: -4px;
    left: 4px;
  }
  #answerButton {
    width: 100px;
    height: 50px;
    display: block;
    background-color: white;
    border: 4px solid #0000ff;
    font-size: 16px;
    font-family: Arial;
    font-weight: bold;
    color: #0000ff;
    outline: none;
    position: absolute;
    bottom: 4px;
    left: -4px;
  }
  #answerButton:hover {
    background-color: #0000ff;
    border: 4px solid white;
    color: white;
    bottom: 0px;
    left: 0px;
  }
  #answerButton.active:hover {
    background-color: #00ff80;
    border: 4px solid #0000ff;
    color: #0000ff;
    bottom: -4px;
    left: 4px;
  }
</style>
