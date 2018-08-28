<template>
  <div class="navbars">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand" href="/">Hacktiv-Overflow</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="openQuestion">Add Question</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" v-model="searchBy" v-on:keyup.enter="search" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="search" type="submit">Search</button>
          <div v-if="isLogin">
            <button class="btn my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#modalLogin">Login</button>
            <button class="btn my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#modalRegister">Register</button>
          </div>
          <div v-else>
            <button class="btn my-2 my-sm-0" type="submit" @click="logout">Logout</button>
          </div>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'navbars',
  props: [],
  data () {
    return {
    }
  },
  computed: {
    ...mapState([

    ]),
    isLogin: {
      get () {
        return this.$store.state.isLogin
      },
      set (val) {
        this.$store.commit('setIsLogin', val)
      }
    },
    searchBy: {
      get () {
        return this.$store.state.searchBy
      },
      set (val) {
        this.$store.commit('setSearchBy', val)
      }
    }
  },
  methods: {
    ...mapActions([
      'search', 'logout', 'openQuestion'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
