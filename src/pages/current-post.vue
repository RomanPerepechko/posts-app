<template>
    <custom-header :title="'Current post'"></custom-header>
    <div class="curr-post">
        <n-card class="curr-post__card" :title="post.title" size="large">
            <div class="curr-post__card-body">
                {{post.body}}
            </div>
        </n-card>
        <div v-if="post.user" class="curr-post__post-author">
            {{post.user.name}} | {{post.user.email}}
        </div>
        <div v-if="isFetchPost" class="curr-post__post-loader">
            <loader></loader>
        </div>
        <h2>Комментарии:</h2>
        <div class="curr-post__comments">

            <div class="curr-post__add-comment-form">
                <n-input :disabled="isAddComm" v-model:value="newCommBody" type="textarea" placeholder="Введите свой комментарий" />
                <n-button :loading="isAddComm" @click="addComm()" tertiary>
                    Добавить
                </n-button>
            </div>
            <div class="curr-post__comment-list">
                <div v-for="comm in comments" :key="comm.id" class="curr-post__comment">
                    <n-card class="curr-post__card" :title="comm.email" size="small">
                        <div class="curr-post__card-body">
                            {{comm.body}}
                        </div>
                    </n-card>
                </div>
                <div v-if="isFetchComm" class="curr-post__comm-loader">
                    <loader></loader>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Loader from '@/components/loader.vue';
import CustomHeader from '@/components/custom-header.vue';

export default {

    components:{
        Loader,
        CustomHeader
    },

    data() {
        return {
            isFetchComm: false,
            comments: [],
            isFetchPost: false,
            newCommBody: '',
            isAddComm: false
        }
    },

    mounted() {
        if(!this.post.title){
            this.fetchPost();
        }
        this.fetchComments();
    },

    methods: {
        ...mapActions([
            'setCurrPost'
        ]),
        addComm(){
            this.isAddComm = true;
            setTimeout(()=>{
                this.comments.unshift({id: Math.floor(Math.random*1000), body: this.newCommBody, email:'Ваш email'});
                this.newCommBody='';
                this.isAddComm = false;
            }, 1000)
            
        },
        async fetchComments() {
            this.isFetchComm = true;
            let comments = await axios.get('https://jsonplaceholder.typicode.com/comments');
            this.comments = comments.data.slice(0, 25);
            this.isFetchComm = false;
        },
        async fetchPost(){
            this.isFetchPost = true;
            let post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`);
            let user = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.data.userId}`)
            post.data.user = user.data;
            this.setCurrPost(post.data);
            this.isFetchPost = false;
        }
    },

    computed: {
        ...mapGetters({
            post: 'getCurrPost'
        })
    }

}
</script>

<style lang="scss" scoped>
.curr-post {
    padding: 16px;

    &__card {
        margin: 16px 0px 16px 0px;
        width: 700px;
    }

    &__card-body {}

    &__post-author {
        width: 700px;
        text-align: end;
        margin-top: 8px;
        font-weight: 700;
    }

    &__comments {
        width: 800px;
        height: auto;
        border: 1px solid rgb(239, 239, 245);
    }

    &__add-comment-form {
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        button {
            margin-top: 8px;
        }
    }

    &__comment-list{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__post-loader{
        width: 700px;
        display: flex;
        justify-content: center;
    }
}
</style>