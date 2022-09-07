<template>
  <div class="custom-header">
    <span class="custom-header__text">{{title}}</span>
  </div>
</template>

<script>
export default {
    props:[
        'title'
    ]
}
</script>

<style lang="scss" scoped>
.custom-header{
    display: flex;
    align-items: center;
    padding-left: 32px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.28);
    width: 100vw;
    height: 100px;

    &__text{
        text-transform: uppercase;
        color: #000000;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 36px;
    }
}
</style>