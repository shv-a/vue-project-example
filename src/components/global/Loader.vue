<template>
    <div class="loader-wrapper" v-show="loading">
        <img class="loader" src="/img/loader_light.gif" alt="">
    </div>
</template>

<script>
export default {
    name: "Loader",
    props: {
        loading: {
            required: true,
            type: Boolean
        }
    }
}
</script>