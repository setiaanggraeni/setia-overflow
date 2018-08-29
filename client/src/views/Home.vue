<template>
  <div class="home">
    <Navbars :isLogin="this.isLogin" @logout="logout"/>
    <Login/>
    <Register/>
    <div class="container">
      <div v-if="postQuestionTrue">
        <div class="row">
          <div class="col-sm-4" id="boxLeft">
            <Questions/>
          </div>
          <div class="col-sm-8" id="boxRight">
            <div v-if="questionTrue">
              <TheQuestion :commenttrue="this.commenttrue" :seen="this.seen"/>
              <EditQuestion/>
              <EditComment/>
            </div>
            <div v-else>
              <TheQuestion/>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <PostQuestion/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbars from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Questions from '@/components/Questions.vue'
import {mapState, mapActions} from 'vuex'
import TheQuestion from '@/components/TheQuestion.vue'
import PostQuestion from '@/components/PostQuestion.vue'
import EditQuestion from '@/components/EditQuestion.vue'
import EditComment from '@/components/EditComment.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    Navbars, Login, Register, Questions, TheQuestion, PostQuestion, EditQuestion, EditComment
  },
  watch: {
    isLogin (val) {
      this.isLogin = val
    },
    commenttrue (val) {
      this.commenttrue = val
    },
    seen (val) {
      this.commenttrue = val
    },
    '$route' (to, from) {
      if (!this.$route.params.id) {
        this.getAllQuestions()
      } 
    }
  },
  computed: {
    ...mapState([
      'isLogin', 'questions', 'questionTrue', 'detailsQuestion', 'commenttrue', 'postQuestionTrue', 'seen', 'rightBox'
    ]),
    isLogin: {
      get () {
        return this.$store.state.isLogin
      },
      set (val) {
        this.$store.commit('setIsLogin', val)
      }
    },
    commenttrue: {
      get () {
        return this.$store.state.commenttrue
      },
      set (val) {
        this.$store.commit('setCommentTrue', val)
      }
    },
    postQuestionTrue: {
      get () {
        return this.$store.state.postQuestionTrue
      },
      set (val) {
        this.$store.commit('setPostQuestionTrue', val)
      }
    },
    seen: {
      get () {
        return this.$store.state.seen
      },
      set (val) {
        this.$store.commit('setSeen', val)
      }
    }
  },
  created () {
    this.checkVerify()
  },
  mounted () {
    this.getAllQuestions()
    if (this.$route.params.id !== undefined) {
      this.getById(this.$route.params.id)
    }
    
  },
  methods: {
    ...mapActions([
      'logout', 'getAllQuestions', 'getById', 'checkVerify'
    ])
  }
}
</script>

<style scoped lang="scss">
  #boxLeft{
    text-align: left
  }
  .container{
    margin-top: 70px;
  }
</style>
