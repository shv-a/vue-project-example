export default {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, {token, user}) {
        state.status = 'auth';
        state.token = token;
        state.user = user
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.user = {};
    },
    serverError(state, payload) {
        state.serverError = payload;
    }
}