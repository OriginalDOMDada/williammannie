<template>
<div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.aboutme.openApp}">
<transition-group name="fade" tag="div" class="windows">

<div v-if="appData.applications.aboutme.openApp" v-bind:name="appData.applications.aboutme.text" v-bind:open="appData.applications.aboutme.openApp" v-bind:key="2" id="aboutme" class="box-md app" @mousedown="high" v-bind:style="{ left: x + 'px', top: y + 'px', height: height + 'px', width: width + 'px', 'z-index': z }">
  <div class="big-rap">
    <div class="box-header" @mousedown.prevent="startMove" @touchstart.prevent="startMove">
      <div class="title-box">
        <div class="subtitle fancy">
        <span><span class="two"><h2>{{appData.applications.aboutme.text}}</h2></span></span>
        </div>
        <div class="button-section">
          <button v-touch:tap.prevent="explode" v-on:click.prevent="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.aboutme.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
          <button class="opt green" type="button" name="fullSize" v-touch:tap.preven="fullSize" v-on:click.prevent="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
        </div>
      </div>
    </div>
    <div class="wrappa-da-rappa">
        <div class="app-content" name="aboutme">
          <p><span class="intro-heading">H</span>ello, My name is <a v-touch:tap="mannie" @mouseover='mannie' @mouseleave='before' href='#'>William Mannie</a>, I am a magical <a v-touch:tap="unicorn" @mouseover='unicorn' @mouseleave='before' href="#">unicorn</a> that likes to <a v-touch:tap="create" @mouseover='create' @mouseleave='before' href="#">create</a> really <a v-touch:tap="cool" @mouseover='cool' @mouseleave='before' href="#">cool</a> ass <a v-touch:tap="shit" @mouseover='shit' @mouseleave='before' href="#">shit</a>. I currently <a v-touch:tap="blaze" @mouseover='blaze' @mouseleave='before' href="#">blaze</a> the streets of <a v-touch:tap="dc" @mouseover='dc' @mouseleave='before' href="#">Washinton, D.C.</a>, where by day I am <a v-touch:tap="webdev" @mouseover='webdev' @mouseleave='before' href="#">web developer</a> at Adfro. To maintain my <a v-touch:tap="survival"  @mouseover='survival' @mouseleave='before' href="#">survial</a> i eat... <a v-touch:tap="alot" @mouseover='alot' @mouseleave='before' href="#">a lot</a>. But in my spare <a v-touch:tap="time" @mouseover='time' @mouseleave='before' href="#">time</a>, i enjoy riding my <a v-touch:tap="bike" @mouseover='bike' @mouseleave='before' href="#">bike</a> and <a  v-touch:tap="hunting" @mouseover='hunting' @mouseleave='before' href="#">hunting</a> the <a v-touch:tap="internet" @mouseover='internet' @mouseleave='before' href="#">internet</a> for <a v-touch:tap="awesomeness" @mouseover='awesomeness' @mouseleave='before' href="#">awesomeness</a>. My areas of <a v-touch:tap="expert" @mouseover='expert' @mouseleave='before' href="#">expertiese</a> lie within Front-End Development, User Experience <a v-touch:tap="design" @mouseover='design' @mouseleave='before' href="#">Design</a>, and <a v-touch:tap="draw" @mouseover='draw' @mouseleave='before' href="#">Illustrating</a>. Check out my <a v-touch:tap="domain" @mouseover='domain' @mouseleave='before' href='#'>domain</a> and see what I've been up to <a v-touch:tap="lately" @mouseover='lately' @mouseleave='before' href="#">lately</a>.</p>
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
      const updateFn = () => {
        if (moving) {
          requestAnimationFrame(updateFn)
          $this.x = point.x - 200
          $this.y = point.y - 75
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
    mannie: function () {
      document.querySelector('.panel').classList.add('mannie')
      document.getElementById('oghello').classList.add('mannie')
    },
    unicorn: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/unicorn.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    create: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/lego.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    cool: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/cool.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    shit: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/shit.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    blaze: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/blaze.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    dc: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/dc.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    webdev: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/webdev.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    bike: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/bike.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    survival: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/survival.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    alot: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/alot.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    hunting: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/hunting.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    internet: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/internet.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '50% auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    awesomeness: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/coolio.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    time: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/time.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    lately: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/lately.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    expert: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/cut-it-out.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    design: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/design.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'cover'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    draw: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/draw.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '50% auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    domain: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/looking.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = 'auto'
      this.$el.getElementsByClassName('wrappa-da-rappa')['0'].style.backgroundColor = 'rgba(255,255,255,.5)'
    },
    before: function () {
      document.getElementById('og').className = 'panel'
      document.getElementById('oghello').className = 'hello-wrap'
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      this.appData.applications.aboutme.openApp = false
      this.count = 0
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
      }, 1000)
      this.height = 400
      this.width = 400
    }
  }
}
function getMousePos (mouseEvent, point) {
  console.log(point)
  point.x = mouseEvent.clientX
  point.y = mouseEvent.clientY
}
function getTouchPos (touchEvent, point) {
  point.x = event.touches[0].clientX
  point.y = event.touches[0].clientY
}
</script>

<style>
  .panel.mannie {
    animation: inherit;
    background-image: url('../../assets/gifs/keef.gif');
    background-size: 100% 100%;
    background-color: rgba(255,255,255,.5);
  }
  .mannie > .hello {
    opacity: 0 !important;
  }
</style>
