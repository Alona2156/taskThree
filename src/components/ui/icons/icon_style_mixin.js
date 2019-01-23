export const iconStyleMixin = {
  computed: {
    iconMQ(){
      return this.mediaquery < 700 ? {top: '10px', float: 'left', left: this.left+'px'} : {right: '30px'};
    }
  }
}
