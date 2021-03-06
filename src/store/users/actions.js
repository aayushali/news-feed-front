import {axiosInstance} from "boot/axios";
import {Loading, Notify} from 'quasar';

const FETCH_USERS = "/api/auth/users";
const CREATE_USERS = "/api/auth/store";
const DELETE_USER = "/api/auth/user_delete/";
const UPDATE_USER = "/api/auth/user_update/";
let actions = {
  fetch_users({commit}) {
    Loading.show({
      message: 'Loading Users List'
    });
    axiosInstance.get(FETCH_USERS)
      .then(res => {
        commit('FETCH_USERS', res.data.data);
        Loading.hide();
      })
      .catch(error => {
          commit('RECORD_ERRORS', error.response.data.errors);
        Loading.hide();
      });
  },
  create_user({commit}, user) {
    Loading.show({
      message: 'Creating New User...'
    });
    axiosInstance.post(CREATE_USERS, user)
      .then(res => {
        commit("CREATE_USER", res.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'User created.',
          position: 'bottom-right'
        });

      }).catch(error => {
      if (error.message.status === 422) {
        commit('RECORD_ERRORS', error.response.data.errors);
      }
      Loading.hide();
    });
  },
  delete_user({commit}, id) {
    Loading.show({
      message: 'Deleting User...'
    });
    axiosInstance.get(`${DELETE_USER}${id}`)
      .then(res => {
         commit("DELETE_USER", id);
        Loading.hide();
        Notify.create({
          type: 'negative',
          message: 'User deleted successfully.',
          position: 'bottom-right'
        });
      }).catch(error => {
      if (error.message.status === 422) {
        commit('RECORD_ERRORS', error.response.data.errors);
      }
      Loading.hide();
    });
  },
  update_user({commit}, [data, id]){
    Loading.show({
      message: 'Updating post...'
    });
    axiosInstance.post(`${UPDATE_USER}${id}`, data)
      .then( res => {
        commit("UPDATE_USER", res.data.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'User updated successfully',
          position: 'bottom-right'
        });
      }).catch( error => {
        console.log(error);
        Loading.hide();
    });
  }
};
export default actions;
