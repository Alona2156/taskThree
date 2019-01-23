export const gridSupport = {
  data(){
    return{
      grid: 0
    }
  },
  created(){
    var body = document.getElementsByTagName("body")[0];
    if (typeof body.style.grid === "string"){
      this.grid = 1;
    }
    else {
      grid = 0;
    }
  }
}
