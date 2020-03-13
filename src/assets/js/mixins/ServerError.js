export default {
    methods: {
        serverError(error) {
            if (typeof error === 'object' && error.response && error.response.message) {
                this.$store.dispatch('serverError', error.response.message)
            } else if (typeof error === 'string') {
                this.$store.dispatch('serverError', error)
            } else {
                this.$store.dispatch('serverError', 'server_error_default')
            }
        }
    }
};