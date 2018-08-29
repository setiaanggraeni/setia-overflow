<template>
  <div>
    <div class="modal fade" id="modalEditAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Answer</label><br>
            <wysiwyg v-model="dataEditAnswer.answer"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="editAnswer(dataEditAnswer)" data-dismiss="modal">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'foreditanswer',
  computed: {
    ...mapState([
      'dataEditAnswer'
    ])
  },
  methods: {
    ...mapActions([
      'editAnswer'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
  label{
    float: left;
  }
</style>
