import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import {provider, auth} from '@/firebase.js'

var baseUrl = 'https://server-hacktiv-overflow.setiaanggraeni.co'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true,
    searchBy: '',
    email: '',
    password: '',
    name: '',
    questions: '',
    questionTrue: true,
    edittrue: false,
    detailsQuestion: '',
    commenttrue: false,
    inputComment: '',
    theQuestion: '',
    title: '',
    postQuestionTrue: true,
    dataEdit: '',
    seen: false,
    dataEditAnswer: '',
    newUser: ''
  },
  mutations: {
    setIsLogin (state, payload) {
      state.isLogin = payload
    },
    setSearchBy (state, payload) {
      state.searchBy = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setPassword (state, payload) {
      state.password = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setGetAllQuestions (state, payload) {
      state.questions = payload
    },
    setGetById (state, payload) {
      state.detailsQuestion = payload
    },
    setCommentTrue (state, payload) {
      state.commenttrue = payload
    },
    setInputComment (state, payload) {
      state.inputComment = payload
    },
    setTitle (state, payload) {
      state.title = payload
    },
    setPostQuestionTrue (state, payload) {
      state.postQuestionTrue = payload
    },
    setTheQuestion (state, payload) {
      state.theQuestion = payload
    },
    setSeen (state, payload) {
      state.seen = payload
    },
    setQuestionTrue (state, payload) {
      state.questionTrue = payload
    },
    setNewUser (state, payload) {
      state.newUser = payload
    },
    setForRightBox (state, payload) {
      state.detailsQuestion = payload
    }
  },
  actions: {
    search (context) {
      console.log(this.state.searchBy)
    },
    login (context) {
      axios.post(baseUrl + '/users/login', {
        email: this.state.email,
        password: this.state.password
      })
        .then(userLogin => {
          localStorage.setItem('token', userLogin.data.token)
          context.commit('setIsLogin', false)
          context.commit('setCommentTrue', true)
          context.commit('setSeen', true)
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    register (context) {
      axios.post(baseUrl + '/users/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
        .then(newUser => {
          localStorage.setItem('token', newUser.data.token)
          context.commit('setIsLogin', false)
          context.commit('setCommentTrue', true)
          context.commit('setSeen', true)
          context.commit('setNewUser', newUser.data.user)
          context.dispatch('sendEmail')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    logout (context) {
      localStorage.clear()
      context.commit('setIsLogin', true)
      context.commit('setCommentTrue', false)
      context.commit('setSeen', false)
    },
    getAllQuestions (context) {
      axios.get(baseUrl + '/questions')
        .then(questions => {
          context.commit('setGetAllQuestions', questions.data)
          context.commit('setForRightBox', questions.data[0])
          this.state.questionTrue = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    getById (context, payload) {
      axios.get(baseUrl + `/questions/find/${payload}`)
        .then(question => {
          context.commit('setGetById', question.data)
          this.state.questionTrue = true
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    forEdit (context, payload) {
      this.state.dataEdit = payload
    },
    editQuestion (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(baseUrl + `/questions/edit/${payload._id}`, {
        title: payload.title,
        question: payload.question
      }, {
        headers: {
          token: token
        }
      })
        .then(commentDel => {
          console.log('Question edited!')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    deleteQuestion (context, payload) {
      let token = localStorage.getItem('token')
      axios.delete(baseUrl + `/questions/delete/${payload}`, {
        headers: {
          token: token
        }
      })
        .then(commentDel => {
          console.log('Question deleted!')
          router.push('/')
          context.commit('setQuestionTrue', false)
          context.dispatch('getAllQuestions')
        })
        .catch(err => {
          console.log(err)
          swal('Ups!', 'You have no access to delete this question!', 'warning')
        })
    },
    forEditAnswer (context, payload) {
      this.state.dataEditAnswer = payload
    },
    editAnswer (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(baseUrl + `/answers/edit/${payload._id}`, {
        answer: payload.answer
      }, {
        headers: {
          token: token
        }
      })
        .then(commentDel => {
          console.log('Answer edited!')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    addComment (context, payload) {
      let token = localStorage.getItem('token')
      axios.post(baseUrl + `/answers/create/${payload}`, {
        answer: this.state.inputComment
      }, {
        headers: {
          token: token
        }
      })
        .then(newComment => {
          context.dispatch('getById', payload)
          console.log('thank you for the comment')
          this.state.inputComment = ''
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    deleteComment (context, payload) {
      let token = localStorage.getItem('token')
      axios.delete(baseUrl + `/answers/delete/${payload}`, {
        headers: {
          token: token
        }
      })
        .then(commentDel => {
          context.dispatch('getAllQuestions')
          console.log('Answer deleted!')

        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    upvoteQuestion (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(baseUrl + `/questions/upvote/${payload}`, {}, {
        headers: {
          token: token
        }
      })
        .then(upvoted => {
          context.dispatch('getById', payload)
          swal('Yeayyy!', 'Thanks for like!', 'success')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    downvoteQuestion (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(baseUrl + `/questions/downvote/${payload}`, {}, {
        headers: {
          token: token
        }
      })
        .then(upvoted => {
          context.dispatch('getById', payload)
          swal('OMG!', 'Why you downvote? Sad :(', 'warning')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    openQuestion (context) {
      this.state.postQuestionTrue = false
    },
    addQuestion (context) {
      let token = localStorage.getItem('token')
      axios.post(baseUrl + '/questions/create', {
        title: this.state.title,
        question: this.state.theQuestion
      }, {
        headers: {
          token: token
        }
      })
        .then(newQuestion => {
          this.state.title = ''
          this.state.theQuestion = ''
          // this.state.postQuestionTrue = true
          context.dispatch('getAllQuestions')
          swal('Posted!', 'Thank you for submitting question!', 'success')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    upvoteAnswer (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(baseUrl + `/answers/upvote/${payload}`, {}, {
        headers: {
          token: token
        }
      })
        .then(upvoted => {
          context.dispatch('getAllQuestions')
          swal('Yeayyy!', 'Thanks for like!', 'success')
        })
        .catch(err => {
          console.log(err)
          swal('Ups!', 'You cant vote your own answer!', 'warning')
        })
    },
    downvoteAnswer (context, payload) {
      let token = localStorage.getItem('token')
      axios.put(baseUrl + `/answers/downvote/${payload}`, {}, {
        headers: {
          token: token
        }
      })
        .then(upvoted => {
          context.dispatch('getAllQuestions')
          swal('OMG!', 'Why you downvote? Sad :(', 'warning')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    loginFb (context) {
      auth.signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken
        axios({
          method: 'POST',
          url: baseUrl + '/users/loginFb',
          data: {
            fbToken: token
          }
        })
          .then(response => {
            context.commit('setIsLogin', false)
            context.commit('setCommentTrue', true)
            context.commit('setSeen', true)
            localStorage.setItem('token', response.data.token)
          })
          .catch(err => {
            swal('Ups!', err.response.data.message, 'warning')
          })
      })
    },
    checkVerify (context) {
      let token = localStorage.getItem('token')
      axios.get(baseUrl + '/users/verify', {
        headers: {
          token: token
        }
      })
        .then(user => {
          if (user) {
            context.commit('setIsLogin', false)
            context.commit('setCommentTrue', true)
            context.commit('setSeen', true)
          }
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    sendEmail (context) {
      let token = localStorage.getItem('token')
      axios.post(baseUrl + '/users/sendmail', {
        email: this.state.newUser.email,
        name: this.state.newUser.name
      }, {
        headers: {
          token: token
        }
      })
        .then(emailSent => {
          console.log('email sent')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
