export default {
    methods: {
        openModal(modal) {
            if (modal && this.$store.state.modals.indexOf(modal) === -1) {
                this.$store.state.modals.push(modal);
            } else {
                this.switchModal(modal, null)
            }
        },
        switchModal(to, from) {
            let fromIndex = this.$store.state.modals.indexOf(from);
            if (fromIndex !== -1) {
                this.$store.state.modals.splice(fromIndex, 1, to);
            } else {
                this.openModal(to);
            }
        },
        closeModal() {
            this.$store.state.modals.pop();
        },       
    }
};