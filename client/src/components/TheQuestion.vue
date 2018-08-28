<template>
  <div>
    <h3>{{detailsQuestion.title}}</h3>
    <div id="posted">Posted by: {{detailsQuestion.userId.name}}, {{(detailsQuestion.createdAt).slice(0,10)}}</div>
    <div id="content">
      {{detailsQuestion.question}}
      <br>
      <br>
      <div v-if="seen">
        <i class="far fa-thumbs-up" @click="upvoteQuestion(detailsQuestion._id)"></i>
        {{detailsQuestion.votes}}
        <i class="far fa-thumbs-down" @click="downvoteQuestion(detailsQuestion._id)"></i>
        <div id="editDelete">
          <i class="far fa-edit" @click="forEdit(detailsQuestion)" data-toggle="modal" data-target="#modalEditQuestion"></i> ||
          <i class="far fa-trash-alt" @click="deleteQuestion(detailsQuestion._id)"></i>
        </div>
      </div>
      <div v-else>
      </div>
      <hr>
      <h3>All Answers</h3>
      <div v-for="(answer, index) in detailsQuestion.answerId" v-bind:key="index">
        <div class="row">
          <div class="col-md-8" id="commentBox">
            <a id="usernameComment">{{answer.username}}</a>
            <a id="time">{{answer.createdAt.slice(0,10)}}</a>
            <br>
            {{answer.answer}}
            <br>
            <i class="far fa-trash-alt" id="deleteComment" @click="deleteComment(answer._id)"></i>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="form-group forComment" v-if="commenttrue">
      <label for="comment" style="font-size:20px;float:left">Leave an answer: </label>
      <textarea class="form-control col-md-9" v-model="inputComment" rows="3"></textarea>
      <button type="button" id="addComment" class="btn btn-success" @click="addComment(detailsQuestion._id)">Answer</button>
    </div>
    <div v-else>
      <label for="comment" style="font-size:20px;">Please login to leave a comment!</label>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'detailquestion',
  computed: {
    ...mapState([
      'detailsQuestion', 'commenttrue', 'seen'
    ]),
    inputComment: {
      get () {
        return this.$store.state.inputComment
      },
      set (val) {
        this.$store.commit('setInputComment', val)
      }
    }
  },
  methods: {
    ...mapActions([
      'addComment', 'upvoteQuestion', 'downvoteQuestion', 'deleteComment', 'deleteQuestion', 'editQuestion', 'forEdit'
    ])
  }
}
</script>

<style scoped lang="scss">
#content{
  text-align: justify;
}
#commentBox{
  margin-left:15px;
  border:1px solid grey;
  border-radius:7px;
  width:100%;
}
#time{
  font-size:12px;
  color:grey;
}
#usernameComment{
  font-size:17px;
  color:blue;
  margin-right:5px;
}
#addComment{
  float: right;
  margin-right: 20px;
}
#deleteComment{
  float: right;
  margin-bottom: 3px;
}
#posted{
  color: gray;
  font-size: 10px;
  font-style: italic;
  text-align: left
}
#editDelete{
  float: right;
}
</style>
