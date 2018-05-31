<template>
  <div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.music.openApp}">
  <transition-group name="fade" tag="div" class="windows">
  <div v-if="appData.applications.music.openApp" v-bind:name="appData.applications.music.text" v-bind:open="appData.applications.music.openApp" v-bind:key="1" id="music" class="box-md app" @mousedown="high" v-bind:style="{ left: x + 'px', top: y + 'px', height: height + 'px', width: width + 'px', 'z-index': z }">
  <div class="big-rap">
  <div class="box-header" @mousedown.prevent="startMove" @touchstart.prevent="startMove">
      <div class="title-box">
        <div class="subtitle fancy">
        <span><span class="two"><h2>{{appData.applications.music.text}}</h2></span></span>
        </div>
        <div class="button-section">
          <button v-touch:tap="explode" v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="appData.applications.music.openApp = false" name="close" height="6" width="6" :original="true"></svgicon></button>
          <button class="opt green" type="button" name="fullSize" v-touch:tap="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
        </div>
      </div>
    </div>
      <div class="wrappa-da-rappa" v-bind:class="{'disco': isPlaying}">
          <div class="app-content" name="music">
            <div class="needle-wrap">
              <img v-bind:src="needle" class="needle"></img>
            </div>
            <div class="speakers">
              <img v-bind:src="speaker" class="speaker-left"></img>
              <img v-bind:src="speaker" class="speaker-right"></img>
            </div>
            <div id="sound-image-wrap">
              <p>{{currentTrackId}}</p>
              <div class="soundImage"></div>
            </div>
            <div class="tracklist">
              <ol class="datracklist">
                <li v-for="(track, index) in trackList" v-on:click="seekTrack" v-bind:data-track="index" v-bind:class="{'activeTrack': index === 0}" :key="track.id" v-bind:id="track.id">{{index + 1}}. {{track.title}} <a target="_blank" v-bind:src="track.permalink_url" class="sc-link" v-on:click="linktosong"></a></li>
              </ol>
            </div>
            <transition name="fade" tag="div">
              <div id="loader" class="ui inverted dimmer" v-if="loading">
                <img v-bind:src="loadicon" height="100" width="100" id="loadspin">
                <div class="glow-rap">
                  <span class="glow">Loading...</span>
                </div>
              </div>
            </transition>
            <div class="ui container">
              <div class="ui segment">
                <iframe id="soundcloud" width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/376667462&sharing=false&auto_play=false&font=Georgia&show_comments=false&theme_color=0000ff&color=0000ff&show_playcount=false&show_bpm=false"></iframe>
                <div id="controls">
                  <div class="ui icon buttons">
                    <button id="back-button" class="ui button" v-on:click="prevTrack">
                    <svgicon name="prev" height="20" width="20" :original="true"></svgicon>
                    </button>
                    <button id="play-button" class="ui button" v-on:click="toggleplay">
                      <svgicon v-if="isPlaying === false" name="play" height="20" width="20" :original="true"></svgicon>
                      <svgicon v-if="isPlaying === true" name="pause" height="20" width="20" :original="true"></svgicon>
                    </button>
                    <button id="forward-button" class="ui button" v-on:click="nextTrack">
                    <svgicon name="next" height="20" width="20" :original="true"></svgicon>
                    </button>
                    <button id="mute-button" class="ui button" v-on:click="muteTrack">
                      <svgicon name="mute" height="20" width="20" :original="true"></svgicon>
                    </button>
                  </div>
                  <div class="wmsound">
                    <a href="https://www.soundcloud.com" target="_blank">
                      <svgicon height="60" width="60" name="wmsound" :original="true"></svgicon>
                      <img v-if="isPlaying === true" height="50" width="40" style="position: absolute; top: 0; left: 40px;" v-bind:src="justdance"></img>
                    </a>
                  </div>
                  <div class="powerdbysc">
                    <a href="https://www.soundcloud.com" target="_blank">
                      <svgicon height="50" width="50" name="soundcloud">
                      </svgicon>
                      <span>Powered by<br>SoundCloud</span>
                    </a>
                  </div>
                </div>
                <div class="progress-rap">
                  <div id="progress-container" class="ui orange progress" v-on:click="changetime" v-touch:tap="changetime">
                    <div id="progress-bar" class="bar"></div>
                  </div>
                </div>
              </div>
              <div class="currentsong">
                <div v-for="(track, index) in trackList" v-if="track.title === currentTitle" :key="track.id" data-speed="0.25" data-pausable="bool">
                  <span>
                    <span class='info-title'>{{currentTitle}}</span>
                    <span class='info-artist'>{{currentName}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
      <div class="resize bottom-right" @touchstart.prevent='resizebottomright' @mousedown.prevent='resizebottomright'></div>
  </div>
  </transition-group>
  </div>
</template>

<script>
  import appData from '../../appData.json'
  import '../../compiled-icons'
  import SoundcloudWidget from 'soundcloud-widget'

  export default {
    name: 'Music',
    data () {
      return {
        appData,
        dragState: false,
        parent: false,
        x: 0,
        y: 0,
        height: 400,
        width: 400,
        z: 200,
        count: 0,
        isPlaying: false,
        isMute: false,
        seek: false,
        trackList: [],
        songTitle: '',
        songArtist: '',
        currentTrackId: '',
        currentTitle: '',
        currentName: '',
        widget: '',
        SoundCloud: '',
        loadicon: require('../../assets/svg/loader.svg'),
        loading: true,
        justdance: require('../../assets/gifs/justdance.gif'),
        speaker: require('../../assets/svg/speaker.svg'),
        needle: require('../../assets/svg/needle.svg')
      }
    },
    updated () {
      if (this.count === 0) {
        this.startup()
        this.count = 1
      }
      var $this = this
      $this.widget = new SoundcloudWidget('soundcloud')
      var soundImagediv = document.querySelector('.soundImage')
      var progressContainer = document.getElementById('progress-container')
      var progressBar = document.getElementById('progress-bar')
      $this.widget.on(SoundcloudWidget.events.PLAY, function () {
        soundImagediv.classList.add('soundStart')
        soundImagediv.classList.remove('paused')
        $this.isPlaying = true
      })

      $this.widget.on(SoundcloudWidget.events.PAUSE, function () {
        soundImagediv.classList.add('paused')
        $this.isPlaying = false
      })

      $this.widget.on(SoundcloudWidget.events.PLAY_PROGRESS, function (progress) {
        var maxWidth = progressContainer.offsetWidth
        var position = progress.relativePosition
        var newWidth = Math.floor(maxWidth * position)

        progressBar.style.width = newWidth + 'px'
      })

      $this.widget.getVolume().then(function (volume) {
        if ($this.isMute === true) {
          $this.widget.setVolume(0)
        } else {
          $this.widget.setVolume(100)
        }
      })
      $this.widget.on(SoundcloudWidget.events.READY, function () {
        $this.widget.getSounds().then(function (soundList) {
          var thisList = soundList
          var nullFound = false
          for (var i = 0; i < thisList.length; i++) {
            if (thisList[i].title == null) {
              nullFound = true
              break
            }
          }
          if (!nullFound) {
            $this.trackList = thisList
            $this.loading = false
          }
        })
        $this.widget.getCurrentSound().then(function (soundObject) {
          if (soundObject.id && document.querySelector('.activeTrack')) {
            document.querySelector('.activeTrack').classList.remove('activeTrack')
            document.getElementById(soundObject.id).classList.add('activeTrack')
          }
          $this.currentTitle = soundObject.title
          $this.currentName = soundObject.user.username
          document.querySelector('.soundImage').style.backgroundImage = 'url(' + soundObject.artwork_url + ')'
        })
      })
      if (this.isPlaying) {
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/disco.gif')})`
        document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
        document.getElementsByClassName('hello')['0'].style.opacity = '0'
      }
    },
    methods: {
      toggleplay: function () {
        this.isPlaying = !this.isPlaying
        this.widget.toggle()
        if (this.isPlaying === false) {
          document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
          document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
          document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
          document.getElementsByClassName('hello')['0'].style.opacity = '1'
        }
      },
      muteTrack: function () {
        this.isMute = !this.isMute
      },
      changetime: function (event) {
        var el = this.$el.querySelector('.progress')
        var width = el.offsetWidth
        var rect = el.getBoundingClientRect()
        var position = event.clientX - rect.left + document.body.scrollLeft
        var percent = position / width
        var $this = this
        this.widget.getDuration().then(function (duration) {
          var newPosition = Math.floor(duration * percent)
          $this.widget.seekTo(newPosition)
        })
      },
      linktosong: function (event) {
        var url = event.target.attributes.src.value
        var win = window.open(url, '_blank')
        win.focus()
      },
      seekTrack: function (event) {
        var activelistitem = document.querySelector('.activeTrack')
        this.widget.skip(event.target.dataset.track)
        this.widget.seekTo(0)
        activelistitem.classList.remove('activeTrack')
        event.target.classList.add('activeTrack')
      },
      nextTrack: function (event) {
        this.widget.seekTo(0)
        this.widget.next()
        var upNext = document.querySelector('.activeTrack').nextSibling
        if (upNext === null) {
          this.widget.skip(0)
          this.widget.seekTo(0)
          this.widget.play()
        }
      },
      prevTrack: function () {
        this.widget.seekTo(0)
        this.widget.prev()
        var upPrev = document.querySelector('.activeTrack').previousSibling
        if (upPrev === null) {
          this.widget.skip(0)
          this.widget.seekTo(0)
          this.widget.pause()
        }
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
      },
      explode: function () {
        this.widget.skip(0)
        this.widget.pause()
        this.count = 0
        this.appData.applications.music.openApp = false
        this.height = 400
        this.width = 400
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
        document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
        document.getElementsByClassName('hello')['0'].style.opacity = '1'
        setTimeout(function () {
          document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
          document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
          document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
        }, 1000)
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
  #soundcloud {
    visibility: hidden;
    height: 0;
  }
  .needle-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .needle {
    position: relative;
    height: 100px;
    width: auto;
    display: block;
    margin: 0 auto;
    top: 0px;
    left: -45px;
    z-index: 3;
  }
  .speaker-left, .speaker-right {
    height: 100px;
    width: auto;
    position: absolute;
    z-index: 1;
  }

  .speaker-left {
    top: 60px;
    left: 3%;
  }

  .speaker-right {
    top: 60px;
    right: 3%;
  }

  .sc-font-light {
    font-family: Georgia !important;
  }
  .ui.progress .bar {
    min-width: 2px;
  }
  #controls {
    width: 100%;
    position: absolute;
    display: inline-block;
    height: 100%;
    bottom: 0;
    left: 0;
  }

  #loader {
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.8);
    background-size: 50vw 50vh;

    -webkit-animation: slide 15s linear infinite;
    -moz-animation: slide 15s linear infinite;
    -o-animation: slide 15s linear infinite;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 15;
    display: block;
  }

  #loader.fade-leave-to {
    height: 0;
    width: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    margin: 0 auto;
    transition: all .5s ease;
  }

  #loadspin {
    position: absolute;
    display: block;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    animation: spinloading 1.25s linear infinite;
    -webkit-animation: spinloading 1.25s linear infinite;
  }

  @keyframes spinloading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spinloading {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .ui.buttons:before {
    content: "";
    width: 200px;
    height: 50px;
    background-color: #0000ff;
    border: 2px solid #0000ff;
    position: absolute;
    z-index: -1;
    bottom: -10px;
    left: 5px;
  }
  .ui.buttons {
    position: absolute;
    bottom: 40px;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    border: 2px solid blue;
    z-index: 2;
  }
  .ui.button {
    height: 50px;
    width: 50px;
    margin: 0;
    padding: 0;
    float: left;
    border: 2px solid white;
    background-color: white;
    border-radius: 0;
    outline: none;
    transition: all linear .5s;
    -webkit-transition: all linear .5s;
  }
  .ui.button:first-child, .ui.button:nth-child(2), .ui.button:nth-child(3)  {
    border-right: 2px solid #0000ff;
  }
  .ui.button svg {
    fill: blue;
    pointer-events: none;
  }
  .ui.button:hover {
    background-color: blue;
    border-color: blue;
  }
  .ui.button:hover svg {
    fill: white;
  }
  .ui.segment {
    min-width: 400px;
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 100px;
  }

  .powerdbysc {
    height: 100px;
    width: 80px;
    position: absolute;
    right: 0px;
    top: 4px;
    font-size: 8px;
    text-align: center;
  }

  .powerdbysc a {
    text-decoration: none;
  }

  .powerdbysc  svg {
    margin: 0 auto;
    display: block;
  }

  .powerdbysc span {
    margin-top: -12px;
    display: block;
    font-family: Arial;
  }

  .wmsound {
    height: 100px;
    width: 100px;
    position: absolute;
    left: 10px;
    top: 7.5px;
  }


  /* Activity Bar */
    .ui.progress .bar {
      display: block;
      line-height: 1;
      position: relative;
      width: 0%;
      min-width: 2px;
      background: #888888;
      border-radius: 0;
      -webkit-transition: width 0.1s ease, background-color 0.1s ease;
      transition: width 0.1s ease, background-color 0.1s ease;
    }

    /* Percent Complete */

    .ui.progress .bar > .progress {
      white-space: nowrap;
      position: absolute;
      width: auto;
      font-size: 0.92857143em;
      top: 50%;
      right: 0.5em;
      left: auto;
      bottom: auto;
      color: rgba(255, 255, 255, 0.7);
      text-shadow: none;
      margin-top: -0.5em;
      font-weight: bold;
      text-align: left;
    }

    /* Label */

    .ui.progress > .label {
      position: absolute;
      width: 100%;
      font-size: 1em;
      top: 100%;
      right: auto;
      left: 0%;
      bottom: auto;
      color: rgba(0, 0, 0, 0.87);
      font-weight: bold;
      text-shadow: none;
      margin-top: 0.2em;
      text-align: center;
      -webkit-transition: color 0.4s ease;
      transition: color 0.4s ease;
    }


    .ui.indicating.progress[data-percent^="1"] .label,
    .ui.indicating.progress[data-percent^="2"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    .ui.indicating.progress[data-percent^="3"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    .ui.indicating.progress[data-percent^="4"] .label,
    .ui.indicating.progress[data-percent^="5"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    .ui.indicating.progress[data-percent^="6"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    .ui.indicating.progress[data-percent^="7"] .label,
    .ui.indicating.progress[data-percent^="8"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    .ui.indicating.progress[data-percent^="9"] .label,
    .ui.indicating.progress[data-percent^="100"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    .ui.active.progress .bar {
      position: relative;
      min-width: 2em;
    }

    .ui.active.progress .bar::after {
      content: '';
      opacity: 0;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: #FFFFFF;
      border-radius: 0.28571429rem;
      -webkit-animation: progress-active 2s ease infinite;
      animation: progress-active 2s ease infinite;
    }

    @-webkit-keyframes progress-active {
      0% {
        opacity: 0.3;
        width: 0;
      }

      100% {
        opacity: 0;
        width: 100%;
      }
    }

    @keyframes progress-active {
      0% {
        opacity: 0.3;
        width: 0;
      }

      100% {
        opacity: 0;
        width: 100%;
      }
    }

    /*--------------
        Attached
    ---------------*/

    /* bottom attached */

    .ui.progress.attached {
      background: transparent;
      position: relative;
      border: none;
      margin: 0em;
    }

    .ui.progress.attached,
    .ui.progress.attached .bar {
      display: block;
      height: 0.2rem;
      padding: 0px;
      overflow: hidden;
      border-radius: 0em 0em 0.28571429rem 0.28571429rem;
    }

    .ui.progress.attached .bar {
      border-radius: 0em;
    }

    /* top attached */

    .ui.progress.top.attached,
    .ui.progress.top.attached .bar {
      top: 0px;
      border-radius:0;
    }

    .ui.progress.top.attached .bar {
      border-radius: 0em;
    }

    /* Coupling */

    .ui.segment > .ui.attached.progress,
    .ui.card > .ui.attached.progress {
      position: absolute;
      top: auto;
      left: 0;
      bottom: 100%;
      width: 100%;
    }

    .ui.segment > .ui.bottom.attached.progress,
    .ui.card > .ui.bottom.attached.progress {
      top: 100%;
      bottom: auto;
    }

    /*--------------
         Colors
    ---------------*/

    /* Red */

    .ui.red.progress .bar {
      background-color: #DB2828;
    }

    .ui.red.inverted.progress .bar {
      background-color: #FF695E;

    }

    /* Orange */

    .ui.orange.progress .bar {
      background: #0000ff; /* Old browsers */
      background: -moz-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* FF3.6+ */
      background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ff0080),color-stop(50%,#0000ff), color-stop(100%,#ff0080)); /* Chrome,Safari4+ */
      background: -webkit-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* Chrome10+,Safari5.1+ */
      background: -o-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* Opera 11.10+ */
      background: -ms-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* IE10+ */
      background: linear-gradient(to right,  #ff0080 0%,#0000ff 50%,#ff0080 100%); /* W3C */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0080', endColorstr='#ff0080',GradientType=1 ); /* IE6-9 */
      background-size: 100vw 100vh;

      -webkit-animation: slide 15s linear infinite;
      -moz-animation: slide 15s linear infinite;
      -o-animation: slide 15s linear infinite;
    }

    .ui.orange.inverted.progress .bar {
      background-color: #0000ff;
    }

    /*--------------
         Sizes
    ---------------*/

    .ui.tiny.progress {
      font-size: 0.85714286rem;
    }

    .ui.tiny.progress .bar {
      height: 0.5em;
    }

    .ui.small.progress {
      font-size: 0.92857143rem;
    }

    .ui.small.progress .bar {
      height: 1em;
    }

    .ui.progress {
      font-size: 1rem;
    }

    .ui.progress .bar {
      height: 1.75em;
    }

    .ui.large.progress {
      font-size: 1.14285714rem;
    }

    .ui.large.progress .bar {
      height: 2.5em;
    }

    .ui.big.progress {
      font-size: 1.28571429rem;
    }

    .ui.big.progress .bar {
      height: 3.5em;
    }

    /*******************************
                Progress
    *******************************/

    #progress-container {
      position: relative;
    }
    .progress-rap {
      border-top: 2px solid black;
      background-color: rgba(255, 255, 255, 0.3);
      position: relative;
      bottom: -55px;
    }
    #sound-image-wrap {
      height: calc(45% - 50px);
      width: 100%;
      overflow: hidden;
      margin: 50px auto 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 0;
      background-image: radial-gradient(blue 20%, transparent 0), radial-gradient(blue 20%, transparent 0);
      background-position: 0 0, 10px 10px;
      background-size: 10px 10px;
      background-color: rgba(255, 255, 255, 0.5);
      background-repeat: repeat;
    }

    #sound-image-wrap .soundImage {
      display: block;
      margin: 1% auto 0;
      border-radius: 50%;
      border: 2px solid black;
      height: 100px;
      width: 100px;
      background-size: cover;
      background-position: center;
      opacity: 1;
    }
    #sound-image-wrap .soundImage::before {
      content: "";
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin: 0 auto;
      mix-blend-mode: normal;
      position:absolute;
      opacity: 1;
      background-image: url('/static/cd.svg');
    }
    #sound-image-wrap .soundImage::after {
      content: "";
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin: 0 auto;
      background-color: blue;
      mix-blend-mode: hue;
      position:absolute;
      opacity: 1;
    }

    .ui.container {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .currentsong {
      white-space: nowrap;
      position: absolute;
      bottom: 50%;
      height: 75px;
      width: 100%;
      border-top: 2px solid black;
      background-color: rgba(0,0,0,.8);
      color: white;
      font-family: Arial;
      padding: 0 10px;
      z-index: 2;
    }
    .currentsong span {
      display: inline-block;
      font-size: 14px;
    }

    .info-artist {
      color: yellow;
      padding: 10px 0px;
    }

    .info-title {
      padding: 10px 0px;
    }

    .tracklist {
      overflow-y: scroll;
      height: 35%;
      width: 100%;
      position: absolute;
      bottom: 100px;
      color: blue;
      z-index: 14;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      padding: 0;
      background-color: rgba(255, 255, 255, .9);
      overflow-x: hidden;
    }
    .tracklist li {
      padding:  15px 40px;
      display: block;
      width: calc(100% - 80px);
      white-space: nowrap;
      overflow: hidden;
      background-color: rgba(255, 255, 255, .25);
      font-weight: bold;
      transition: all linear .25s;
      -webkit-transition: all linear .25s;
      position: relative;
    }

    .sc-link {
      position: absolute;
      background-size: 10px;
      background-repeat: no-repeat;
      background-position: center;
      top: 10px;
      right: 10px;
      height: 25px;
      width: 25px;
      background-color: black;
      background-image: url('/static/link.svg');
      transition: all linear .25s;
      -webkit-transition: all linear .25s;
    }

    .tracklist li.activeTrack:before {
      content: ' ';
      background-image: url('/static/stream.svg');
      background-repeat: no-repeat;
      height: 15px;
      width: 15px;
      display: block;
      position: absolute;
      left: 15px;
      transition: all linear .25s;
      -webkit-transition: all linear .25s;
    }

    .disco li.activeTrack:not(:hover) {
      background: linear-gradient(to right, #FF0080 20%, #0000ff 40%, #0000ff 60%, #FF0080 80%);
      background-size: 200% auto;
      color: #0000ff;
      background-clip: text;
      text-fill-color: transparent;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 5s linear infinite alternate-reverse .25s;
      -webkit-animation: shine 5s linear infinite alternate-reverse .25s;
      z-index: 2;
    }
    .tracklist ol {
      padding: 0;
    }
    .tracklist li:hover, .disco li.activeTrack:hover  {
      background-color: blue;
      color: white;
    }

    .tracklist li:hover:before {
      background-image: url('/static/streamwhite.svg');
    }


    .tracklist li:hover .sc-link {
      background-color: white;
      background-image: url('/static/link2.svg');
    }
    .tracklist li:hover .sc-link:hover {
      background-color: yellow !important;
      background-image: url('/static/link3.svg');
      transition: none;
      -webkit-transition: none;
    }
    .tracklist li:not(:last-child) {
      border-bottom: 2px solid black;
    }

    .soundStart {
      transform-origin: 50% 50%;
      -webkit-transform-origin: 50% 50%;
      animation: spinsong infinite 30s linear .25s forwards;
      -webkit-animation: spinsong infinite 30s linear .25s forwards;
    }

    .soundStart.paused {
      animation-play-state: paused;
      -webkit-animation-play-state: paused;
    }

    @keyframes spinsong {
      to {
        transform: rotate(359.9deg);
      }
    }
    @-webkit-keyframes spinsong {
      to {
        -webkit-transform: rotate(359.9deg);
      }
    }


</style>
