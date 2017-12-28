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
    <div class="marquee3k disco" data-speed="0.25" data-pausable="bool" id="example2">
    </div>
    <div id='todaysDate'></div>
  </div>
  <div class="social">
    <div class="twitter">
      <svgicon height="28" width="28" name="twitter"></svgicon>
    </div>
    <div class="dribble">
      <svgicon height="28" width="28" name="dribble"></svgicon>
    </div>
    <div class="instagram">
      <svgicon height="28" width="28" name="instagram"></svgicon>
    </div>
    <div class="facebook">
      <svgicon height="28" width="28" name="facebook"></svgicon>
    </div>
    <div class="github">
      <svgicon height="28" width="28" name="github"></svgicon>
    </div>
    <div class="linkedin">
      <svgicon height="28" width="28" name="linkedin"></svgicon>
    </div>
    <div class="pocket">
      <svgicon height="28" width="28" name="pocket"></svgicon>
    </div>
    <div class="soundcloud">
      <svgicon height="28" width="28" name="soundcloud"></svgicon>
    </div>
    <div id="example2"></div>
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
            console.log(document.getElementById('example2').innerHTML)
            var users = document.querySelectorAll('[data-scribe="element:screen_name"]')
            users.forEach(function (element) {
              element.innerHTML = element.innerHTML + ':'
              console.log(element.innerHTML)
            })
            Marquee3k.init()
          } else {
            setTimeout(initmarkee, 1000)
          }
        }
        initmarkee()
      },
      methods: {
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
        if (times.night.getMinutes() <= minutes) {
          document.getElementById('todaysDate').classList.add('night')
          document.getElementById('todaysDate').classList.remove('day')
        }
        if (times.dawn.getMinutes() <= minutes) {
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
  .marquee3k {
    color: white;
    font-family: Arial;
    display: inline-block;
    width: 300px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    padding: 20px;
    font-size: 14px;
    right: 0;
    font-style: italic;
  }

  .marquee3k ul {
    margin: 0;
    padding: 0;
  }
  .marquee3k li {
    display: table-cell;
    padding-right: 15px;
  }
  .marquee3k p, .marquee3k div {
    display: table-cell;
  }

  .marquee3k a {
    color: yellow;
  }

  .marquee3k a span:nth-child(2) {
    display: none;
  }
  .marquee3k .user {
    padding-right: 5px;
  }

  .marquee3k ul img {
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
</style>
