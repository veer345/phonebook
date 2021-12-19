import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactformComponent } from '../contactform/contactform.component';
import { PhoneserviceService } from '../service/phoneservice.service';
import { Item } from './item.model';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {
  displayedColumns:string[] = ['id','firstName','lastName','phone','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Item>;
  phonebookData:Item[]
  constructor(private phoneService:PhoneserviceService,private dialog:MatDialog,) { }

  ngOnInit(): void {
    this.loadPhonebookData()
  }
  loadPhonebookData()
  {
   this.phoneService.getPhonebookData().subscribe(result=>{
     console.log(result)
    this.phonebookData=result;
    console.log(this.phonebookData)
    this.dataSource=new MatTableDataSource(this.phonebookData)
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

   })
  }
  onAdd(){
    this.openDialog(0)
 }
 openDialog(id:number) {
  let data
   if(id>0)
  data=this.phonebookData.filter(item=>item.id==id)[0]
  console.log(data)
  const dialogRef = this.dialog.open(ContactformComponent,{
    autoFocus:false,
    height:'auto',
    width:'40%' ,
    data:data
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log(result)
    let tempId=this.phonebookData[this.phonebookData.length - 1].id
    result.id=tempId+1
    this.phonebookData.push(result)
    this.dataSource=new MatTableDataSource(this.phonebookData)
     });
}
onDelete(id:number)
{ this.phonebookData=this.phonebookData.filter(item=>item.id!==id)
  this.dataSource=new MatTableDataSource(this.phonebookData)
}
onEdit(id:number)
{
  console.log(id)
 this.openDialog(id)
}
}
