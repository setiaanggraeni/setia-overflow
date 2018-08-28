import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import swal from 'sweetalert'
var baseUrl = 'http://localhost:3000'

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
    seen: false
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
          this.state.isLogin = false
          this.state.commenttrue = true
          this.state.seen = true
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
          this.state.isLogin = false
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    logout (context) {
      localStorage.clear()
      this.state.isLogin = true
      this.state.commenttrue = false
      this.state.seen = false
    },
    getAllQuestions (context) {
      axios.get(baseUrl + '/questions')
        .then(questions => {
          context.commit('setGetAllQuestions', questions.data)
          // console.log('di store=====', this.state.questions)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getById (context, payload) {
      axios.get(baseUrl + `/questions/find/${payload}`)
        .then(question => {
          context.commit('setGetById', question.data)
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
      axios.post(baseUrl + `/questions/delete/${payload}`, {}, {
        headers: {
          token: token
        }
      })
        .then(commentDel => {
          console.log('Question deleted!')
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
          console.log('thank you for the comment')
          this.state.inputComment = ''
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    },
    deleteComment (context, payload) {
      let token = localStorage.getItem('token')
      axios.post(baseUrl + `/answers/delete/${payload}`, {}, {
        headers: {
          token: token
        }
      })
        .then(commentDel => {
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
          swal('Posted!', 'Thank you for submitting question!', 'success')
        })
        .catch(err => {
          swal('Ups!', err.response.data.message, 'warning')
        })
    }
  }
})
