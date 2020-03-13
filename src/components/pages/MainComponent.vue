<template>
    <main>
        <div class="hello">
            <h3>Ecosystem</h3>
            <ul>
                <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
                <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
                <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
                <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
                <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
            </ul>
        </div>
    
        <div class="example">
            <div class="dropzone dropzone_mini">
                <div class="dropzone__interface">
                    <div class="play-button" :class="{'playing': playing}" @click="togglePlay">
                        <img class="play" src="/img/play.svg" alt="">
                        <img class="pause" src="/img/pause.svg" alt="">
                        <audio ref="audio" :src="audioData" controls></audio>
                    </div>
                    <p class="dropzone__filename">{{audio ? audio.name : $t('no_file')}}</p>
                    <button class="dropzone__button">{{audio ? $t('change_file') : $t('upload_audio')}}</button>
                    <input class="file-input" type="file" ref="file" @change="onFileChange" accept="audio/*">
                </div>
            </div>
    
            <div class="audio-form">
                <div class="audio-form-col audio-form-col_img">
                    <div class="cover">
                        <div class="cover__img" :class="{'nobg': image}">
                            <img v-show="image" :src="imageData" alt="">
                            <div class="cover__button">
                                <button class="operation-btn">{{$t('upload_cover')}}</button>
                            </div>
                            <input class="file-input" type="file" ref="image" @change="onImageChange" accept="image/*">
    
                        </div>
                        <div class="cover__caption">{{$t('cover_tip')}}</div>
                    </div>
                </div>
                <div class="audio-form-col">
                    <div class="step-input step-input_full">
                        <label for="title">{{$t('name')}} <span class="highlight">({{$t('in_english')}})</span></label>
                        <input type="text" id="title" v-model="title">
                    </div>
                    <div class="step-input step-input_full">
                        <label for="descroption">{{$t('description')}}</label>
                        <input type="text" id="descroption" v-model="descroption">
                    </div>
                    <div class="step-input step-input_full step-input_row">
                        <div class="step-input step-input_30">
                            <label for="year">{{$t('year')}}</label>
                            <input type="number" id="year" v-model="year">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'MainComponent',
    props: ['id', 'submitFlag'],
    data: () => ({
        audio: '',
        audioData: '',
        audioId: '',
        image: '',
        imageData: '',
        title: '',
        year: '',
        descroption: '',
        state: 1,
        playing: false,
        uploading: false,
    }),
    watch: {
        submitFlag(newValue) {
            if (newValue) {
                if (this.state === 2) {
                    this.submit();
                } else {
                    this.state = 2;
                }

                this.$emit('submitValueChange', false);
            }
        }
    },
    methods: {
        togglePlay() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                    .then(() => {
                        this.playing = true
                    })
            } else {
                this.$refs.audio.pause();
                this.playing = false;
            }
        },
        onFileChange(ev) {
            let input = ev.target;
            if (input.files && input.files[0]) {
                this.audioData = URL.createObjectURL(input.files[0]);
            }
            this.audio = this.$refs.file.files[0];

            this.$emit('loading', true);

            let formData = new FormData();

            formData.append('artist_id', this.artistId);
            formData.append('audio', this.audio);

            this.uploading = true;

            this.$http.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.status) {
                        this.audioId = response.data.body.id;
                        this.state = 2;
                        this.$nextTick(() => {
                            this.$refs.audio.load();
                            this.$refs.audio.onended = () => {
                                this.playing = false;
                            };
                        });
                    } else {
                        this.serverError(response.data.message);
                    }
                    this.$emit('loading', false);
                    this.uploading = false;
                })
                .catch(error => {
                    this.serverError(error.responseonse.message);
                    this.$emit('loading', false);
                    this.uploading = false;
                })
        },
        onImageChange(ev) {
            let input = ev.target;
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = e => {
                    this.imageData = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
            this.image = this.$refs.image.files[0];
        },
        submit() {
            this.$emit('loading', true);

            let formData = new FormData();

            formData.append('id', this.audioId);
            formData.append('audio', this.audio);
            formData.append('image', this.image);
            formData.append('title', this.title);
            formData.append('year', this.year);

            this.$http.post('/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.status) {
                        this.$emit('success', {type: 'audio', data: response.data.body});
                    } else {
                        this.serverError(response.data.message);
                        this.$emit('loading', false);
                    }
                })
                .catch(error => {
                    this.serverError(error.responseonse.message);
                    this.$emit('loading', false);
                })
        }
    }
}
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
