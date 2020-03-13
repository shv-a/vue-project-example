export default {
    isLoggedIn: state => !!state.token,
    isLabeledUser: state => state.user && state.user.label,
    userType: state => state.user &&  state.user.type ? state.user.type : null,
    userData: state => id => state.userData[id] || state.users.find(user => user.id === id)
}