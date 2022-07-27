import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { json } from 'express';
import { ToastrService } from 'ngx-toastr';
import { ViewDishComponent } from '../view-dish/view-dish.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../services/user.service';
import { ViewCommentComponent } from '../view-comment/view-comment.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // encapsulation: ViewEncapsulation.None,

})


export class HomeComponent implements OnInit {
  feed:any[]=[]
  dishs:any[]=[]
  imgUrl:any
  color: ThemePalette="accent"
  imgIterate:number[]=[]
  currentUser:any;
  temp:any[]=[]
    constructor(public dialog: MatDialog,private toastr: ToastrService,private userService:UserService) { }

    @ViewChild("order") order!: HTMLElement;
  ngOnInit(): void {
this.userService.getDish().subscribe(data=>{
  console.log(data.results);
  this.dishs=data.results;
  this.dishs.forEach((a: any) => {
    Object.assign(a, { quantity: 1, total: a.price });
  });
  this.temp=this.dishs
})
    this.userService.getMessage().subscribe(data=>{
if(data=='order'){
 let element = document.getElementById('order') as HTMLElement;
 element.scrollIntoView({behavior: 'smooth'})
}
if(data=='home'){
  // let element = document.getElementById('home') as HTMLElement;
  // element.scrollIntoView({behavior: 'smooth'})
  window.scroll(0,0); 
}
  
  
  });
    this.feed=[
      {
        path:"../../../assets/images/bannerKitchen.png",
      },
      {
        path:"../../../assets/images/bannerKitchen2.png",
      },
      {
        path:"../../../assets/images/banner.png",
      },
      {
        path:"../../../assets/images/banner1.jpg",
      },

      {
        path:"../../../assets/images/banner2.jpg",
      },
      {
        path:"../../../assets/images/banner3.jpg",
      }
    ]
  }
  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
  scroll(el: HTMLElement) {
    // el.scrollIntoView();
    console.log(el);
    
    el.scrollIntoView({behavior: 'smooth'});
}
 a:any[]=[]
addToCart(dish:any){
  this.a=JSON.parse(localStorage.getItem("order")!);
   (this.a==null)?this.a=[]:"";
  
   
   (this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)).length>0)?
this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)?obj.quantity++:""):this.a.push(dish);

(this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)).length>0)?
this.a.filter((obj)=>JSON.stringify(obj._id)==JSON.stringify(dish._id)?obj.total=obj.quantity*obj.price:""):"";
 
   
     
  localStorage.setItem("order",JSON.stringify(this.a))
  this.userService.sendMessage("order")

}
openDialog(feed:any) {
  const dialogRef = this.dialog.open(ViewDishComponent, {
    data: { name: feed },
    backdropClass: "bdrop"
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
filter(event:any){
  console.log(event.value);
  if(event.value=='veg')
  {
    this.dishs=this.temp.filter(res=>res.type==event.value);
 }
  else if(event.value=='non-veg')
  this.dishs=this.temp.filter(res=>res.type==event.value);
  else
  this.dishs=this.temp;
}
}
 