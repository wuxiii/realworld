<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link :to="{name:'home',query:{ tab: 'your_feed'}}"
                           class="nav-link"
                           :class="{
                             active:tabName==='your_feed'
                           }"
                           exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{name:'home',query:{ tab: 'global_feed'}}"
                           class="nav-link"
                           :class="{
                             active:tabName==='global_feed'
                           }"
                           exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link :to="{name:'home',query:{ tab: 'tag',tag:tag}}"
                           class="nav-link"
                           :class="{
                             active:tabName==='tag'
                           }"
                           exact
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            :key="article.slug"
            class="article-preview"
          >
            <div class="article-meta">
              <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }">
                <img :src="article.author.image">
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{ name: 'profile', params: { username: article.author.username } }"
                  class="author"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active:article.favorited}"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart" />{{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{name:'article',params:{slug:article.slug}}"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li
                v-for="numb in totalPages"
                :key="numb"
                class="page-item"
                :class="{active:numb === page}"
              >
                <nuxt-link class="page-link" :to="{name:'home',query:{page:numb,tag:$route.query.tag,tab:tabName}}">
                  {{ numb }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div v-for="tag in tags" :key="tag" class="tag-list">
              <nuxt-link
                :to="{
                  name:'home',
                  query:{
                    tag:tag,
                    tab:'tag'
                  }
                }"
                class="tag-pill tag-default"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles,getTags ,getYourFeedArticles,addFavorite,deleteFavorite} from "@/api/article"
import {requestAll} from "@/utils/request"
import { mapState } from "vuex";
export default {
  name: "Home",
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 10
    const tabName = query.tab || 'global_feed'
    const getarticleData = tabName === 'your_feed'?getYourFeedArticles:getArticles
    const [articlesData,tagsData] = await requestAll([
        getarticleData({
        limit:limit,
        offset:(page-1)*limit,
        tag:query.tag
      }),
      getTags()
    ])

    articlesData.data.articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      articles:articlesData.data.articles,
      articlesCount:articlesData.data.articlesCount,
      page,
      limit,
      tags:Array.isArray(tagsData.data.tags)?tagsData.data.tags.filter(item =>item):[],
      tag:query.tag,
      tabName:tabName
    }
  },

  computed: {
    totalPages(){
      return Math.ceil(this.articlesCount/this.limit)
    },
     ...mapState(["user"])

  },
  watchQuery:['page','tag','tab'],
  methods: {
   async onFavorite(article){
      article.favoriteDisabled = true;
      console.log('=====article===',article)

      if(!this.user){
          this.$router.push("login")
          return 
      }
      if(article.favorited){
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      }else{
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false

    }
  },
}
</script>

<style></style>
