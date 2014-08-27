  /*
  生成实例：var k= new ECar.submitBefore($('#btnId'),time);
  example:调用 k.init()方法即可；返回true||false;

    $('#btnId').on('click',function(){
      event.preventDefault();
      if(k.init()){
        console.info('可以提交');
      }else{      
        console.info('不可以提交');
      }
    });

  */
  (function($,ECar){
    if(ECar.submitBefore)return;
    ECar.submitBefore=function(btn,time){
     return  new SubmitBefore(btn,time);
    }

    function SubmitBefore(btn,time){
      this.btn=btn;
      this.time=time||3000;
    }

    SubmitBefore.prototype={
      init:function(){
        if(!this.btn)return;
        var _this=this;
        if(!this.btn.data('flag')){
          this.btn.data('flag',true);
          this.flag=true;
          this.setTime(this);
        }else{
          this.flag=false;
        }
       return this.flag;
      },
      setTime:function(_this){      
        setTimeout(function(){
          _this.flag=false;          
          _this.btn.removeData("flag");          
        },_this.time);
      }
    }
  })(jQuery,window.ECar || (window.ECar = {}));                          