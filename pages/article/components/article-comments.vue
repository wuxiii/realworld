<template>
  <div>
    <form class="card comment-form" @submit.prevent="submit">
      <div class="card-block">
        <textarea v-model="text"
class="form-control" placeholder="Write a comment..."
rows="3" />
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div v-for="comment in comments" :key="comment.id" class="card">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getComments, submitComments} from '@/api/article';

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章评论
      text: '',
    };
  },
  async mounted() {
    this.getComment();
    // const {data} = await getComments(this.article.slug);
    // this.comments = data.comments;
  },

  methods: {
    async submit() {
      const {status} = await submitComments({
        slug: this.article.slug,
        comment: {
          body: this.text,
        },
      });
      if (status === 200) {
        this.getComment();
        this.text = '';
      }
    },

    async getComment() {
      const {data} = await getComments(this.article.slug);
      this.comments = data.comments;
    },
  },
};
</script>
