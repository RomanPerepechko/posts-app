<template>
    <custom-header :title="'Posts'"></custom-header>
    <div class="posts-list">
        <div class="posts-list__add-new-post">
            <n-button @click="$router.push({path:'/add'})" tertiary>
                Добавить новый пост
            </n-button>
        </div>
        <div class="posts-list__filter-block">
            <div class="posts-list__input-container">
                <n-select v-model:value="currentAuthor" filterable placeholder="Выберите автора" :options="users" />
            </div>
            <div class="posts-list__input-container">
                <n-select v-model:value="typeSort" filterable placeholder="Выберите тип сортировки" :options="sorts" />
            </div>
            <n-button @click="resetFilters" tertiary>
                Сбросить фильтры
            </n-button>
        </div>
        <TransitionGroup name="posts" tag="div">
            <n-card @click="routeToPost(post)" class="posts-list__card" v-for="post in sortedPosts" :key="post.id"
                :title="post.title" size="large">
                <div class="posts-list__card-body">
                    {{post.body}}
                </div>
                <div v-if="post.user" class="posts-list__post-author">
                    {{post.user.name}}
                </div>
            </n-card>
        </TransitionGroup>
    </div>
    <div class="posts-list__loader">
        <loader v-if="isFetch"></loader>
    </div>
    <div v-if="hasError" class="posts-list__error">
        Что-то пошло не так...
    </div>
</template> 

<script>
import axios from 'axios';
import CustomHeader from '@/components/custom-header.vue';
import Loader from '@/components/loader.vue'
import { mapActions, mapGetters } from 'vuex';

export default {

    components: {
        CustomHeader,
        Loader
    },

    data() {
        return {
            hasError: false,
            isFetch: false,
            currentAuthor: '',
            typeSort: '',
            sorts: [
                { label: 'По возрастанию', value: 'asc' },
                { label: 'По убыванию', value: 'desc' },
            ]
        }
    },

    created() {
        if (this.posts.length === 0) {
            this.fetchPosts();
        }
    },

    methods: {
        ...mapActions([
            'setPostList',
            'setCurrPost',
            'setUsers'
        ]),
        resetFilters() {
            this.currentAuthor = '';
            this.typeSort = '';
        },
        async fetchPosts() {
            this.isFetch = true;
            let users = await axios.get('https://jsonplaceholder.typicode.com/users');
            let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
            if (posts.data && users.data) {
                posts.data.forEach(post => {
                    post.user = users.data.find(user => post.userId === user.id);
                });
                this.setPostList(posts.data);
                users.data.forEach(user => {
                    user.label = user.name;
                    user.value = user.id;
                })
                this.setUsers(users.data);
            } else {
                this.hasError = true;
            }
            this.isFetch = false;
        },
        routeToPost(post) {
            this.setCurrPost(post);
            this.$router.push({ path: `/post/${post.id}` });
        }
    },
    computed: {
        ...mapGetters({
            posts: 'getPostList',
            users: 'getUsers'
        }),
        sortedPosts: function () {
            let posts = JSON.parse(JSON.stringify(this.posts));
            if (this.currentAuthor !== '') {
                posts = posts.filter(post => post.user.id === this.currentAuthor);
            }
            if (this.typeSort != '') {
                if (this.typeSort === 'asc') {
                    posts.sort((pPost, nPost) => {
                        return (pPost.title.toLowerCase()).localeCompare(nPost.title.toLowerCase(), 'en');
                    });
                } else {
                    posts.sort((pPost, nPost) => {
                        return (nPost.title.toLowerCase()).localeCompare(pPost.title.toLowerCase(), 'en');
                    });
                }

            }
            return posts;
        }
    }
}
</script>

<style lang="scss" scoped>
.posts-move,
.posts-enter-active,
.posts-leave-active {
    transition: all 0.5s ease;
}

.posts-enter-from,
.posts-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.posts-leave-active {
    position: absolute;
}

.posts-list {
    padding-top: 32px;

    &__card {
        cursor: pointer;
        margin-top: 16px;
        width: 700px;
        margin-left: auto;
        margin-right: auto;
    }

    &__post-author {
        text-align: end;
        margin-top: 8px;
        font-weight: 700;
    }

    &__loader {
        display: flex;
        justify-content: center;
        height: calc(100vh - 100px);
        align-items: center;
    }

    &__add-new-post {
        width: 700px;
        margin-left: auto;
        margin-right: auto;
    }

    &__filter-block {
        width: 700px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 16px;
    }

    &__input-container {
        width: 300px;
        margin-bottom: 8px;
    }
}
</style>