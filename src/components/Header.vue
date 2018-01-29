<template>
<div>
  <div class='header'>
    <div class='dropdown'>
      <svgicon class="top-logo" name="top_logo" height="30" width="30" :original="true"></svgicon>
      <button v-on:click='expand' class='dropbtn' id='window'>William <b>Mannie</b></button>
      <div id='myDropdown' class='dropdown-content' style="display:none;">
        <a href='#'>Link 1</a>
        <a href='#'>Link 2</a>
        <a href='#'>Link 3</a>
      </div>
    </div>
    <div class="scrollwrap">
    <div class="marquee3k example2" data-speed="0.25" data-pausable="bool" id="example2">
    </div>
    </div>
    <div id='todaysDate'></div>
  </div>
  <div class="social" @mouseover="boxspin" v-bind:class="{ active: isflipped }" @mouseout="isflipped = false" >
    <div class="twitter smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://twitter.com/tripleOGstatus">
          <svgicon height="28" width="28" name="twitter"></svgicon>
        </a>
      </div>
    </div>
    <div class="dribble smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://dribbble.com/tripleOGstatus">
          <svgicon height="28" width="28" name="dribble"></svgicon>
        </a>
      </div>
    </div>
    <div class="instagram smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://www.instagram.com/manfordthagreat/">
          <svgicon height="28" width="28" name="instagram"></svgicon>
        </a>
      </div>
    </div>
    <div class="facebook smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://www.facebook.com/crankdatmannie">
          <svgicon height="28" width="28" name="facebook"></svgicon>
        </a>
      </div>
    </div>
    <div class="github smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://github.com/chieflotsadoe">
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
        <a target="_blank" href="https://getpocket.com/@fR4TbA2agqK0xp7a2dd117fdf8p7gn0Z06dG93i8f7Q314f943b63as7Ba9yY2d4">
          <svgicon height="28" width="28" name="pocket"></svgicon>
        </a>
      </div>
    </div>
    <div class="soundcloud smcube">
      <div class="smpanel panel1"></div>
      <div class="smpanel panel2">
        <a target="_blank" href="https://soundcloud.com/william-e-mannie">
          <svgicon height="28" width="28" name="soundcloud"></svgicon>
        </a>
      </div>
    </div>
  </div>
  <div class="stage" @click="appState">
    <div class="spinning-circle-wrapper">
      <svgicon name="spintext" height="100" width="100" :original="true"></svgicon>
    </div>
    <div class="float-wrap">
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
    export default {
      data () {
        return {
          appData,
          shareOpen: false,
          isflipped: false,
          topLogo: require('../assets/svg/top_logo.svg')
        }
      },
      mounted () {
        var config2 = {
          'profile': {'screenName': 'tripleogstatus'},
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
          } else {
            document.querySelector('.box').classList.remove('open')
            document.querySelector('.float-wrap').classList.remove('paused')
            document.querySelectorAll('.pane').forEach(function (element) {
              element.classList.remove('open')
              element.querySelector('.section').classList.remove('open')
            })
            document.querySelector('.stage').classList.remove('open')
          }
        },
        boxspin: function () {
          this.isflipped = true
        },
        expand (event) {
          var x = document.getElementById(event.target.id)
          if (x.nextSibling.nextSibling.style.display === 'none') {
            x.style.backgroundColor = '#0000FF'
            x.nextSibling.nextSibling.style.display = 'block'
          } else {
            x.style.backgroundColor = 'black'
            x.nextSibling.nextSibling.style.display = 'none'
          }
        }
      }
    }
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
</script>

<style>
  .top-logo:hover g {
    animation: topspin 1.5s ease-in-out 1 alternate .25s;
    transform-origin: 50% 50%;
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
    position: absolute;
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
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: rotation 20s infinite linear;
     animation: rotation 20s infinite linear;
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
    border: 1px solid black;
    cursor: pointer;
    display: block;
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
  .section.current:hover {
    background: #fff;
  }
  .section:hover {
    background: #ff0;
  }

  .box.open .section {
    border: 2px solid black !important;
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
    transition: all 1.5s ease-in-out alternate forwards;
  }

  .box > div.pane.open.f{
    bottom: -60px;
    left: -110px;
    transform: rotate(0deg);
  }

  .box > div.pane.open.r {
    top: -60px;
    left: -110px;
    transform: rotate(0deg);
  }

  .box > div.pane.open.u {
    left: 10px;
    bottom: 145px;
    transform: rotate(0deg);
  }

  .box > div.pane.open.l {
    top: -60px;
    right: -110px;
    transform: rotate(0deg);
  }

  .box > div.pane.open.t {
    bottom: -60px;
    right: -110px;
    transform: rotate(0deg);
  }

  .box > div.pane.open.b {
    left: 10px;
    top: 145px;
    transform: rotate(0deg);
  }



  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  @keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
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
    background-color: rgba(0,0,0,0);
    animation: bgfade 1s ease-in-out forwards .5s;
  }

  @keyframes bgfade {
    from {
      background-color: rgba(0,0,0,0);
    }
    to {
      background-color: rgba(0,0,0,.4);
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
  }


  .box.open:hover, .box.open:hover div, .box.open:hover .section{
      -webkit-animation-play-state: paused !important;
      animation-play-state: paused !important;
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

</style>
