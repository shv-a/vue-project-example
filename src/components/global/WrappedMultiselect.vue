<template>
    <div class="multiselect-wrapper" :class="{'open': open, 'loading': loading}">
        <multiselect v-model="model"
                     :options="items"
                     :close-on-select="options.closeOnSelect"
                     :searchable="options.searchable"
                     :clear-on-select="options.clearOnSelect"
                     :placeholder="options.placeholder"
                     :multiple="options.multiple"
                     :internal-search="!options.serverSearchOnly"
                     :selectLabel="''"
                     :deselectLabel="'×'"
                     :selectedLabel="''"
                     :trackBy="options.trackBy || 'id'"
                     :label="options.label || 'title'"
                     :loading="loading"
                     :show-no-results="!loading"
                     @search-change="debounceSearch"
                     @input="emitChange"
                     @open="onOpen"
                     @close="onClose"
        >
            <span slot="noResult">{{$t('no_results')}}</span>
            <span slot="noOptions">{{$t(options.noOptionsTextKey)}}</span>
        </multiselect>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
    name: "WrappedMultiselect",
    props: ['options', 'parent'],
    components: {
        Multiselect
    },
    data: () => ({
        model: [],
        items: [],
        loading: false,
        searchTimeout: null,
        open: false,
        query: ''
    }),
    methods: {
        debounceSearch(searchQuery) {
            this.loading = true;
            this.query = searchQuery;

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.search(searchQuery);
                clearTimeout(this.searchTimeout);
                this.searchTimeout = null;
            }, 500)
        },
        search(searchQuery) {
            if (!searchQuery) {
                this.items = [];
                this.loading = false;
                return;
            }

            let params = {};

            params[this.options.searchKey || 'query'] = searchQuery;

            this.$http[this.options.method || 'post'](this.options.src, this.options.method === 'get' ? {params: params} : params)
                .then(resp => {
                    if (resp.data.status) {
                        this.items = this.options.key ? resp.data.body[this.options.key] : resp.data.body;
                        if (typeof this.items === 'object' && !Array.isArray(this.items)) {
                            this.items = []
                        }
                        this.loading = false;
                    }
                })
                .catch(error => {
                    this.serverError(error);
                    this.loading = false;
                })
        },
        getItems() {
            this.$http[this.options.method || 'post'](this.options.src)
                .then(resp => {
                    if (resp.data.status) {
                        this.items = this.options.key ? resp.data.body[this.options.key] : resp.data.body;
                        if (typeof this.items === 'object' && !Array.isArray(this.items)) {
                            this.items = []
                        }
                        this.loading = false;
                    }
                })
                .catch(error => {
                    this.serverError(error);
                    this.loading = false;
                })
        },
        emitChange(value) {
            this.$emit('change', {value: value, parent: this.parent});
        },
        onOpen() {
            this.open = true;
        },
        onClose() {
            this.open = false;
        }
    },
    mounted() {
        if (!this.options.serverSearchOnly && this.options.src) {
            this.getItems();
        }
    }
}
</script>