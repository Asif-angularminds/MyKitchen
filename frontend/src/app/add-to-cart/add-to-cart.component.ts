import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})

export class AddToCartComponent implements AfterViewInit,OnInit {
  array:any[]=[{finalTotal:0}];
  ngOnInit(){
    let arr:any[]=[]
  arr=JSON.parse(localStorage.getItem("order")!)
    for (let i = 0; i < arr.length; i++) {
      this.array[0].finalTotal=this.array[0].finalTotal+arr[i].total      
    }
    
   
  }
  displayedColumns: string[] = ['symbol', 'name', 'weight','price','sub','quentity','add','total', 'buttons'];
  displayedColumns1: string[] = ['total','buttons'];

 
  dataSource = new MatTableDataSource<any>(JSON.parse(localStorage.getItem("order")!));
  dataSource1 = new MatTableDataSource<any>(this.array);

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
sub(element:any){
  let arr:any[]=[]
  arr=JSON.parse(localStorage.getItem("order")!)
  arr.filter(obj=>{
    if(JSON.stringify(obj._id)==JSON.stringify(element._id)){
      obj.quantity--;
      obj.total=obj.quantity * obj.price;
      this.array[0].finalTotal=this.array[0].finalTotal-obj.price;
    }
  })
  
  this.dataSource = new MatTableDataSource<any>(arr);
  localStorage.setItem('order',JSON.stringify(arr))
 
  
}
add(element:any){
  let arr:any[]=[]
  arr=JSON.parse(localStorage.getItem("order")!)
  arr.filter(obj=>{
    if(JSON.stringify(obj._id)==JSON.stringify(element._id)){
      obj.quantity++;
      obj.total=obj.quantity * obj.price;
      this.array[0].finalTotal=JSON.parse(this.array[0].finalTotal)+JSON.parse(obj.price);
    }
  })
 
  this.dataSource = new MatTableDataSource<any>(arr);
  localStorage.setItem('order',JSON.stringify(arr))
 
  
}
delete(element:any){
  let arr:any[]=[]
  arr=JSON.parse(localStorage.getItem("order")!)
 arr=arr.filter(obj=>JSON.stringify(obj._id)!=JSON.stringify(element._id))
  this.dataSource = new MatTableDataSource<any>(arr);
  localStorage.setItem('order',JSON.stringify(arr))
 
  
}
}



