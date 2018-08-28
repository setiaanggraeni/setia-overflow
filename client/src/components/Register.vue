<template>
  <div>
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Form Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Enter name">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter email">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Minimum password length is 5">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="register" data-dismiss="modal">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'register',
  data () {
    return {

    }
  },
  computed: {
    ...mapState([

    ]),
    name: {
      get () {
        return this.$store.state.name
      },
      set (val) {
        this.$store.commit ('setName', val)
      }
    },
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
      'register'
    ])
  }
}
</script>

<style scoped lang="scss">
  label {
    float: left;
  }
</style>
