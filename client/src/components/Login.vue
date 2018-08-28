<template>
  <div>
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Form Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter email">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Enter password">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="login" data-dismiss="modal">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'login',
  computed: {
    ...mapState([

    ]),
    email: {
      get () {
        return this.$store.state.email
      },
      set (val) {
        this.$store.commit ('setEmail', val)
      }
    },
    password: {
      get () {
        return this.$store.state.password
      },
      set (val) {
        this.$store.commit ('setPassword', val)
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ])
  }
}
</script>

<style scoped lang="scss">
  label {
    float: left;
  }
</style>
