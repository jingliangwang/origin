//Author:wangjingliang 
//QQ:546172171
	var updateTempe={
		init:function($this,parentTr,id){
			var inputArr=parentTr.find('input'),
				index=this.getItem($this,parentTr,id);
				this.first=inputArr[0],this.second=inputArr[1],this.third=inputArr[2],this.fourth=inputArr[3];
				this.commoAllVali($this,parentTr,index);
		},
		getItem:function($this,parentTr,id){
			var k;
			parentTr.find('input').each(function(i){
				if(id==$(this).attr('id')){				
					k=i;
				}
			});
			return k;
		},
		validateInput:function(val){
			var flag=/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(val);
			return flag;
		},
		setValueEmpty:function(obj){
			obj.val('');
		},
		setPurchaseTax:function(val,obj){//购置税
			if(val==''){
				obj.value='';		
			}else{
				obj.value=((val/1.17)*0.1).toFixed(2);	
			}
			
		},
		setTaxTotal:function(index,thisValue,inputTax,$this){		
			if(this.firstInput($this)){
				this.setPurchaseTax(thisValue,inputTax);
			}		
			this.setTotalPrice(index);
		},
		firstInput:function($this){
			return $this.attr('id').indexOf('luochejia')>-1?true:false;
		},
		setTotalPrice:function(index){//总价
			var total=0,val;
			$('#questionBody tr').each(function(i){
				if($('#questionBody tr').eq(i).find('input').size()>2&&i<8){
					val=Number(($('#questionBody tr').eq(i).find('input')[index].value||0));
					total=total+val;					
				}			
			});
			$('#questionBody tr').eq(8).find('input')[index].value=total;
		},
		commoAllVali:function($this,parentTr,index){
			var flag=this.validateInput($this.val());
			if(flag||$this.val()==''){
				switch(index) {
					case 0:this.getFirstRule($this,parentTr,index);
						break;
					case 1:this.getSecondRule($this,parentTr,index);				
						break;
					case 2:this.getThirdRule($this,parentTr,index);				
						break;
					case 3:this.getFirstRule($this,parentTr,index);			
						break;
				}
			}else{
				this.setValueEmpty($this);
			}
		},
		getFirstRule:function($this,parentTr,index){
			var thisValue=Number($this.val()),
				secondValue = Number((this.second.value||0)),
				thirdValue=Number((this.third.value||0));		

			if(((thisValue < secondValue)&& (secondValue!=0))||((thisValue > thirdValue)&& (thirdValue!=0))){
				$.dopAlert('此输入框的值应大于最低价小于最高值');
				this.setValueEmpty($this);
			}		
			this.setTaxTotal(index,thisValue,$('#questionBody tr').eq(3).find('input')[index],$this);
		},
		getSecondRule:function($this,parentTr,index){
			var thisValue=Number($this.val()),
				firstValue = Number((this.first.value||0)),
				thirdValue=Number((this.third.value||0));
				fourthValue=Number((this.fourth.value||0));
			if(((thisValue > firstValue)&& (firstValue!=0))||((thisValue > thirdValue)&& (thirdValue!=0))||((thisValue > fourthValue) && (fourthValue!=0))){
				$.dopAlert('此输入框的值应小于推荐价格与自动托底价格');
				this.setValueEmpty($this);
			}

			this.setTaxTotal(index,thisValue,$('#questionBody tr').eq(3).find('input')[index],$this);
		},
		getThirdRule:function($this,parentTr,index){
			var thisValue=Number($this.val()),
				firstValue = Number((this.first.value||0)),
				secondValue=Number((this.second.value||0));
				fourthValue=Number((this.fourth.value||0));		

			if(((thisValue < firstValue)&& (firstValue!=0))||((thisValue < secondValue)&& (secondValue!=0))||((thisValue < fourthValue) && (fourthValue!=0))){
				$.dopAlert('此输入框的值应大于推荐价格、最低价格、自动托底价格');
				this.setValueEmpty($this);
			}

			this.setTaxTotal(index,thisValue,$('#questionBody tr').eq(3).find('input')[index],$this);
		}
	};


	$('#questionBody input[type="text"]').on('change',function(){
		var $this=$(this),parentTr=$this.parents('tr'),id=$this.attr('id');
		if(parentTr.find('input').size()>2){
			updateTempe.init($this,parentTr,id);	
		}		
	});