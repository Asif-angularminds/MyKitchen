import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { json } from 'express';
import { ToastrService } from 'ngx-toastr';
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
  imgUrl:any
  imgIterate:number[]=[]
  currentUser:any;
    constructor(public dialog: MatDialog,private toastr: ToastrService,private userService:UserService) { }

    @ViewChild("order") order!: HTMLElement;
  ngOnInit(): void {

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
}