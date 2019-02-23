<template>
    <div>
       <div class="clearfix">
            <banner :bannerList="bannerList"/>
            <div class="right">
              <canvas width="200" height="200"  ref="canvas"></canvas>
            </div>
        </div>
        <myscroll/>
        
        <!-- <vueMap/> -->
    </div>
	
</template>
<script>
import banner from '~/components/banner.vue'
import vueMap from '~/components/map.vue'
import myscroll from '~/components/myscroll.vue'
export default {
  components: {
    banner,vueMap,myscroll
  },
  async asyncData (app) {
    let bannerList = await app.$axios.get('/api/getBanner');
    return {
      bannerList: bannerList.data.result
    }
  },
   data () {
        return {
            timer:''
        }
  },
  beforeDestroy() {
     clearTimeout(this.timer)
  },
  mounted(){
        var canvas=this.$refs.canvas;
        var cxt=canvas.getContext("2d");
        var arr=[6,5,4,3,2,1,12,11,10,9,8,7];
        function Fn(){
            cxt.clearRect(0,0,800,500);
            var date=new Date();
            var sec=date.getSeconds();
            var min=date.getMinutes();
            var hour=date.getHours();
            hour=hour+min/60;
            hour=hour>12?hour-12:hour;
            //画表盘
            cxt.beginPath();
            cxt.arc(100,100,100,0,360,false);
            cxt.stroke();
            cxt.closePath();
            //刻度
            for(var i=0;i<60;i++){
                cxt.save();
                cxt.translate(100,100);
                cxt.rotate(i*Math.PI/30);
                cxt.beginPath();
                cxt.moveTo(0,90);
                if(i%5==0){
                    cxt.lineTo(0,70);

                }else{
                    cxt.lineTo(0,80);
                }
                cxt.stroke();
                cxt.closePath();
                cxt.restore()
            }
            cxt.beginPath();
            cxt.arc(100,100,5,0,360,false);
            cxt.fillStyle="pink";
            cxt.fill();
            cxt.closePath();
            for(var j=0;j<12;j++){
                cxt.beginPath();
                cxt.fillStyle="black";
                cxt.textAlign="center";
                cxt.textBaseline="middle";
                cxt.font="20 宋体";
                cxt.fillText(arr[j],100+60*Math.sin(j*Math.PI/6),100+60*Math.cos(j*Math.PI/6));
                cxt.closePath()
            }

            // 指针
            function fn(obj1,obj2,obj3,obj4,obj5,obj6){
                cxt.save();
                cxt.lineWidth=obj5;
                cxt.strokeStyle=obj6;
                cxt.translate(100,100);
                cxt.rotate(obj1*Math.PI/obj2);
                cxt.beginPath();
                cxt.moveTo(0,obj3);
                cxt.lineTo(0,obj4);
                cxt.stroke();
                cxt.closePath();
                if(obj1==sec){
                    cxt.beginPath();
                    cxt.arc(0,-30,3,0,360,false);
                    cxt.stroke();
                    cxt.closePath()
                }
                cxt.restore()
            }
            fn(sec,30,-50,10,2,"red");
            fn(min,30,-40,5,3,"blue");
            fn(hour,6,-30,0,3,"block");
        }
        this.timer = setInterval(Fn,800);
  },
  methods:{

  }

}
</script>
<style type="text/css" scoped>
	.right{float: left;width: 340px;height:300px;margin-left: 20px;}
	.right canvas{margin: 50px auto;display: block;}

</style>