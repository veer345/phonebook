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
    this.refreshDataSource()
   })
  }
  onAdd(){
    this.openDialog(0)
 }
 openDialog(id:number) {
  let data
   if(id>0)
  data=this.phonebookData.filter(item=>item.id==id)[0]
  else
   data=0
  console.log(data)
  const dialogRef = this.dialog.open(ContactformComponent,{
    autoFocus:false,
    height:'auto',
    width:'40%' ,
    data:data
  });

  dialogRef.afterClosed().subscribe((result) => {
    if(result){
    if(result.id){
      for (var i = 0; i < this.phonebookData.length; i++) {
        if (this.phonebookData[i].id === result.id) {
          this.phonebookData[i]=result;
          break;
        }
      }
    }
    else{
    let tempId=this.phonebookData[this.phonebookData.length - 1].id
    result.id=tempId+1
    this.phonebookData.push(result)
    }
    this.refreshDataSource()
  }
     });
}
onDelete(id:number)
{ this.phonebookData=this.phonebookData.filter(item=>item.id!==id)
  this.refreshDataSource()
  alert(`Contact with ID : ${id} Deleted Successfully`)
}
onEdit(id:number)
{
  console.log(id)
 this.openDialog(id)
}
refreshDataSource(){
  this.dataSource=new MatTableDataSource(this.phonebookData)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
}
