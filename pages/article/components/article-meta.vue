<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button
      v-if="article.author.username !== user.username"
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round" />
      <template v-if="article.author.following"> Follow {{ article.author.username }} </template>
      <template v-else>
        Unfollow
        {{ article.author.username }}
      </template>
    </button>

    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
    >
      <i class="ion-heart" />
      &nbsp; Favorite Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style></style>
