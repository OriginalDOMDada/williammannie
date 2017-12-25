<template>
  <div style="height: 100vw; width: 100vw; position: absolute;" v-bind:class="{windowOpen :appData.applications.music.openApp}">
  <transition-group name="fade" tag="div" class="windows">
  <vue-draggable-resizable :x.sync="x" :y.sync="y" :active="true" :draggable="dragState" @activated="high" :maximize="true" :z.sync="appData.applications.music.z" :parent="parent" :resizing="true" :h="450" :w="400" :minh="400" :minw="400" v-if="appData.applications.music.openApp" v-bind:name="appData.applications.music.text" v-bind:open="appData.applications.music.openApp" v-bind:key="1" id="music" class="box-md app">
  <div class="big-rap">
  <div class="box-header" @mouseover="dragOn" @mouseleave="dragOff">
      <div class="title-box">
        <div class="subtitle fancy">
        <span><span class="two"><h2>{{appData.applications.music.text}}</h2></span></span>
        </div>
        <div class="button-section">
        <button v-on:click="explode" class="opt red" type="button" name="expand"><svgicon v-on:click="explode" name="close" height="6" width="6" :original="true"></svgicon></button>
        <button class="opt green" type="button" name="fullSize" v-on:click="fullSize" @mouseover="parentOn" @mouseleave="parentOff"><svgicon name="open" height="6" width="6" :original="true" v-on:click="fullSize"></svgicon></button>
        </div>
      </div>
    </div>
      <div class="wrappa-da-rappa">
          <div class="app-content" name="music">
            <div id="sound-image-wrap">
              <div class="soundImage"></div>
            </div>
            <div class="tracklist">
              <ol class="datracklist"></ol>
            </div>
            <div class="ui container">
              <div class="ui segment">
                <!-- <div id="loader" class="ui active inverted dimmer">
                  <div class="ui text loader">Loading</div>
                </div>  -->
                <iframe id="soundcloud" width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/376667462&sharing=false&auto_play=false&font=Georgia&show_comments=false&theme_color=0000ff&color=0000ff&show_playcount=false&show_bpm=false"></iframe>
                <div id="controls">
                  <div class="ui icon buttons">
                    <button id="back-button" class="ui button">
                    <svgicon name="prev" height="20" width="20" :original="true"></svgicon>
                    </button>
                    <button id="play-button" class="ui button">
                    <svgicon name="play" height="20" width="20" :original="true"></svgicon>
                    </button>
                    <button id="forward-button" class="ui button">
                    <svgicon name="next" height="20" width="20" :original="true"></svgicon>
                    </button>
                    <button id="mute-button" class="ui button">
                    </button>
                  </div>
                </div>
                <div class="progress-rap">
                  <div id="progress-container" class="ui orange progress">
                    <div id="progress-bar" class="bar"></div>
                  </div>
                </div>
              </div>
              <div class="currentsong">
                <span class='info-title'></span>
                <span class='info-artist'></span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </vue-draggable-resizable>
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
        songTitle: ''
      }
    },
    updated () {
      var widget = new SoundcloudWidget('soundcloud')
      var playBtn = document.getElementById('play-button')
      /* var playIcon = playBtn.querySelector('i') */
      var soundImagediv = document.querySelector('.soundImage')

      var muteBtn = document.getElementById('mute-button')
      var muteIcon = muteBtn.querySelector('i')

      var backBtn = document.getElementById('back-button')
      var forwardBtn = document.getElementById('forward-button')
      var progressContainer = document.getElementById('progress-container')
      var progressBar = document.getElementById('progress-bar')

      widget.on(SoundcloudWidget.events.PLAY, function () {
        soundImagediv.classList.add('soundPlaying')
        /* playIcon.classList.add('pause') */
        /* playIcon.classList.remove('play') */
      })

      widget.on(SoundcloudWidget.events.PAUSE, function () {
        soundImagediv.classList.remove('soundPlaying')
        /* playIcon.classList.add('play') */
        /* playIcon.classList.remove('pause') */
      })

      widget.on(SoundcloudWidget.events.PLAY_PROGRESS, function (progress) {
        var maxWidth = progressContainer.offsetWidth
        var position = progress.relativePosition
        var newWidth = Math.floor(maxWidth * position)

        progressBar.style.width = newWidth + 'px'
      })

      muteBtn.addEventListener('click', function () {
        widget.getVolume().then(function (volume) {
          if (volume > 0) {
            widget.setVolume(0)
            muteIcon.classList.remove('mute')
            muteIcon.classList.add('unmute')
          } else {
            widget.setVolume(100)
            muteIcon.classList.add('mute')
            muteIcon.classList.remove('unmute')
          }
        })
      })

      playBtn.addEventListener('click', function () {
        widget.toggle()
      })

      forwardBtn.addEventListener('click', function () {
        widget.seekTo(0)
        widget.next()
      })

      backBtn.addEventListener('click', function () {
        widget.seekTo(0)
        widget.prev()
      })

      progressContainer.addEventListener('click', function (event) {
        var el = progressContainer
        var width = el.offsetWidth
        var rect = el.getBoundingClientRect()
        var position = event.clientX - rect.left + document.body.scrollLeft
        var percent = position / width

        widget.getDuration().then(function (duration) {
          var newPosition = Math.floor(duration * percent)

          widget.seekTo(newPosition)
        })
      })

      widget.on(SoundcloudWidget.events.READY, function () {
         /* var container = document.getElementById('loader') */
        widget.getSounds().then(function (soundList) {
          var thisList = soundList
          var list = document.querySelector('.datracklist')
          var nullFound = false
          for (var i = 0; i < thisList.length; i++) {
            if (thisList[i].title == null) {
              nullFound = true
              break
            }
          }
          if (!nullFound) {
            var listing = ''
            for (var n = 0; n < thisList.length; n++) {
              listing += '<li data-track="' + n + '"">' + '<span>' + (n + 1) + '.</span> ' + soundList[n].title + '</li>'
              if (thisList.length === (n + 1)) {
                list.innerHTML = listing
                break
              }
            }
            var seekTrack = document.querySelector('.datracklist')
            seekTrack.addEventListener('click', function (event) {
              if (event.target && event.target.nodeName === 'LI') {
                widget.skip(event.target.dataset.track)
              }
            })
          }
        })
        widget.getCurrentSound().then(function (soundObject) {
          document.querySelector('.info-title').innerHTML = soundObject.title
          document.querySelector('.soundImage').style.backgroundImage = 'url(' + soundObject.artwork_url + ')'
        })
      })
    },
    beforeUpdate () {
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
    methods: {
      fullSize: function () {
        this.parent = true
        var doubleClickEvent = document.createEvent('MouseEvents')
        doubleClickEvent.initEvent('dblclick', true, true)
        for (var i = 0; i < 1000; i++) {
          this.$el.querySelector('#music').dispatchEvent(doubleClickEvent)
        }
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
          appData.applications.music.z = largest + 1
        }
      },
      explode: function () {
        this.appData.applications.music.openApp = false
        document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
        document.getElementsByClassName('panel')['0'].style.backgroundImage = `url(${require('../../assets/gifs/explode.gif')})`
        document.getElementsByClassName('panel')['0'].style.backgroundSize = '100% 100%'
        setTimeout(function () {
          document.getElementsByClassName('panel')['0'].style.WebkitAnimation = 'inherit'
          document.getElementsByClassName('panel')['0'].style.backgroundImage = ''
          document.getElementsByClassName('panel')['0'].style.backgroundSize = ''
        }, 1000)
      }
    }
  }
</script>


<style>
  #soundcloud {
    visibility: hidden;
    height: 0;
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
  }
  .ui.button:first-child, .ui.button:nth-child(2), .ui.button:nth-child(3)  {
    border-right: 2px solid #0000ff;
  }
  .ui.button svg {
    fill: blue;
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

    /*******************************
                Types
    *******************************/

    /* Indicating */

    .ui.indicating.progress[data-percent^="1"] .bar,
    .ui.indicating.progress[data-percent^="2"] .bar {
      background-color: #D95C5C;
    }

    .ui.indicating.progress[data-percent^="3"] .bar {
      background-color: #EFBC72;
    }

    .ui.indicating.progress[data-percent^="4"] .bar,
    .ui.indicating.progress[data-percent^="5"] .bar {
      background-color: #E6BB48;
    }

    .ui.indicating.progress[data-percent^="6"] .bar {
      background-color: #DDC928;
    }

    .ui.indicating.progress[data-percent^="7"] .bar,
    .ui.indicating.progress[data-percent^="8"] .bar {
      background-color: #B4D95C;
    }

    .ui.indicating.progress[data-percent^="9"] .bar,
    .ui.indicating.progress[data-percent^="100"] .bar {
      background-color: #66DA81;
    }

    /* Indicating Label */

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

    /* Single Digits */

    .ui.indicating.progress[data-percent="1"] .bar,
    .ui.indicating.progress[data-percent="2"] .bar,
    .ui.indicating.progress[data-percent="3"] .bar,
    .ui.indicating.progress[data-percent="4"] .bar,
    .ui.indicating.progress[data-percent="5"] .bar,
    .ui.indicating.progress[data-percent="6"] .bar,
    .ui.indicating.progress[data-percent="7"] .bar,
    .ui.indicating.progress[data-percent="8"] .bar,
    .ui.indicating.progress[data-percent="9"] .bar {
      background-color: #D95C5C;
    }

    .ui.indicating.progress[data-percent="1"] .label,
    .ui.indicating.progress[data-percent="2"] .label,
    .ui.indicating.progress[data-percent="3"] .label,
    .ui.indicating.progress[data-percent="4"] .label,
    .ui.indicating.progress[data-percent="5"] .label,
    .ui.indicating.progress[data-percent="6"] .label,
    .ui.indicating.progress[data-percent="7"] .label,
    .ui.indicating.progress[data-percent="8"] .label,
    .ui.indicating.progress[data-percent="9"] .label {
      color: rgba(0, 0, 0, 0.87);
    }

    /* Indicating Success */

    .ui.indicating.progress.success .label {
      color: #1A531B;
    }

    /*******************************
                 States
    *******************************/

    /*--------------
         Success
    ---------------*/

    .ui.progress.success .bar {
      background-color: #21BA45 !important;
    }

    .ui.progress.success .bar,
    .ui.progress.success .bar::after {
      -webkit-animation: none !important;
      animation: none !important;
    }

    .ui.progress.success > .label {
      color: #1A531B;
    }

    /*--------------
         Warning
    ---------------*/

    .ui.progress.warning .bar {
      background-color: #F2C037 !important;
    }

    .ui.progress.warning .bar,
    .ui.progress.warning .bar::after {
      -webkit-animation: none !important;
      animation: none !important;
    }

    .ui.progress.warning > .label {
      color: #794B02;
    }

    /*--------------
         Error
    ---------------*/

    .ui.progress.error .bar {
      background-color: #DB2828 !important;
    }

    .ui.progress.error .bar,
    .ui.progress.error .bar::after {
      -webkit-animation: none !important;
      animation: none !important;
    }

    .ui.progress.error > .label {
      color: #912D2B;
    }

    /*--------------
         Active
    ---------------*/

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
      margin: 2.5% auto 0;
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
      background-color: black;
      mix-blend-mode: screen;
      position:absolute;
      opacity: 1;
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
      top: 0;
    }

    .tracklist {
      overflow-y: scroll;
      height: 35%;
      width: 100%;
      position: absolute;
      bottom: 100px;
      color: blue;
      z-index: 50;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      padding: 0;
      background-color: rgba(255, 255, 255, .9);
      overflow-x: hidden;
    }
    .tracklist li {
      padding:  15px 40px;
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      background-color: rgba(255, 255, 255, .25);
      font-weight: bold;
      transition: all linear .25s;
    }
    .tracklist ol {
      padding: 0;
    }
    .tracklist li:hover {
      background-color: blue;
      color: white;
    }
    .tracklist li:not(:last-child) {
      border-bottom: 2px solid black;
    }

    .soundPlaying {
      transform-origin: 50% 50%;
      animation: spinsong infinite 30s linear .25s;
    }

    @keyframes spinsong {
      to {
        transform: rotate(359.9deg);
      }
    }


</style>
