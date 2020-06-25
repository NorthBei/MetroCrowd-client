<template>
   <div>
    <div class="cart mx-2" :class="classNames">
      <v-skeleton-loader v-if="!level" :boilerplate="!loading" type="image"></v-skeleton-loader>
    </div>
    <div class="text-center font-weight-bold">第{{num}}車</div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    num: {
      type: Number,
      required: true
    },
    level: {
      type: String,
      default: ''
    },
    first: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames () {
      return {
        first: this.first,
        green: this.level === '1', // 舒適
        yellow: this.level === '0' || this.level === '2', // 普通
        orange: this.level === '3', // 略多
        red: this.level === '4' // 人多
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$radius: 5px;

.cart {
  &.first {
    border-radius: 0px;
    border-top-left-radius: 100% 100%;
    border-top-right-radius: $radius;
    border-bottom-right-radius: $radius;
    border-bottom-left-radius: $radius;
  }

  // red, orange, yellow, green 是vuetify原本內建的color classname
  // 我直接用vuetify內建的顏色，就不再自己定義了

  background: grey;
  overflow: hidden;
  height: 50px;
  width: 80px;
  border-radius: $radius;
}
</style>
