<template>
  <div class="forQuestion">
    <h3>Create New Question</h3><br>
    <form>
      <div class="form-group">
        <label>Content Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Content</label><br>
        <wysiwyg v-model="theQuestion" />
      </div>
      <button type="submit" class="btn btn-primary mb-2" @click.prevent="addQuestion">Submit Question</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'postquestion',
  computed: {
    ...mapState([
    ]),
    theQuestion: {
      get () {
        return this.$store.state.theQuestion
      },
      set (val) {
        this.$store.commit('setTheQuestion', val)
      }
    },
    title: {
      get () {
        return this.$store.state.title
      },
      set (val) {
        this.$store.commit('setTitle', val)
      }
    }
  },
  methods: {
    ...mapActions([
      'addQuestion'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
  label{
    float: left;
  }
  .forQuestion{
    align-content: center
  }
</style>
