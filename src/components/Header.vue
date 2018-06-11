<template>
<div>
  <div class='header'>
    <div class='dropdown'>
      <button tabindex="1" v-on:click.stop='expand' class='dropbtn' id='window'>
      <svgicon class="top-logo" name="top_logo" height="30" width="30" :original="true"></svgicon>
      <span class="top-text">William <b>Mannie</b></span></button>
      <div id='myDropdown' class='dropdown-content' style="display:none;">
        <span class="nest nest-one">
          <button class="nest nest-two" tabindex="0" v-on:click.prevent="expandNest">About Mannie<span class="menu-arrow">&#9658;</span></button>
          <div style="display: none;" class="nest nest-two-final">
            <button tabindex="0" v-on:click="appData.applications.aboutme.openApp = true" class="nest">Info</button>
            <button tabindex="0" v-on:click="appData.applications.skills.openApp = true" class="nest">Skills</button>
            <button tabindex="0" v-on:click="appData.applications.resume.openApp = true" class="nest">Resume</button>
          </div>
        </span>
        <span class="nest nest-one">
          <button class="nest nest-two" tabindex="0" v-on:click="appData.applications.skills.openApp = true">System Preferences</button>
        </span>
        <span class="nest nest-one">
          <button tabindex="0" class="nest nest-two" v-on:click.prevent="expandNest">
            Applications<span class="menu-arrow">&#9658;</span>
          </button>
          <div style="display: none;" class="nest nest-two-final">
            <button tabindex="0" v-on:click="appData.applications.eightball.openApp = true" class="nest">Magical 8-Ball</button>
            <button tabindex="0" v-on:click="appData.applications.threedee.openApp = true" class="nest">3-D</button>
            <button tabindex="0" v-on:click="appData.applications.solitare.openApp = true" class="nest">Solitare</button>
            <button tabindex="0" v-on:click="appData.applications.music.openApp = true" class="nest">Music</button>
            <button tabindex="0" v-on:click="appData.applications.video.openApp = true" class="nest">Video</button>
            <button tabindex="0" v-on:click="appData.applications.wammie.openApp = true" class="nest">Wammie</button>
          </div>
        </span>
        <span class="nest nest-one">
          <button tabindex="0" class="nest nest-two" v-on:click.prevent="expandNest">
          Share<span class="menu-arrow">&#9658;</span>
          </button>
          <div style="display: none;" class="nest nest-two-final">
            <button tabindex="0" class="nest"><a target="_blank" href="https://twitter.com/home?status=williammannie.com">Twitter</a></button>
            <button tabindex="0" class="nest"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=williammannie.com">Facebook</a></button>
            <button tabindex="0" class="nest"><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=williammannie.com&title=&summary=&source=">LinkedIn</a></button>
            <button tabindex="0" class="nest"><a target="_blank" href="https://plus.google.com/share?url=williammannie.com">Google +</a></button>
            <button tabindex="0" class="nest"><a target="_blank" href="mailto:?&body=williammannie.com">Email</a></button>
            <button tabindex="0" class="nest"><a target="_blank" href="sms:?&body=https://www.williammannie.com">SMS</a></button>
          </div>
        </span>
        <span class="nest nest-one">
          <button class="nest nest-two" tabindex="0"><a href="mailto:williammannie@gmail.com">Contact</a></button>
        </span>
        <span class="nest nest-one">
          <button class="nest nest-two" tabindex="0"><a href="/">Restart</a></button>
        </span>
      </div>
    </div>
    <div class="scrollwrap">
    <div class="marquee3k example2" data-speed="0.25" data-pausable="bool" id="example2">
    </div>
    </div>
    <div id='todaysDate'></div>
  </div>
  <div class="social" @mouseover.prevent="boxspin" v-bind:class="{ active: isflipped }">
    <div class="twitter smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s Twitter'" target="_blank" href="https://twitter.com/tripleOGstatus">
          <svgicon height="28" width="28" name="twitter"></svgicon>
        </a>
      </div>
    </div>
    <div class="dribble smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s Dribbe'" target="_blank" href="https://dribbble.com/tripleOGstatus">
          <svgicon height="28" width="28" name="dribble"></svgicon>
        </a>
      </div>
    </div>
    <div class="instagram smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s Instagram'" target="_blank" href="https://www.instagram.com/manfordthagreat/">
          <svgicon height="28" width="28" name="instagram"></svgicon>
        </a>
      </div>
    </div>
    <div class="facebook smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s LinkedIn'" target="_blank" href="https://www.facebook.com/crankdatmannie">
          <svgicon height="28" width="28" name="facebook"></svgicon>
        </a>
      </div>
    </div>
    <div class="github smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s GitHub'" target="_blank" href="https://github.com/chieflotsadoe">
          <svgicon height="28" width="28" name="github"></svgicon>
        </a>
      </div>
    </div>
    <div class="linkedin smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://www.linkedin.com/in/william-mannie-b1b20160/">
          <svgicon height="28" width="28" name="linkedin"></svgicon>
        </a>
      </div>
    </div>
    <div class="pocket smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s Pocket'" target="_blank" href="https://getpocket.com/@fR4TbA2agqK0xp7a2dd117fdf8p7gn0Z06dG93i8f7Q314f943b63as7Ba9yY2d4">
          <svgicon height="28" width="28" name="pocket"></svgicon>
        </a>
      </div>
    </div>
    <div class="soundcloud smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a v-tooltip="'Mannie\'s SoundCloud'" target="_blank" href="https://soundcloud.com/william-e-mannie">
          <svgicon height="28" width="28" name="soundcloud"></svgicon>
        </a>
      </div>
    </div>
  </div>
  <div class="stage" @click="appState">
    <div class="spinning-circle-wrapper">
      <svgicon name="spintext" height="100" width="100" :original="true"></svgicon>
    </div>
    <div class="float-wrap" v-tooltip="'Click,Share,Like! Make Me Famous'">
      <div class="box">
          <div class="f pane">
            <div class="section"data-id="1">
              <a target="_black" href="https://twitter.com/home?status=williammannie.com">
                <svgicon height="40" width="40" name="twitter"></svgicon>
              </a>
            </div>
          </div>
          <div class="r pane">
            <div class="section" data-id="2">
              <a target="_black" href="https://plus.google.com/share?url=williammannie.com">
                <svgicon height="40" width="40" name="googleplus"></svgicon>
              </a>
            </div>
          </div>
          <div class="u pane">
            <div class="section" data-id="3">
              <a target="_black" href="https://www.linkedin.com/shareArticle?mini=true&url=williammannie.com&title=&summary=&source=">
                <svgicon height="40" width="40" name="linkedin"></svgicon>
              </a>
            </div>
          </div>
          <div class="l pane">
            <div class="section" data-id="4">
              <a target="_black" href="https://www.facebook.com/sharer/sharer.php?u=williammannie.com">
                <svgicon height="40" width="40" name="facebook"></svgicon>
              </a>
            </div>
          </div>
          <div class="t pane">
            <div class="section" data-id="5">
              <a href="mailto:?&body=williammannie.com">
                <svgicon height="40" width="40" name="sharemail"></svgicon>
              </a>
            </div>
          </div>
          <div class="b pane">
            <div class="section" data-id="6">
              <a target="_black" href="sms:?&body=https://www.williammannie.com">
                <svgicon height="40" width="40" name="link"></svgicon>
              </a>
            </div>
          </div>
      </div>
      <svgicon name="serve" id="handFloat" :original="true"></svgicon>
    </div>
  </div>
</div>
</template>

<script>
    import appData from '../appData.json'
    import Marquee3k from 'marquee3000'
    import SunCalc from 'suncalc'
    import twitterFetcher from 'twitter-fetcher'
    // import VanillaTilt from 'vanilla-tilt'
    export default {
      data () {
        return {
          appData,
          shareOpen: false,
          isflipped: false,
          topLogo: require('../assets/svg/top_logo.svg')
        }
      },
      beforeUpdate () {

      },
      mounted () {
        var config2 = {
          'profile': {'screenName': 'TechCrunch'},
          'domId': 'example2',
          'maxTweets': 3,
          'enableLinks': true,
          'showUser': true,
          'showTime': false,
          'showImages': false,
          'showInteraction': false,
          'lang': 'en'
        }
        twitterFetcher.fetch(config2)
        function initmarkee () {
          if (document.getElementById('example2').innerHTML !== '') {
            var users = document.querySelectorAll('[data-scribe="element:screen_name"]')
            users.forEach(function (element) {
              element.innerHTML = element.innerHTML + ':'
            })
            Marquee3k.init({
              selector: 'example2'
            })
          } else {
            setTimeout(initmarkee, 1000)
          }
        }
        initmarkee()
        function doDate () {
          var str = ''
          var lat = ''
          var long = ''
          var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          var now = new Date()
          var hours = now.getHours()
          var minutes = now.getMinutes()
          var ampm = hours >= 12 ? 'PM' : 'AM'
          hours = hours % 12
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition)
          } else {
            console.log('Geolocation is not supported by this browser.')
          }
          if (hours === 0) {
            hours = 12
          }
          minutes = minutes < 10 ? '0' + minutes : minutes
          str += days[now.getDay()] + ' ' + hours + ':' + minutes + ' ' + ampm
          document.getElementById('todaysDate').innerHTML = str
          function showPosition (position) {
            lat = position.coords.latitude
            long = position.coords.longitude
            var times = SunCalc.getTimes(new Date(), lat, long)
            if ((times.dawn.getTime() <= now.getTime()) && (times.night.getTime() >= now.getTime())) {
              document.getElementById('todaysDate').classList.add('day')
              document.getElementById('todaysDate').classList.remove('night')
            } else {
              document.getElementById('todaysDate').classList.add('night')
              document.getElementById('todaysDate').classList.remove('day')
            }
          }
        }
        setInterval(doDate, 1000)
      },
      methods: {
        appState (event) {
          if (event.target.closest('.box')) {
            document.querySelector('.stage').classList.add('open')
            setTimeout(function () {
              document.querySelectorAll('.pane').forEach(function (element) {
                element.classList.add('open')
                element.querySelector('.section').classList.add('open')
              })
            }, 225)
            setTimeout(function () {
              document.querySelector('.float-wrap').classList.add('paused')
              document.querySelector('.box').classList.add('open')
            }, 500)
            setTimeout(function () {
              document.querySelector('.box').classList.add('done')
            }, 1500)
          } else {
            document.querySelector('.box').classList.remove('open')
            document.querySelector('.float-wrap').classList.remove('paused')
            document.querySelectorAll('.pane').forEach(function (element) {
              element.classList.remove('open')
              element.querySelector('.section').classList.remove('open')
            })
            document.querySelector('.stage').classList.remove('open')
            document.querySelector('.box').classList.remove('done')
          }
        },
        boxspin: function () {
          var $this = this
          $this.isflipped = true
          var flipout = function (event) {
            if (event.type === 'click') {
              $this.isflipped = false
            }
          }
          window.addEventListener('click', flipout, false)
        },
        expand (event) {
          var x = this.$el.querySelector('#window')
          // var $event = event
          if (x.nextSibling.nextSibling.style.display === 'none') {
            x.style.backgroundColor = '#0000FF'
            x.nextSibling.nextSibling.style.display = 'block'
            document.addEventListener('click', function (event) {
              if (event.target.classList[1] !== 'nest-two') {
                x.nextSibling.nextSibling.style.display = 'none'
                x.style.backgroundColor = 'black'
                // document.remoEventListener('click')
              }
              // if (event.target.classList[1] === 'dropbtn') {
              //   x.style.backgroundColor = 'black'
              // }
            })
          } else {
            x.style.backgroundColor = 'black'
            x.nextSibling.nextSibling.style.display = 'none'
          }
        },
        expandNest (event) {
          if (window.innerWidth < 900) {
            var x = event.srcElement
            if (x.nextSibling.nextElementSibling.style.display === 'none') {
              x.style.backgroundColor = '#0000FF'
              x.nextSibling.nextElementSibling.style.display = 'block'
            } else {
              x.style.backgroundColor = 'black'
              x.nextSibling.nextElementSibling.style.display = 'none'
            }
          }
        }
      }
    }
</script>

<style>
  .top-logo:hover g {
    animation: topspin 1.5s ease-in-out 1 alternate .25s;
    -webkit-transform-origin: 173.4px 169.1px;
    -webkit-transform-origin: 173.4px 169.1px;
  }
  .header .marquee3k {
    color: white;
    font-family: Arial;
    display: inline-block;
    width: 300px;
    overflow: hidden;
    position: absolute;
    bottom: -2px;
    padding: 20px;
    font-size: 14px;
    right: 0;
    font-style: italic;
  }

  .scrollwrap {
    width: 300px;
    height: 100%;
    display: inline-block;
  }

  .scrollwrap:before {
    content: '';
    display: inline-block;
    background-image: url('http://localhost:8080/static/twitstream.svg');
    right: 350px;
    top: 10px;
    position: absolute;
    overflow: visible !important;
    background-repeat: no-repeat;
  }

  .panel1 {
    transform: translateZ( 15px );
    -webkit-transform: translateZ( 15px );
    z-index: 1;
    position: absolute;
    transition: transform 0.25s ease-in-out;
  }

  .panel2 {
    transform: rotateY( 90deg ) translateZ( 15px );
    z-index: 0;
    position: absolute;
    transition: transform 0.25s ease-in-out;
  }

  .active .smcube .panel1 {
    transform: translateX( -10px ) rotateY( -90deg );
  }
  .active .smcube .panel2 {
    transform: rotateY( 0deg );
  }

  .active div:nth-child(2) .panel1, .active div:nth-child(2) .panel2 {
    -webkit-transition-delay: .1s;
            transition-delay: .1s;
  }
  .active div:nth-child(3) .panel1, .active div:nth-child(3) .panel2 {
    -webkit-transition-delay: .2s;
            transition-delay: .2s;
  }
  .active div:nth-child(4) .panel1, .active div:nth-child(4) .panel2 {
    -webkit-transition-delay: .3s;
            transition-delay: .3s;
  }
  .active div:nth-child(5) .panel1, .active div:nth-child(5) .panel2 {
    -webkit-transition-delay: .4s;
            transition-delay: .4s;
  }
  .active div:nth-child(6) .panel1, .active div:nth-child(6) .panel2 {
    -webkit-transition-delay: .5s;
            transition-delay: .5s;
  }
  .active div:nth-child(7) .panel1, .active div:nth-child(7) .panel2 {
    -webkit-transition-delay: .6s;
            transition-delay: .6s;
  }
  .active div:nth-child(8) .panel1, .active div:nth-child(8) .panel2 {
    -webkit-transition-delay: .7s;
            transition-delay: .7s;
  }

.scrollwrap:before {
  background-image: url("/static/twitter-bird-sprite.png");
  animation: tweet 1.5s steps(4) infinite;
  height: 25px;
  width: 25px;
  background-size: 100px;
  transiton: all 2s ease;
}

.scrollwrap:hover:before {
  animation-play-state: paused;
}

@keyframes tweet{
  100%{
    background-position:-100px 0;
  }
}

  .header.marquee3k ul {
    margin: 0;
    padding: 0;
  }
  .header .marquee3k li {
    display: table-cell;
    padding-right: 15px;
  }
  .header .marquee3k p, .marquee3k div {
    display: inline-block;
    white-space: nowrap;
  }

  .header .marquee3k p br {
    display: inline;
    content: ' ';
    clear:none;
  }

  .header .marquee3k a {
    color: yellow;
  }

  .header .marquee3k a span:nth-child(2) {
    display: none;
  }
  .header .marquee3k .user {
    margin-right: 5px;
  }

  .header .marquee3k ul img {
    display: none;
  }

  @keyframes topspin {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(-90deg);
    }
    40% {
      transform: rotate(185deg);
    }
    50% {
      transform: rotate(181deg);
    }
    60% {
      transform: rotate(180deg);
    }
    80% {
      transform: rotate(181deg);
    }
    90% {
      transform: rotate(170deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .stage {
    position: fixed;
    bottom: 25px;
    right: 35px;
    width: 100px;
    height: 100px;
    transition: all .5s linear;
    overflow: hidden;
    z-index: 888;
    transform-style: preserve-3d;
    box-sizing: border-box;
    perspective: 1000px;
  }

  .stage * {
    transform-style: preserve-3d;
    box-sizing: border-box;
  }
  .float-wrap {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 20px;
    height: 20px;
    top: calc(40% - 10px);
    transform-origin: 50% 50%;
  }
  .box.open {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    animation: rotation 20s infinite linear forwards;
    -webkit-animation: rotation 20s infinite linear forwards;
     width: 100px;
     height: 100px;
  }
  .box  {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  .box > div.pane {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    transition: all 1s ease;
  }
  .box > div.pane:not(.open) {
    transition: all .5s linear;
  }
  .box > div.f {
    transform: translateZ(10px) rotateY(0);
  }
  .box > div.u {
    transform: translateZ(-10px) rotateY(180deg);
  }
  .box > div.t,
  .box > div.b {
    height: 100%;
  }
  .box > div.l,
  .box > div.r {
    width: 100%;
  }
  .box > div.t {
    transform: translateY(-10px) rotateX(90deg);
  }
  .box > div.r {
    transform: translateX(10px) rotateY(90deg);
  }
  .box > div.b {
    transform: translateY(10px) rotateX(90deg) rotateY(180deg);
  }
  .box > div.l {
    transform: translateX(-10px) rotateY(-90deg);
  }
  .section {
    width: 100%;
    height: 100%;
    background: white;
    border: 1.25px solid rgba(0,0,255,1);
    cursor: url("../../static/cursor/cursor-16-01.svg"), auto;
    display: block;
    animation: clickme .25s infinite ease-in-out;
    @keyframes clickme{
      0%{
        cursor: url("../../static/cursor/cursor-16-06.svg"), auto;
      }
      25%{
        cursor: url("../../static/cursor/cursor-16-02.svg"), auto;
      }
      50%{
        cursor: url("../../static/cursor/cursor-16-03.svg"), auto;
      }
      75%{
        cursor: url("../../static/cursor/cursor-16-04.svg"), auto;
      }
      100%{
        cursor: url("../../static/cursor/cursor-16-05.svg"), auto;
      }
    }

    @-webkit-keyframes clickme{
      0%{
        cursor: url("../../static/cursor/cursor-16-06.svg"), auto;
      }
      25%{
        cursor: url("../../static/cursor/cursor-16-02.svg"), auto;
      }
      50%{
        cursor: url("../../static/cursor/cursor-16-03.svg"), auto;
      }
      75%{
        cursor: url("../../static/cursor/cursor-16-04.svg"), auto;
      }
      100%{
        cursor: url("../../static/cursor/cursor-16-05.svg"), auto;
      }
    }
  }

  .box:not(.open) {
    -webkit-animation: closedrotation 20s linear infinite .2s;
    animation: closedrotation 20s linear infinite .2s;
  }

  @keyframes closedrotation {
    0% {
      -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg) translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg) translate3d(0px, 0px, 0px);
    }
    50% {
      -webkit-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg)  translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg) translate3d(0px, 0px, 0px);
    }
    100% {
      -webkit-transform: rotateX(180deg) rotateY(-360deg) rotateZ(-270deg) translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(-360deg) rotateZ(-270deg) translate3d(0px, 0px, 0px);
    }
  }

  @-webkit-keyframes closedrotation {
    0% {
      -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg) translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(360deg) rotateZ(270deg) translate3d(0px, 0px, 0px);
    }
    50% {
      -webkit-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg)  translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg) translate3d(0px, 0px, 0px);
    }
    100% {
      -webkit-transform: rotateX(180deg) rotateY(-360deg) rotateZ(-270deg) translate3d(0px, 0px, 0px);
              transform: rotateX(180deg) rotateY(-360deg) rotateZ(-270deg) translate3d(0px, 0px, 0px);
    }
  }


  .section a, .section a svg {
    display: none;
    opacity: 0;
  }

  .paused .section a, .paused .section a svg  {
    display: inline-block;
    opacity: 1;
    transition: all 10s linear forwards;
  }

  .paused .section a svg {
    margin: 20px;
  }

  .section.current {
    cursor: default;
  }
  .section:hover {
    background: yellow;
    transition: all .5s linear;
    animation: none;
    /* border-color: white !important; */
  }

  .box.open .section.current:hover {
    background: #fff;
  }

  .box.open .section.open:hover {
    background: rgba(0,0,255,1);
    border: 2px solid white !important;
  }
  .section:hover svg.svg-icon {
    fill: white;
  }
  .section .svg-icon {
    fill: rgba(0,0,255,1);
  }
  .box.open .section {
    border: 2px solid rgba(0,0,255,1) !important;
  }

  .box > div.pane.open {
    width: 100%;
    height: 100%;
    position: absolute;
     -webkit-animation: backwards-rotation 20s infinite linear;
     animation: backwards-rotation 20s infinite linear;
     background-color: transparent;
     margin: 0;
     right: unset;
     left: unset;
     top: unset;
     bottom: unset;
  }

  .box > div.pane.open.f{
    bottom: -60px;
    left: -110px;
    transform: rotate(0deg);
    transition: all 1.5s ease-in-out forwards 1s;
  }

  .box > div.pane.open.r {
    top: -60px;
    left: -110px;
    transform: rotate(0deg);
    transition: all 1.5s ease-in-out forwards 1s;
  }

  .box > div.pane.open.u {
    left: 10px;
    bottom: 145px;
    transform: rotate(0deg);
    transition: all 1.5s ease-in-out forwards 1s;
  }

  .box > div.pane.open.l {
    top: -60px;
    right: -110px;
    transform: rotate(0deg);
    transition: all 1.5s ease-in-out forwards 1s;
  }

  .box > div.pane.open.t {
    bottom: -60px;
    right: -110px;
    transform: rotate(0deg);
    transition: all 1.5s ease-in-out forwards 1s;
  }

  .box > div.pane.open.b {
    left: 10px;
    top: 145px;
    transform: rotate(0deg);
    transition: all 1.5s ease-in-out forwards 1s;
  }



  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes backwards-rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
              transform: rotate(-360deg);
    }
  }
  @keyframes backwards-rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
              transform: rotate(-360deg);
    }
  }
  @-webkit-keyframes scadivng {
    0% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
    15% {
      -webkit-transform: scale(0.5) translateY(100px);
              transform: scale(0.5) translateY(100px);
    }
    65% {
      -webkit-transform: scale(1.2);
              transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
  }
  @keyframes scadivng {
    0% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
    15% {
      -webkit-transform: scale(0.5) translateY(100px);
              transform: scale(0.5) translateY(100px);
    }
    65% {
      -webkit-transform: scale(1.2);
              transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(0.65) translateY(65px);
              transform: scale(0.65) translateY(65px);
    }
  }

  @keyframes floatshare {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(20%);
    }
      0% {
      transform: translateY(0%);
    }
  }

  @-webkit-keyframes floatshare {
    0% {
      -webkit-transform: translateY(0%);
    }
    50% {
      -webkit-transform: translateY(20%);
    }
      0% {
      -webkit-transform: translateY(0%);
    }
  }

  .float-wrap.paused {
    animation-play-state: paused;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .stage.open {
    width: 100vw;
    height: 100vh;
    transform-origin: 50% 50%;
    bottom: 0;
    right: 0;
    animation: bgfade 1s ease-in-out forwards .25;
  }

  @keyframes bgfade {
    0% {
      background: linear-gradient(to right,  rgba(255,0,128,0) 0%, rgba(0,0,255,0) 50%,rgba(255,0,128,0) 100%);
    }
    90% {
      background: linear-gradient(to right,  rgba(255,0,128,.5) 0%, rgba(0,0,255,.5) 50%,rgba(255,0,128,.5) 100%);
    }
    100% {
      background: linear-gradient(to right,  rgba(255,0,128,1) 0%, rgba(0,0,255,1) 50%,rgba(255,0,128,1) 100%);
    }
  }

  @-webkit-keyframes bgfade {
    0% {
      background: linear-gradient(to right,  rgba(255,0,128,0) 0%, rgba(0,0,255,0) 50%,rgba(255,0,128,0) 100%);
    }
    90% {
      background: linear-gradient(to right,  rgba(255,0,128,.5) 0%, rgba(0,0,255,.5) 50%,rgba(255,0,128,.5) 100%);
    }
    100% {
      background: linear-gradient(to right,  rgba(255,0,128,1) 0%, rgba(0,0,255,1) 50%,rgba(255,0,128,1) 100%);
    }
  }

  .stage.open::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .0;
    z-index: -1;
    background: #0000ff; /* Old browsers */
    background: -moz-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ff0080),color-stop(50%,#0000ff), color-stop(100%,#ff0080)); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left,  #ff0080 0%, #0000ff 50%,#ff0080 100%); /* IE10+ */
    background: linear-gradient(to right,  #ff0080 0%,#0000ff 50%,#ff0080 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0080', endColorstr='#ff0080',GradientType=1 ); /* IE6-9 */
    background-size: 200vh 200vw;
    animation: fade, slide 15s linear infinite 2s;
    -webkit-animation: fade, slide 15s linear infinite .5s;
    -moz-animation: fade, slide 15s linear infinite .5s;
    -o-animation: fade, slide 15s linear infinite .5s;
  }

  @keyframes slide {
      from{
          background-position:0px;
          opacity: .9;
      }
      to{
          background-position:200vw;
          opacity: .9;
      }
  }

  @-webkit-keyframes slide {
      from{
        background-position:200vw;
        opacity: .9;
      }
      to{
        background-position:200vw;
        opacity: .9;
      }
  }





  div.open.pane.f .section.open {
    -webkit-animation-delay: -16.6666666667s;
            animation-delay: -16.6666666667s;
  }
  div.open.pane.r .section.open {
    -webkit-animation-delay: -20s;
            animation-delay: -20s;
  }
  div.open.pane.u .section.open {
    -webkit-animation-delay: -23.3333333333s;
            animation-delay: -23.3333333333s;
  }
  div.open.pane.l .section.open {
    -webkit-animation-delay: -26.6666666667s;
            animation-delay: -26.6666666667s;
  }
  div.open.pane.t .section.open {
    -webkit-animation-delay: -30s;
            animation-delay: -30s;
  }
  div.open.pane.b .section.open {
    -webkit-animation-delay: -33.3333333333s;
            animation-delay: -33.3333333333s;
  }

  .open .section.open {
    display: block;
    width: 80px;
    height: 80px;
    -webkit-animation: scadivng 20s infinite linear;
            animation: scadivng 20s infinite linear;
    transition: all 1s linear;
    -webkit-transition: all 1s linear;
  }


  .box.done:hover,
  .box.done:hover div,
  .box.done:hover .section{
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
  }

  .spinning-circle-wrapper {
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    height: 100px;
    width: 100px;
    transform-origin: 50% 50%;
    animation: spinning 60s linear infinite;
  }

  #handFloat {
    width: 25px;
    height: auto;
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    margin-top: 7px;
    transform-origin: 50% 50%;
  }
  .spinning-circle-wrapper {
    top: calc( 50% - 50px);
    left: calc( 50% - 50px);
  }
  .open .spinning-circle-wrapper {
    animation-play-state: paused;
    transiton: all 2s linear;
  }
  .open .spinning-circle-wrapper svg {
    visibility: hidden;
    top: 0;
    right: 0;
  }

  .open .spinning-circle-wrapper svg {
    transform-origin: 50% 50%;
  }
  .open #handFloat {
    display: none;
  }

  @keyframes spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spinning {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

</style>
