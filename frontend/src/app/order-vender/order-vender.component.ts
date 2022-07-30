import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AddDishFormComponent } from '../add-dish-form/add-dish-form.component';


@Component({
  selector: 'app-order-vender',
  templateUrl: './order-vender.component.html',
  styleUrls: ['./order-vender.component.scss']
})
export class OrderVenderComponent implements AfterViewInit,OnInit {
  currentUser:any
   orders:any[]=[]
   dataSource: any
  constructor(private toastr: ToastrService,public dialog: MatDialog, private userService: UserService)
  { 
    
  }
  ngOnInit(){
    (localStorage.getItem("currentUser"))?this.currentUser=JSON.parse(localStorage.getItem("currentUser")!):"";
   this.userService.getOrder().subscribe(data=>{
    
    this.orders=data.results;
    console.log(this.orders);
    this.orders=this.orders.map((obj:any)=>{
      return ({
        ...obj,
        dishs: obj.dishs.filter((dish:any) => dish._vender._id === this.currentUser._id) 
      })
     });
     console.log(this.orders);
   this.dataSource = new MatTableDataSource<any>(this.orders);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   })

  
  }
  displayedColumns: string[] = [ 'transactionId', 'dishs', 'finalTotal','status'];
  

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



