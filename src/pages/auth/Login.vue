<template>
  <div class="column justify-center items-center wrapper">
    <div class="container-form bg-grey-2 q-pa-xl ">
      <h4 class="text-primary text-center text-weight-bold">Administrative Login</h4>
      <q-input
        type="email"
        filled
        v-model="data.email"
        label="Email address"
        :rules="[val => !!val || 'Field is required']"
      />
      <q-input class="q-pb-xl" v-model="data.password" filled :type="data.isPwd ? 'password' : 'text'" label="Password"
               :rules="[val => !!val || 'Field is required']">
        <template v-slot:append>
          <q-icon
            :name="data.isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="data.isPwd = !data.isPwd"
          />
        </template>
      </q-input>
      <!--      <q-input outlined v-model="password" label="Password" class="q-pb-xl"/>-->
      <p v-if="errorsDetail" class="text-negative text-center ">{{ errorsDetail.message }}</p>
      <div class="row justify-center items-center q-gutter-x-md">
        <q-btn color="white" text-color="black" label="Login" v-on:click="login(data),$q.notify('Logging in')"/>
      </div>
<!--      <span v-if="errorsDetail">-->
<!--        {{errorsDetail}}-->
<!--      </span>-->
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters("auth",{
      errorsDetail: "errors"
    })
  },
  data() {
    return {
      data: {
        email: "",
        password: "",
        isPwd: true,
      },
    };
  },

  methods: {
    login(data) {
      console.log();
      this.$store.dispatch("auth/login", data);
      // this.$q.notify("logging in");
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
}

.container-form {
  min-width: 600px;
}

</style>
