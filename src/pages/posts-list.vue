<template>
    <custom-header :title="'Posts'"></custom-header>
    <div class="posts-list">
        <div class="posts-list__add-new-post">
            <n-button @click="$router.push({path:'/add'})" tertiary>
                Добавить новый пост
            </n-button>
        </div>
        <n-card @click="routeToPost(post)" class="posts-list__card" v-for="post in posts" :key="post.id"
            :title="post.title" size="large">
            <div class="posts-list__card-body">
                {{post.body}}
            </div>
            <div v-if="post.user" class="posts-list__post-author">
                {{post.user.name}}
            </div>
        </n-card>
    </div>
    <div class="posts-list__loader">
        <loader v-if="isFetch"></loader>
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
            isFetch: false
        }
    },

    created() {
        if(this.posts.length === 0){
            this.fetchPosts();
        }
    },

    methods: {
        ...mapActions([
            'setPostList',
            'setCurrPost'
        ]),
        async fetchPosts() {
            this.isFetch = true;
            let users = await axios.get('https://jsonplaceholder.typicode.com/users');
            let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
            if (posts.data && users.data) {
                posts.data.forEach(post => {
                    post.user = users.data.find(user => post.userId === user.id);
                });
                this.setPostList(posts.data);
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
            posts: 'getPostList'
        })
    }
}
</script>

<style lang="scss" scoped>
.posts-list {
    padding-top: 32px;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

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

    &__add-new-post{
        width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>