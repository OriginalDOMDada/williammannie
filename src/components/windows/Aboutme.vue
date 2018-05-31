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
          <p><span class="intro-heading">H</span>ello, My name is <a data-image="require('../../assets/gifs/keef.gif')" v-touch:tap="mannie" @mouseover='mannie' @mouseleave='before' href='#'>William Mannie</a>, I am a magical <a data-image="require('../../assets/gifs/unicorn.gif')" v-touch:tap="unicorn" @mouseover='unicorn' @mouseleave='before' href="#">unicorn</a> that likes to <a data-image="require('../../assets/gifs/create.gif')" v-touch:tap="create" @mouseover='create' @mouseleave='before' href="#">create</a> really <a data-image="require('../../assets/gifs/cool.gif')" v-touch:tap="cool" @mouseover='cool' @mouseleave='before' href="#">cool</a> ass <a data-image="require('../../assets/gifs/shit.gif')" v-touch:tap="shit" @mouseover='shit' @mouseleave='before' href="#">shit</a>. I currently <a ata-image="require('../../assets/gifs/blaze.gif')" v-touch:tap="blaze" @mouseover='blaze' @mouseleave='before' href="#">blaze</a> the streets of <a data-image="require('../../assets/gifs/dc.gif')" v-touch:tap="dc" @mouseover='dc' @mouseleave='before' href="#">Washinton, D.C.</a>, where by day I am <a data-image="require('../../assets/gifs/webdev.gif')" v-touch:tap="webdev" @mouseover='webdev' @mouseleave='before' href="#">web developer</a> at Adfero. To maintain my <a data-image="require('../../assets/gifs/survival.gif')" v-touch:tap="survival"  @mouseover='survival' @mouseleave='before' href="#">survial</a> i eat... <a data-image="require('../../assets/gifs/alot.gif')" v-touch:tap="alot" @mouseover='alot' @mouseleave='before' href="#">a lot</a>. But in my spare <a data-image="require('../../assets/gifs/time.gif')" v-touch:tap="time" @mouseover='time' @mouseleave='before' href="#">time</a>, i enjoy riding my <a data-image="require('../../assets/gifs/blue.gif')" v-touch:tap="bike" @mouseover='bike' @mouseleave='before' href="#">bike</a> and <a data-image="require('../../assets/gifs/hunting.gif')" v-touch:tap="hunting" @mouseover='hunting' @mouseleave='before' href="#">hunting</a> the <a data-image="require('../../assets/gifs/internet.gif')" v-touch:tap="internet" @mouseover='internet' @mouseleave='before' href="#">internet</a> for <a data-image="require('../../assets/gifs/awesomeness.gif')" v-touch:tap="awesomeness" @mouseover='awesomeness' @mouseleave='before' href="#">awesomeness</a>. My areas of <a data-image="require('../../assets/gifs/expert.gif')" v-touch:tap="expert" @mouseover='expert' @mouseleave='before' href="#">expertiese</a> lie within Front-End Development, User Experience <a data-image="require('../../assets/gifs/design.gif')" v-touch:tap="design" @mouseover='design' @mouseleave='before' href="#">Design</a>, and <a data-image="require('../../assets/gifs/draw.gif')" v-touch:tap="draw" @mouseover='draw' @mouseleave='before' href="#">Illustrating</a>. Check out my <a data-image="require('../../assets/gifs/domain.gif')" v-touch:tap="domain" @mouseover='domain' @mouseleave='before' href='#'>domain</a> and see what I've been up to <a data-image="require('../../assets/gifs/lately.gif')" v-touch:tap="lately" @mouseover='lately' @mouseleave='before' href="#">lately</a>.</p>
        </div>
      </div>
  </div>
  <!-- <div class="resize top-left" @touchstart.prevent='resizetopleft' @mousedown.prevent='resizetopleft'></div>
  <div class="resize top-right" @touchstart.prevent='resizetopright' @mousedown.prevent='resizetopright'></div>
  <div class="resize bottom-left" @mousedown='resizable-bottom-left'></div> -->
  <div class="resize bottom-right" @touchstart.prevent='resizebottomright' @mousedown.prevent='resizebottomright'></div>
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
      this.height = window.innerHeight - 55
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
    resizebottomright: function (event) {
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
          $this.width = Math.abs($this.x - point.x)
          var height = Math.abs($this.y - point.y) - 55
          $this.height = height
          // $this.y = point.y - Math.abs(differenceY)
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
      document.querySelector('.panel').classList.add('unicorn')
      document.getElementById('oghello').classList.add('unicorn')
    },
    create: function () {
      document.querySelector('.panel').classList.add('create')
      document.getElementById('oghello').classList.add('create')
    },
    cool: function () {
      document.querySelector('.panel').classList.add('cool')
      document.getElementById('oghello').classList.add('cool')
    },
    shit: function () {
      document.querySelector('.panel').classList.add('shit')
      document.getElementById('oghello').classList.add('shit')
    },
    blaze: function () {
      document.querySelector('.panel').classList.add('blaze')
      document.getElementById('oghello').classList.add('blaze')
    },
    dc: function () {
      document.querySelector('.panel').classList.add('dc')
      document.getElementById('oghello').classList.add('dc')
    },
    webdev: function () {
      document.querySelector('.panel').classList.add('webdev')
      document.getElementById('oghello').classList.add('webdev')
    },
    bike: function () {
      document.querySelector('.panel').classList.add('bike')
      document.getElementById('oghello').classList.add('bike')
    },
    survival: function () {
      document.querySelector('.panel').classList.add('survival')
      document.getElementById('oghello').classList.add('survival')
    },
    alot: function () {
      document.querySelector('.panel').classList.add('alot')
      document.getElementById('oghello').classList.add('alot')
    },
    hunting: function () {
      document.querySelector('.panel').classList.add('hunting')
      document.getElementById('oghello').classList.add('hunting')
    },
    internet: function () {
      document.querySelector('.panel').classList.add('internet')
      document.getElementById('oghello').classList.add('internet')
    },
    awesomeness: function () {
      document.querySelector('.panel').classList.add('awesomeness')
      document.getElementById('oghello').classList.add('awesomeness')
    },
    time: function () {
      document.querySelector('.panel').classList.add('time')
      document.getElementById('oghello').classList.add('time')
    },
    lately: function () {
      document.querySelector('.panel').classList.add('lately')
      document.getElementById('oghello').classList.add('lately')
    },
    expert: function () {
      document.querySelector('.panel').classList.add('expert')
      document.getElementById('oghello').classList.add('expert')
    },
    design: function () {
      document.querySelector('.panel').classList.add('design')
      document.getElementById('oghello').classList.add('design')
    },
    draw: function () {
      document.querySelector('.panel').classList.add('draw')
      document.getElementById('oghello').classList.add('draw')
    },
    domain: function () {
      document.querySelector('.panel').classList.add('domain')
      document.getElementById('oghello').classList.add('domain')
    },
    before: function () {
      document.getElementById('og').className = 'panel'
      document.getElementById('oghello').className = 'hello-wrap'
    },
    explode: function () {
      document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
      document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
      document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
      document.getElementsByClassName('panel')['0'].className = 'panel'
      this.appData.applications.aboutme.openApp = false
      this.count = 0
      this.height = 400
      this.width = 400
      setTimeout(function () {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
        document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
        document.getElementById('oghello')['0'].className = ''
      }, 1000)
      this.height = 400
      this.width = 400
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
  .resize {
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: white;
    border: 2px solid black;
    z-index: -1;
  }
  .resize:hover {
    background: #0000ff; /* Old browsers */
    background: -moz-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ff0080),color-stop(50%,#0000ff), color-stop(100%,#ff0080)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* IE10+ */
    background: linear-gradient(to right,  #ff0080 0%,#0000ff 50%,#ff0080 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0080', endColorstr='#ff0080',GradientType=1 ); /* IE6-9 */
    background-size: 100px 100px;
    -webkit-animation: slide 15s linear infinite;
    -moz-animation: slide 15s linear infinite;
    -o-animation: slide 15s linear infinite;
  }
  .top-left {
    top: -10px;
    left: -10px;
  }
  .top-right {
    top: -10px;
    right: -10px;
  }
  .bottom-left {
    bottom: -10px;
    left: -10px;
  }
  .bottom-right {
    bottom: -10px;
    right: -10px;
  }
  .panel.mannie {
    animation: inherit;
    background-image: url('../../assets/gifs/keef.gif');
    background-size: 100% 100%;
    background-color: rgba(255,255,255,.5);
  }
  .panel.unicorn {
    animation: inherit;
    background-image: url('../../assets/gifs/unicorn.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.create {
    animation: inherit;
    background-image: url('../../assets/gifs/lego.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.cool {
    animation: inherit;
    background-image: url('../../assets/gifs/cool.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.shit {
    animation: inherit;
    background-image: url('../../assets/gifs/shit.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.blaze {
    animation: inherit;
    background-image: url('../../assets/gifs/blaze.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.dc {
    animation: inherit;
    background-image: url('../../assets/gifs/dc.gif');
    background-size: 100% 100%;
    background-color: rgba(255,255,255,.5);
  }
  .panel.webdev {
    animation: inherit;
    background-image: url('../../assets/gifs/webdev.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.bike {
    animation: inherit;
    background-image: url('../../assets/gifs/bike.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.survival {
    animation: inherit;
    background-image: url('../../assets/gifs/survival.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.alot {
    animation: inherit;
    background-image: url('../../assets/gifs/alot.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.hunting {
    animation: inherit;
    background-image: url('../../assets/gifs/hunting.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.internet {
    animation: inherit;
    background-image: url('../../assets/gifs/internet.gif');
    background-size: 50% auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.awesomeness {
    animation: inherit;
    background-image: url('../../assets/gifs/coolio.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.time {
    animation: inherit;
    background-image: url('../../assets/gifs/time.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.lately {
    animation: inherit;
    background-image: url('../../assets/gifs/lately.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.expert {
    animation: inherit;
    background-image: url('../../assets/gifs/cut-it-out.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.design {
    animation: inherit;
    background-image: url('../../assets/gifs/design.gif');
    background-size: cover;
    background-color: rgba(255,255,255,.5);
  }
  .panel.draw {
    animation: inherit;
    background-image: url('../../assets/gifs/draw.gif');
    background-size: 50% auto;
    background-color: rgba(255,255,255,.5);
  }
  .panel.domain {
    animation: inherit;
    background-image: url('../../assets/gifs/looking.gif');
    background-size: auto;
    background-color: rgba(255,255,255,.5);
  }
  .mannie > .hello {
    opacity: 0 !important;
  }
  @media only screen and (max-width: 700px) {
    .panel.mannie, .panel.create, .panel.cool, .panel.expert, .panel.hunting, .panel.bike, .panel.alot, .panel.survival {
      background-size: 75% auto;
    }
    .panel.webdev, .panel.domain,, .panel.lately  {
      background-size: 50% auto;
    }
    .panel.shit, .panel.dc {
      background-size: 100% auto;
    }
  }
</style>
