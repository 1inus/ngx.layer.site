import "zone.js";
import "reflect-metadata";

import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/Forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgxLayer, NgxLayerRef, NgxLayerComponent} from "../../ngx.layer";

@Component({
	selector: '.app',
	templateUrl: 'temp/app.html',
	providers: [NgxLayer]
})
export class AppComponent {
	constructor(private ly:NgxLayer) {}
	
	config:any = {
		inSelector:"fallDown",
		outSelector:"rollOut",
		title:"angular2 layer",
		align:"top",
		parent: this,
		dialogComponent:DialogComponent,
		closeAble: false
	}
	
	dialog(){
		this.ly.dialog(this.config);
	}
	
	alert(){
		this.ly.alert(this.config);
	}
	
	confirm(){
		this.ly.confirm(this.config);
	}
	
	loading(){
		let tip = this.ly.loading(this.config);
		
		setTimeout(()=>{tip.close();}, 2000)
	}
	
	tip(){
		this.ly.tip(this.config);
	}
}

/*component for dialog*/
@Component({
	selector: '.dialog',
	templateUrl: 'temp/dialog.html'
})
export class DialogComponent {
	data = "angular2 layer";
	
	constructor(private ly:NgxLayerRef, private l:NgxLayer) {}
	
	setTitle(){this.ly.setTitle("Ngx Layer Title");}
	
	close(){this.ly.close();}
	
	showCloseBtn(){this.ly.showCloseBtn(true)};
	
	showData(){alert(this.data)};
}

@NgModule({
	imports: [BrowserModule, FormsModule],
	entryComponents:[NgxLayerComponent, DialogComponent],
	declarations: [AppComponent, NgxLayerComponent, DialogComponent],
	bootstrap: [AppComponent]
})
class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);