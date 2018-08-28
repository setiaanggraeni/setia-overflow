<template>
  <div>
    <h3 class="font-italic">Questions</h3>
    <hr>
      <ul class="list-unstyled" v-for="(question, index) in questions" :key="index">
        <li class="media">
          <div class="row">
          <div class="col-sm-8" id="boxTextContent">
            <!-- <div class="media-body"> -->
              <div id="posted">Posted by: {{question.userId.name}}, {{(question.createdAt).slice(0,10)}}</div>
              <router-link :to="{name: 'detailQuestion', params: {id: question._id}}" class="mt-0 mb-1" @click.native="getById(question._id)">{{question.title}}</router-link>
              <p class="font-italic"> {{question.question}}</p>
            <!-- </div> -->
          </div>
          <div v-if="edittrue">
            <i class="far fa-edit" @click="editQuestion(question)"></i> ||
            <i class="far fa-trash-alt" @click="deleteQuestion(question._id)"></i>
          </div>
          <div v-else>
          </div>
          </div>
        </li>
        <hr>
      </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'questions',
  props: [],
  computed: {
    ...mapState([
      'questions', 'edittrue'
    ])
  },
  methods: {
    ...mapActions([
      'editQuestion', 'deleteQuestion', 'detailQuestion', 'getById'
    ])
  }
}
</script>

<style scoped lang="scss">
  #boxTextContent{
    text-align: justify;
  }
  #posted{
    color: gray;
    font-size: 10px;
    font-style: italic;
  }
</style>
