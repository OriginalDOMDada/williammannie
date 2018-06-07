<template>
  <main class="blog" :class="{ 'blog--reading': this.post }">
    <blog-nav :content="content" :filters="filters" :navs="navs"/>
    <h1 class="blog-title">Bill's Bulletin</h1>
    <span class="blog-tagline">Kinda Sorta Useful Information</span>
    <blog-feed :filters="filters"/>
    <blog-post :post="post"/>
    <a class="wm-home-link" href="/#">
      <svgicon class="home-logo" name="logo" height="50" width="50" :original="true"></svgicon>
    </a>
    <blog-footer/>
  </main>
</template>

<script>
import BlogNav from './BlogNav'
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'
import BlogFooter from './BlogFooter'

export default {
  name: 'blog',
  components: { BlogNav, BlogFeed, BlogPost, BlogFooter },
  resource: 'Blog',
  props: {
    post: String,
    author: String
  },

  data () {
    return {
      navs: 0,
      title: '',
      labels: {
        post: '',
        author: ''
      }
    }
  },

  computed: {
    content () {
      return { title: this.title, labels: this.labels }
    },
    filters () {
      let filters = {}

      if (this.post) filters.post = this.post
      if (this.author) filters.author = this.author

      return filters
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },

  beforeMount () {
    this.$getResource('blog')
  }
}
</script>

<style>
  main.blog {
    height: calc(100% - 50px);
    width: 100%;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    border: none;
    font: normal 100%/normal Arial, Helvetica, sans-serif;
    color: rgba(255,255,255,1);
    -o-text-overflow: clip;
    text-overflow: clip;
    background: -webkit-linear-gradient(90deg, rgba(0,0,0,0.05) 0, #FFFFFF 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 100%), -webkit-linear-gradient(0deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 100%), -webkit-linear-gradient(90deg, rgba(0,0,0,0.05) 0, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), -webkit-linear-gradient(0deg, rgba(0,0,0,0.05) 0, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), rgba(255,255,255,1);
    background: -moz-linear-gradient(0deg, rgba(0,0,0,0.05) 0, #FFFFFF 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 100%), -moz-linear-gradient(90deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 100%), -moz-linear-gradient(0deg, rgba(0,0,0,0.05) 0, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), -moz-linear-gradient(90deg, rgba(0,0,0,0.05) 0, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), rgba(255,255,255,1);
    background: linear-gradient(0deg, rgba(0,0,0,0.05) 0, #FFFFFF 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 100%), linear-gradient(0deg, rgba(0,0,0,0.05) 0, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0.05) 0, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), rgba(255,255,255,1);
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    -webkit-background-origin: padding-box;
    background-origin: padding-box;
    -webkit-background-clip: border-box;
    background-clip: border-box;
    -webkit-background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    position: fixed;
    z-index: 200;
    overflow-y: scroll;
    top: 0;
    margin: 50px 0;
  }
  main.blog ul {
    max-width: 750px;
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    padding: 10px 55px;
  }
  main.blog li {
    height: auto;
    width: 100%;
    margin: 10px auto;
    /* border: 2px solid black; */
    background-color: transparent;
    list-style-type: none;
    padding: 0em;
    overflow: hidden;
    position: relative;
  }
  main.blog li:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 16px 16px 0;
    border-style: solid;
    border-color: rgba(255,255,255,1) rgba(255,255,255,1) #000 #000;
    background: #000;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.05);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.05);
    box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.05);
    /* Firefox 3.0 damage limitation */
    display: block; width: 0;
    overflow: visible;
  }
  .preview__figure {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border: 2px solid black;
    background-color: white;
  }
  h1 {
    color: blue;
    font-size: 3em;
    text-align: center;
    font-family: Georgia;
  }
  .wm-home-link {
    position: fixed;
    bottom: 20px;
    left: 50px;
  }
  .blog-title {
    width: 100%;
    /* background-color: white; */
  }
  .blog-tagline {
    color: blue;
    font-size: 12px;
    text-align: center;
    width: 100%;
    height: auto;
    display: inline-block;
    /* background-color: white;
    border-top: 2px solid blue;
    border-bottom: 2px solid blue; */
  }

</style>
