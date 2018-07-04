# ng-layer

## classes

### NgxLayer

可以把NgLayer 看作是一个弹出层的factory。NgLayer能够生成五种类型的弹层，分别对应五个方法(参数具体含义请看代码注释):
* `dialog(parent:ViewContainerRef, componetType, title:string, layerState:LayerState):NgxLayerRef`，可以用自定义的ComponentClass定义对话框的内容
* `alert(msg:string, okText:string, layerState:LayerState):NgxLayerRef`，创建alert弹窗，解决原生弹窗不好看或者和网站风格不搭
* `confirm(msg:string, okText:string, cancelText:string, layerState:LayerState):NgxLayerRef`，创建alert弹窗,解决原生弹窗不好看或者和网站风格不搭
* `msg(msg:string, duration:number, align:string, msgType:string, layerState:LayerState):NgxLayerRef`，生成一个消息提示弹层
* `loading(msg:string, align:string, layerState:LayerState):NgxLayerRef`，生成一个提示加载中（等待）的弹层
```TypeScript
export class NgxLayer {
	/**
	 * open a dialog window
	 * @param parent
	 * 		the new component will be a child of parent, if parent is null,
	 *		new component will be a root component of application
	 * @param componetType
	 * 		a class for creating new component
	 * @param title
	 * 		dialog title
	 * @param layerState
	 * 		
	 * @return {NgxLayerRef}
	 */
	dialog(parent:ViewContainerRef, componetType, title:string, layerState:LayerState):NgxLayerRef
	
	/**
	 * open a alert window
	 * @param msg
	 * 		window content
	 * @param okText
	 * 		text of "ok" button
	 * @param layerState
	 * 
	 * @return {NgxLayerRef}
	 */
	alert(msg:string, okText:string, layerState:LayerState):NgxLayerRef
	
	/**
	 * open a confirm window
	 * @param msg
	 * 		window content
	 * @param okText
	 * 		text of "ok" button
	 * @param cancelText
	 * 		text of "cancel" button
	 * @param layerState
	 * 
	 * @return {NgxLayerRef}
	 */
	confirm(msg:string, okText:string, cancelText:string, layerState:LayerState):NgxLayerRef
	
	/**
	 * open a msg layer
	 * @param msg
	 * 		tip message content
	 * @param duration
	 * 		automatic closed after duration(ms)
	 * @param align
	 * 		position of the layer("top", "center", "bottom"), default to "top"
	 * @param msgType
	 * 		"msg", "error" or "warn", different types have different styles
	 * @param layerState
	 * 
	 * @return {NgxLayerRef}
	 */
	msg(msg:string, duration:number, align:string, msgType:string, layerState:LayerState):NgxLayerRef
	
	/**
	 * open a loading layer
	 * @param msg
	 * 		tip message content
	 * @param align
	 * 		position of the layer("top", "center", "bottom"), default to "top"
	 * @param layerState
	 * 
	 * @return {NgxLayerRef}
	 */
	loading(msg:string, align:string, layerState:LayerState):NgxLayerRef
}
```
<br />
### NgxLayerRef
NgxLayerRef 是对弹出层的一个引用，通过这个引用，可以对弹出层进行操作或者指定事件的回调函数
包含如下方法(参数具体含义请看代码注释):
* close():void，关闭弹层，使用于所有类型的弹出层
* setTitle(title:string):NgLayerRef，设置弹窗的标题，只适用于dialog
* setOnClose(callBack):NgLayerRef，设置弹层被关闭时候的回调函数
* setOkText(ok:string):NgLayerRef，更改“确定”按钮的文本
* setCancelText(cancel:string):NgLayerRef，更改“取消”按钮的文本
* ok(okCallback):NgLayerRef，设置弹层“确定”按钮被点击时的回调函数
* cancel(cancelCallback):NgLayerRef，设置弹层“取消”按钮被点击时的回调函数


```TypeScript
export class NgxLayerRef {
	/**
	 * destory the layer.
	 */
	close():void
	
	/**
	 * update dialog title. for dialog only
	 * 
	 * @return {NgxLayerRef}
	 */
	setTitle(title:string):NgxLayerRef
	
	/**
	 * if the callBack return ture, the layer will be closed
	 * 
	 * e.g.
	 * let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 * lyRef.setOnClose(()=>{
	 * 	if(...) return true;
	 * });
	 *
	 * @return {NgxLayerRef}
	 */
	setOnClose(callBack):NgxLayerRef
	
	/**
	 * update "ok" button text, for alert layer or confirm layer
	 * 
	 * e.g.
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.setOkText("sure");
	 *
	 * @return {NgxLayerRef}
	 */
	setOkText(ok:string):NgxLayerRef
	
	/**
	 * update "cancel" button text, for confirm layer only
	 * 
	 * e.g.
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.setCancelText("not sure");
	 * 
	 * @return {NgxLayerRef}
	 */
	setCancelText(cancel:string):NgxLayerRef
	
	/**
	 * okCallback called on 'ok' button click. for alert layer or confirm layer
	 * 
	 * e.g.
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.ok(()=>{
	 * 	...do something...
	 * });
	 * 
	 * @return {NgxLayerRef}
	 */
	ok(okCallback):NgxLayerRef
	
	/**
	 * cancelCallback called on "cancel" button click. for confirm layer only
	 * 
	 * e.g.
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.ok(()=>{
	 * 	...do something...
	 * });
	 * 
	 * @return {NgxLayerRef}
	 */
	cancel(cancelCallback):NgxLayerRef
}
```

### LayerState
LayerState 用以配置弹层弹出和关闭时候的转场效果，实际上就是制定两个class选择器:inSelector和outSelector。
当弹出时inSelector被添加到弹层元素上，当关闭时outSelector被添加到弹层元素上。这两个属性可以是任意的合法class选择器，
只要给这些选择器添加上你想要的动画效果就可以了
* `inSelector`
* `outSelector`

```TypeScript
class LayerState {
	/**
	 * 
	 */
	inSelector:string;
	
	/**
	 * 
	 */
	outSelector:string;
}
```

##demo code
talk is cheape, show you my code
```TypeScript
import {Component,NgModule,ViewContainerRef} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgxLayer, NgxLayerRef} from "src/ng-layer.ts";

class DataShare {}

@Component({
	selector: '.app',
	templateUrl: 'temp/app.html',
	providers: [NgxLayer, DataShare]
})
export class AppComponent {
	constructor(private ly:NgxLayer,private vcRef:ViewContainerRef, private data:DataShare) {
		data.name = "水牛叔叔";
	}

	dialog() {
		// dynamic component class
		@Component({templateUrl: "temp/dialog.html"})
		class DialogComponet {
		
			constructor(private ly:NgxLayerRef, private data:DataShare){}
			
			edit(){this.ly.setTitle("新的标题");}
			
			close(){this.ly.close();}
		}
		
		/**
		 * if parent is provided,
		 * the new component will be a child of parent component
		 */
		let dialog = this.ly.dialog(this.vcRef, DialogComponet, null, {
			inSelector:"rollIn",
			outSelector:"rollOut"
		});
	}
	
	alert(){
		let alert = this.ly.alert("你没有达到借钱标准", "明白!", {
			inSelector:"splat",
			outSelector:"boingOut"
		});
			
		alert.ok(()=> return true;);
	}
	
	confirm(){
		let confirm = this.ly.confirm("删除无法恢复,请考虑清楚", "确定", "取消", {
			inSelector:"dropDown",
			outSelector:"boingOut"
		});
		
		confirm
			.ok(()=> return true;)
			.cancel(()=> return true;);
	}
	
	loading(){
		let loading = this.ly.loading("加载中...", "center");
		setTimeout(()=>loading.close(), 2000);
		
	}
	
	msg(){
		let msg = this.ly.msg("保存成功", 1000, "top", "warn");
	}
}

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers:[DataShare]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
```
##code is cheape, here is demo