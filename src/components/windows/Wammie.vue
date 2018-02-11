<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.wammie.openApp}">
<transition-group name="fade" tag="div" class="windows">
<div v-if="appData.applications.wammie.openApp" v-bind:name="appData.applications.wammie.text" v-bind:open="appData.applications.wammie.openApp" v-bind:key="3" id="wammie" class="box-md app" @mousedown="high" v-bind:style="{ left: x + 'px', top: y + 'px', height: height + 'px', width: width + 'px', 'z-index': z }">
<div class="big-rap">
<div class="box-header" @mousedown="startMove" @touchstart="startMove">
    <div class="title-box">
      <div class="subtitle fancy">
      <span><span class="two"><h2>{{appData.applications.wammie.text}}</h2></span></span>
      </div>
      <div class="button-section">
        <button v-touch:tap.self="explode" v-on:click.self="explode" class="opt red" type="button" name="expand"><svgicon name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-touch:tap.self="fullSize" v-on:click.self="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
      </div>
    </div>
  </div>
    <div class="wrappa-da-rappa">
        <div class="app-content" name="wammie">
          <transition name="fade" tag="div">
            <div class="start-screen" v-if="!gameRunning">
              <div class="gamelogobox">
                <p>williammannie.com presents:</p>
                <svgicon name="wammielogo" height="300" width="300" :original="true"></svgicon>
                <p v-if="score === 0">Might as well save the world...</p>
              </div>
              <div class="yourscore" v-if="score > 0">
                <p class="tally">Your Score: {{score}}</p>
                <div class="sharescore">
                  <p>Share your score with the hashtag #wammie for a chance to win!</p>
                  <a v-on:click="downloadscore" id="download">Download</a>
                   <canvas id='canvas' width='400' height='400'></canvas>
                </div>
              </div>
              <div class="button-wrapper">
                <div class="prebee">
                <button id="answerButton" v-on:click.prevent="start" @mousedown="buttonpress" @mouseup="buttonup" v-bind:class="{ active: isActive }"><span v-if="score === 0">Play</span><span v-if="score > 0">Restart</span></button>
                </div>
              </div>
            </div>
          </transition>
          <div class="gameControls">
            <div class="gametime"><p v-if="gameRunning">seconds: {{defaultTimerLength}}</p></div>
            <div class="gamescore"><p v-if="gameRunning">score: {{score}}</p></div>
          </div>
          <div class="main-grid main-cell" @mousedown="swing" @mouseup="release">
            <div id="grid">
              <table class="zombiegrid" v-bind:height="defaultGridHeight" v-bind:width="defaultGridWidth">
                <tr>
                  <td v-bind:class="[{active: zombie0}, 'zombie']" id="zombie0" v-on:click="wack(zombie0, $event, 'zombie0')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                  <td v-bind:class="[{active: zombie1}, 'zombie']" id="zombie1" v-on:click="wack(zombie1, $event, 'zombie1')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                  <td v-bind:class="[{active: zombie2}, 'zombie']" id="zombie2" v-on:click="wack(zombie2, $event, 'zombie2')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                </tr>
                <tr >
                  <td v-bind:class="[{active: zombie3}, 'zombie']" id="zombie3" v-on:click="wack(zombie3, $event, 'zombie3')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                  <td v-bind:class="[{active: zombie4}, 'zombie']" id="zombie4" v-on:click="wack(zombie4, $event, 'zombie4')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                  <td v-bind:class="[{active: zombie5}, 'zombie']" id="zombie5" v-on:click="wack(zombie5, $event, 'zombie5')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                </tr>
                <tr >
                  <td v-bind:class="[{active: zombie6}, 'zombie']" id="zombie6" v-on:click="wack(zombie6, $event, 'zombie6')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                  <td v-bind:class="[{active: zombie7}, 'zombie']" id="zombie7" v-on:click="wack(zombie7, $event, 'zombie7')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                  <td v-bind:class="[{active: zombie8}, 'zombie']" id="zombie8" v-on:click="wack(zombie8, $event, 'zombie8')">
                    <svgicon name="zombie" height="100" width="100" :original="true"></svgicon>
                  </td>
                </tr>
               </table>
            </div>
          </div>

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
      defaultTimerLength: 30,
      now: 0,
      defaultSimultaneousMoles: 2,
      defaultMoleVisibleTime: 2,
      defaultGridRows: 3,
      defaultGridColumns: 3,
      defaultGridWidth: 300,
      defaultGridHeight: 300,
      score: 0,
      gameRunning: false,
      x: 0,
      y: 0,
      height: 500,
      width: 500,
      z: 200,
      count: 0,
      zombie0: false,
      zombie1: false,
      zombie2: false,
      zombie3: false,
      zombie4: false,
      zombie5: false,
      zombie6: false,
      zombie7: false,
      zombie8: false
    }
  },
  updated () {
    if (this.count === 0) {
      this.startup()
      this.count = 1
    }
  },
  methods: {
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
    },
    downloadscore: function (event) {
      var $this = this
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      function doCanvas () {
        /* draw something */
        ctx.fillStyle = '#00000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'yellow'
        ctx.font = '60px Georgia'
        ctx.fillText('My Score: ' + $this.score, 10, canvas.height / 2 - 15)
        ctx.font = '26px sans-serif'
        ctx.fillText('www.williammannie.com', 15, canvas.height / 2 + 35)
      }
      doCanvas()
      event.target.href = document.getElementById('canvas').toDataURL()
      event.target.download = 'score.png'
    },
    start: function () {
      var $this = this
      $this.gameRunning = true
      $this.defaultTimerLength = 30
      $this.score = 0
      var myVar = setInterval(function () {
        myTimer()
      }, 1000)
      function myTimer () {
        if ($this.gameRunning === false) {
          clearInterval(myVar)
        }
        var zombies = [
          $this.zombi0,
          $this.zombie1,
          $this.zombie2,
          $this.zombie3,
          $this.zombie4,
          $this.zombie5,
          $this.zombie6,
          $this.zombie7,
          $this.zombie8
        ]
        var inactivezombies = []
        for (var i = 0, len = zombies.length; i < len; i++) {
          if (!zombies[i]) {
            var innerObj = {}
            innerObj[i] = zombies[i]
            inactivezombies.push(innerObj)
          }
        }
        var elem1
        var elem2
        var elemListLength = inactivezombies.length

        var ix = Math.floor(Math.random() * elemListLength)
        elem1 = Object.entries(inactivezombies[ix])['0']['0']
        if (elemListLength > 1) {
          var mix = inactivezombies[(ix + 1 + Math.floor(Math.random() * (elemListLength - 1))) % elemListLength]
          elem2 = Object.entries(mix)['0']['0']
        }
        var xx = 'zombie' + elem1
        var xxx = 'zombie' + elem2
        $this[xx] = true
        $this[xxx] = true

        setTimeout(function () {
          var animatedzombie1 = document.getElementById(xx).querySelector('.zombieman')
          var animatedzombie2 = document.getElementById(xxx).querySelector('.zombieman')
          animatedzombie1.classList.add('scream')
          animatedzombie2.classList.add('scream')
          setTimeout(function () {
            animatedzombie1.classList.remove('scream')
            animatedzombie1.classList.add('downzombie')
            animatedzombie2.classList.remove('scream')
            animatedzombie2.classList.add('downzombie')
            setTimeout(function () {
              animatedzombie1.classList.remove('downzombie')
              animatedzombie2.classList.remove('downzombie')
            }, 300)
          }, 500)
        }, 250)

        setTimeout(function () { $this[xx] = false }, 1500)
        setTimeout(function () { $this[xxx] = false }, 1500)

        $this.defaultTimerLength = $this.defaultTimerLength - 1
        if ($this.defaultTimerLength === 0) {
          $this.defaultTimerLength = 30
          clearInterval(myVar)
          $this.gameRunning = false
        }
        if ($this.gameRunning === false && $this.defaultTimerLength > 0) {
          $this.defaultTimerLength = 30
          clearInterval(myVar)
        }
      }
    },
    swing: function () {
      this.$el.querySelector('.main-grid').classList.add('swing')
    },
    release: function () {
      this.$el.querySelector('.main-grid').classList.remove('swing')
    },
    wack: function (item, event, zombie) {
      var $this = this
      if (item === true) {
        this.score = this.score + 1
        this.$el.querySelector('.main-grid').classList.add('land')
        var zombiewacked = document.getElementById(zombie).querySelector('.zombieman')
        zombiewacked.classList.remove('scream')
        zombiewacked.classList.add('wacked')
        $this.$el.querySelector('.app-content').classList.add('flash')
        setTimeout(function () {
          $this.$el.querySelector('.app-content').classList.remove('flash')
          $this.$el.querySelector('.main-grid').classList.remove('land')
        }, 100)
        setTimeout(function () {
          zombiewacked.classList.remove('wacked')
          this[zombie] = false
        }, 500)
      }
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.wammie.openApp = false
      this.gameRunning = false
      this.defaultTimerLength = 30
      this.score = 0
      this.count = 0
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
    },
    download: function () {
      window.location = '../../static/wmannieresume2017.doc'
    },
    buttonpress: function () {
      this.isActive = true
    },
    buttonup: function () {
      this.isActive = false
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
  .yourscore {
    width: 100%;
    text-align: center;
    height: auto;
    position: absolute;
    bottom: 100px;
  }
  #canvas {
    position: absolute;
    z-index: 0;
    visibility: hidden;
  }


  .gamelogobox p:first-child {
    color: #DEDEDE;
    text-align: center;
    margin-top: 15px;
    position: absolute;
    font-size: 10px;
    width: 100%;
  }
  .gamelogobox p:last-child {
    color: #00ff80;
    text-align: center;
    margin-top: -30px;
  }

  .tally {
    color: yellow;
    font-size: 30px;
  }

  .sharescore {
    color: white;
  }

  .zombie-hit {
    visibility: hidden;
    opacity: 0;
  }
  .zombie-scream {
    visibility: hidden;
    opacity: 0;
  }
  .gameControls {
    margin-top: 50px;
    color: white;
    width: 100%;
    height: 120px;
    background: url('/static/bg-zombie.svg');
    background-size: cover;
    // do a media query that switches from cont to cover
    background-repeat: repeat;
    position: absolute;
  }
  .start-screen {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.75);
    z-index: 10;
  }
  .zombiegrid {
    position: absolute;
    bottom: 0;
    left: calc(50% - 150px);
  }

  .gamelogobox {
    position: relative;
    top: 60px;
  }
  .gamelogobox svg {
    display: block;
    margin: 0 auto;
  }
  .zombieman.scream .zombie-first {
    visibility: hidden;
    opacity: 0;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    animation: zombiescream ease-in-out .15s backwards;
    -webkit-animation: zombiescream ease-in-out .15s backwards;
  }
  .zombieman.scream .zombie-scream  {
    visibility: visible;
    opacity: 1;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    animation: zombiescream ease-in-out .15s forwards;
    -webkit-animation: zombiescream ease-in-out .15s forwards;
  }

  .zombie-first {
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    transform: translateY(500px);
    -webkit-transform: translateY(500px);
  }

  .zombie.active .zombie-first {
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    animation: zombiemove ease-in-out .15s forwards;
    -webkit-animation: zombiemove ease-in-out .15s forwards;
  }
  .zombieman.wacked .zombie-first {
    visibility: hidden;
    opacity: 0 !important;
    display: none !important;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    transform: translateY(500px);
    -webkit-transform: translateY(500px);
    animation: vanish linear 0s forwards;
    -webkit-animation: vanish linear 0s forwards;
  }
  .zombieman.wacked .zombie-hit {
    visibility: visible;
    opacity: 1;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    animation: zombiewacked ease-in-out .25s forwards;
    -webkit-animation: zombiewacked ease-in-out .25s forwards;
  }


  @keyframes zombiemove {
    0% {
      transform: translateY(500px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes zombiemove {
    0% {
      -webkit-transform: translateY(500px);
    }
    100% {
      -webkit-transform: translateY(0px);
    }
  }

  visibility: hidden;
  opacity: 0;

  @keyframes zombiescream {
    to% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes zombiescream {
    to% {
      visibility: visible;
      opacity: 1;
      -webkit-transform: translateY(0px);
    }
  }

  @keyframes zombiewacked {
    to% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes zombiewacked {
    to% {
      visibility: visible;
      opacity: 1;
      -webkit-transform: translateY(0px);
    }
  }

  @keyframes  vanish {
    to% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes  vanish {
    to% {
      visibility: visible;
      opacity: 1;
      -webkit-transform: translateY(0px);
    }
  }

  .main-grid {
    height: 450px;
    width: 450px;
    left: calc(50% - 225px);
    bottom: 0;
    position: relative;
  }

  #wammie .main-grid {
    cursor: url('/static/hammer-default.svg') 32 32, auto;
    transition: all ease .5s;
    -webkit-transition: all ease .5s;
  }

  #wammie .main-grid.swing {
    cursor: url('/static/hammer-swing.svg') 32 32, auto;
  }

  #wammie .main-grid.land {
    cursor: url('/static/hammer-land.svg') 32 32, auto;
    transition: all ease .5s;
  }

  .app-content.flash {
    animation: flashHit linear .2s forwards;
    -webkit-animation: flashHit linear .2s forwards;
  }
  @keyframes flashHit {
    0% {
      background: white;
    }
    50% {
      background: black;
    }
    100% {
      background: white;
    }
  }

  #wammie .wrappa-da-rappa {
    background-color: #000000;
    background-image: linear-gradient(45deg, #3a3a3a 25%, transparent 25%, transparent 75%, #3a3a3a 75%, #3a3a3a),
              linear-gradient(45deg, #3a3a3a 25%, transparent 25%, transparent 75%, #3a3a3a 75%, #3a3a3a);
    background-size: 10px 10px;
    background-position:0px 0px, 5px 5px;
    height: 100%;
  }
</style>
