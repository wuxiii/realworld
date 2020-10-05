<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="register">
              Need an account
            </nuxt-link>
            <nuxt-link v-else to="login">
              Have an account
            </nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in error">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          
          <ul class="error-messages">
            <template v-for="(value, key, Index) in error">
              <li v-for="(subvalue, subkey, i) in value" :key="subkey">
                {{ key }} {{ subvalue }} / {{ value }}, {{ key }},
                {{ Index }},{{ subkey }},{{ i }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="submit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
                minlength="4"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user"
const Cookie = process.client ? require("js-cookie") : undefined
export default {
  name: "LoginIndex",
  middleware: "noAuthenticated",
  data() {
    return {
      user: {
        // email: "12313123@31231.com",
        // password: "12313123@31231.com",
        // username: "12313123@31231.com",
        email: "test99@test99.com",
        password: "12345678",
        username: "test99@test99.com"
      },
      error: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === "login"
    }
  },
  methods: {
    async submit() {
      try {
        const res = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user })
        console.log(res)
        this.$store.commit("setUser", res.data.user)
        Cookie.set("user", res.data.user)
        this.$router.push("/")
      } catch (error) {
        this.error = error.response.data.errors
        console.dir(error)
      }
    }
  }
}
</script>

<style></style>
