<template>
  <transition name="message-fade">

    <div class="message" role="alert" v-show="visible">
      <div class="v-alert__wrapper">
        <i aria-hidden="true" :class="`v-icon notranslate v-alert__icon mdi ${icon}  theme--light ${typeClass}--icon`"> </i>
        <div class="message--info">{{message}}</div>
        <div :class="`message--${typeClass}`"></div>
      </div>
    </div>

  </transition>
</template>

<script>
export default {
  name: 'message',

  data() {
    return {
      visible: false,
      duration: 2000,
      message: '',
      timer: null,
      closed: false,
      color: "",
      icon: "",
      typeClass:""
    }
  },

  watch: {
    closed(val) {
      if (val) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },

  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },

    close() {
      this.closed = true
    }
  },

  mounted() {
    // 开始定时器
    this.startTimer()
  }
}
</script>

<style scoped>
.message {

  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #FFFFFF;
  border-color: #FFFFFF;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  margin-bottom: 16px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center
}
.wrapper{
  align-items: center;
}
.message--info{
  flex: 1 1 auto;
  font-size: 16px;
  margin: 0;
  padding: 0;
}

.success--icon{
  color: #4caf50 !important;
  caret-color: #4caf50 !important;
  margin-right: 16px;
}

.message--success {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
  bottom:0;
  left: 0;
  right: 0;
  border-style: solid;
  border-width: 4px;
  content: "";
  position: absolute;
}

.message--error {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
  bottom:0;
  left: 0;
  right: 0;
  border-style: solid;
  border-width: 4px;
  content: "";
  position: absolute;
}

.error--icon{
  color: #ff5252 !important;
  caret-color: #ff5252 !important;
  margin-right: 16px;
}

</style>

