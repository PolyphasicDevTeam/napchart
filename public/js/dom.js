/**

This module handles dom event listening

Requires jQuery

**/

window.dom=(function(){
	//private
	var SAVE_BTN = document.getElementById('saveButton');
	
	//public:
	return{
		bindAddButtons:function(){
			document.getElementById('addCore').addEventListener('click',function(){
				barhandler.addBar("core");
			});

			document.getElementById('addNap').addEventListener('click',function(){
				barhandler.addBar("nap");
			});

			document.getElementById('addBusy').addEventListener('click',function(){
				barhandler.addBar("busy");
			});

			document.getElementById('removeAll').addEventListener('click',function(){
				barhandler.removeAllBars();
			});
		},

		bindRemoveButtons:function(container){
			$(container).on('click','.remove',function(){
				var classes, myClass, name, count;

				name = $(this).parent().find('[name="name"]').val();
				count = $(this).parent().find('[name="count"]').val();
				console.log(name,count)
				if(napchartCore.isSelected(name,count)){
					napchartCore.deselect(name,count);
				}
				napchartCore.removeElement(name,count);
			});
		},

		bindHoverOnFormInput:function(container){
			$(container).on('mouseenter','.inputBox',function(){
				var name = $(this).find('[name="name"]').val();
				var count = $(this).find('[name="count"]').val();
				interactCanvas.setHoverElement({
					name:name,
					count:count,
					type:'whole'
				});
				draw.drawUpdate();
			});
		},

		bindSaveButton:function(){
			$(SAVE_BTN).on('click',function(){
				var data = napchartCore.getSchedule();

				server.saveNew(data)
			})
		},

		showNavExtension:function(){
			console.log('etnhs');
			$(NAV_EXT).show();
		},

		setURL:function(chartid){
			var inputField, url;

			inputField = URL_FIELD;

			url = 'http://napchart.com/' + chartid;

			if( $(NAV_EXT).css('display') == 'none' ){
				dom.showNavExtension();
				$(inputField).animate({width:"220px"});
			}
			inputField.value = url;
		},

		setOG:function(image){
			$('meta[name=og\\:image]').attr('content', image);
		},

		startLoading:function(){
			var inputField;

			inputField = URL_FIELD;

			$(inputField).addClass('loading');
			inputField.value = 'loading';
		},

		finishLoading:function(){
			var inputField;

			inputField = URL_FIELD;

			$(inputField).removeClass('loading');
		},

		bindBackForward:function(){
			$(document).on('click','#back',function(){
				chartHistory.back();
			});

			$(document).on('click','#forward',function(){
				chartHistory.forward();
			});
		}
		
	}

}())

	




