<template>
    <custom-header :title="'Add post'"></custom-header>
    <div class="add-post">
        <n-input class="add-post__input" :disabled="isAddPost" v-model:value="post.title" placeholder="Title" />
        <n-input class="add-post__input" :disabled="isAddPost" v-model:value="post.body" placeholder="Body" />
        <n-button class="add-post__btn" :loading="isAddPost" @click="addNewPost" tertiary>
            Добавить
        </n-button>
    </div>
</template>

<script>
import CustomHeader from '@/components/custom-header.vue';
import { mapActions } from 'vuex';

export default {
    components: {
        CustomHeader
    },

    methods: {
        ...mapActions([
            'addPost'
        ]),
        addNewPost() {
            this.isAddPost = true;
            setTimeout(() => {
                this.post.user = {
                    id: Math.floor(Math.random() * 1000),
                    name: 'Ваше имя',
                    email: 'Ваш email'
                };
                this.addPost(this.post);
                this.isAddPost = false;
                this.post = {
                    title: '',
                    body: ''
                };
                this.$router.push({path:'/posts'})
            }, 1000);

        }
    },

    data() {
        return {
            post: {
                title: '',
                body: ''
            },
            isAddPost: false
        }
    }

}
</script>

<style lang="scss" scoped>
.add-post {
    display: flex;
    flex-direction: column;
    margin: 32px;

    &__input {
        width: 300px;
        margin-top: 16px;
    }

    &__btn {
        margin-top: 16px;
        width: 150px;
    }
}
</style>