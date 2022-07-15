import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewPostComponent } from 'src/app/add-new-post/add-new-post.component';
import { ChangePasswordComponent } from 'src/app/change-password/change-password.component';

import { ProfileComponent } from 'src/app/profile/profile.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
   
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog,private userService:UserService,private router:Router) { }
currrntUser:any
imageUrl=""
order:number=0
nav:any
  ngOnInit(): void {
  this.nav=this.router
  if(localStorage.getItem("order"))
  this.order=JSON.parse(localStorage.getItem("order")!).length
     this.userService.getMessage().subscribe(data=>{
    if(data=="order")this.order=JSON.parse(localStorage.getItem("order")!).length
  
    if(data=='true')this.ngOnInit();

});
    (localStorage.getItem("currentUser"))?this.currrntUser=JSON.parse(localStorage.getItem("currentUser")!):"";
    (this.currrntUser?.photo)?this.imageUrl=this.userService.imageUrl+this.currrntUser.photo:""

// this.userService.getOneUser(this.currrntUser._id).subscribe(data=>{

// })

}


  openDialog() {
    const dialogRef = this.dialog.open(ProfileComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openAddPost(){
    const dialogRef = this.dialog.open(AddNewPostComponent, { panelClass: 'custom-dialog-container' });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openSavedPost(){
    this.router.navigate(["addToCart"]);
  
  }
  openhome(){
    this.userService.sendMessage("home");
    this.router.navigate([""]);
  
     

  }
  openFeed(){
    this.router.navigate(["feed"]);
  }
  clear(){
    localStorage.clear()

    this.router.navigate(["login"])
  }
 scrollOrderNow(){
  this.userService.sendMessage("order");
 }

  }
  
