import axios from "@/plugins/axios";
import {apiUrls} from "@/config/constants";

export default {
    login({commit}, loginData) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios.post(apiUrls.user.LOGIN, loginData.user)
                .then(resp => {
                    const user = resp.data.body;
                    const token = user.token;

                    commit('auth_success', {token, user});
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error');
                    reject(err)
                })
        })
    },
    register({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios.post(apiUrls.label.REGISTER, user)
                .then(resp => {
                    const user = resp.data.body;
                    const token = user.token;
                    commit('users', []);
                    commit('auth_success', {token, user});
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err);
                    reject(err)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit('logout');
            resolve()
        })
    },
    getStatisticsStatic({commit, state}) {
        return new Promise((resolve, reject) => {
            if (state.statistics) {
                resolve(state.statistics)
            } else {
                axios.post(apiUrls.statistics.LIST)
                    .then(resp => {
                        if (resp.data.status) {
                            commit('stations', resp.data.body.list);
                            resolve(resp.data.body.list);
                        }
                    })
                    .catch(error => reject(error))
            }
        })
    },
    getUsersDynamic({commit}, params) {
        return new Promise((resolve, reject) => {
            axios.post(apiUrls.user.LIST, params)
                .then(resp => {
                    if (resp.data.status) {
                        commit('artists', resp.data.body.list);
                        resolve(resp.data.body.list);
                    }
                })
                .catch(error => reject(error))
        })
    },
    serverError({commit}, error) {
        commit('serverError', error);
    }
}