<template>

  <div class="form">

    <slot name="header">
    </slot>

    <slot name="body">
    </slot>

    <slot name="button">
    </slot>

    <slot name="footer">
    </slot>

  </div>

</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/_colors.scss';
@import '~@/_flex-mixin.scss';

.form {
    @include flex(center, center, column);
    box-shadow: 0px 0px 5px grey;
    padding: 15px;
    border-radius: 10px;
    width: 310px;
    background-color: white;
}

</style>
