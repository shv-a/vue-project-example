<template>
    <div class="message-wrapper">
        <transition name="fade-in">
            <div class="message" v-show="globalMessage">
                {{globalMessage}}
            </div>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: "Message",
    computed: {
        ...mapState(['globalMessage'])
    },
}
</script>