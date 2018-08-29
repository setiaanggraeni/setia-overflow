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
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <img src="../assets/facebook.png" width="150px" id="fbicon" @click="loginFb" data-dismiss="modal"/>
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
      'login', 'loginFb'
    ]),
    onSignIn(googleUser) {
      console.log('huhu')
      var profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
  }
}
</script>

<style scoped lang="scss">
  label {
    float: left;
  }
</style>
