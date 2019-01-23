import {
  eventBus
} from 'main';
 
export const iconMixin = {
  data() {
    return {
      show: false
    }
  },
  computed: {
    mediaquery() {
      return this.$store.state.mediaquery;
    },
    userLoggedIn(){
      return this.$store.state.userLoggedIn;
    }
  },
  methods: {
    toggleLoginForm() {
      if (this.show === false){
        this.show = true;
      }
      else {
        this.show = false;
      }
      eventBus.$emit('toggleLoginForm', this.show);
    }
  }
}
