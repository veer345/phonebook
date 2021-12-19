import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contactForm: FormGroup;
  constructor( public dialogRef: MatDialogRef<ContactformComponent>,
    @Inject(MAT_DIALOG_DATA)
    public itemId:any,
    private formBuilder: FormBuilder) { }
  errMsg={
  'firstName':'Please Enter First Name',
  'lastName':'Please Enter Last Name',
  'phone':'Please Emter Phone Number'
}
ngOnInit(): void {
  this.contactForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["",Validators.required],
    phone: ["",Validators.required]
  });
  if(this.itemId)
  {
      this.contactForm.patchValue({
        id:this.itemId.id,
        firstName: this.itemId.firstName,
        lastName:this.itemId.lastName,
        phone:this.itemId.phone,
        })
  }
}
onClose()
{
  this.dialogRef.close();
}
onAdd(){
  if(this.contactForm.valid){
   let contactData=this.contactForm.value
   this.dialogRef.close(contactData)
 }
 else{
  this.validateAllFormFields(this.contactForm);
   alert('Please fill form correctly')
 }
}
onEdit(){
  
  if(this.contactForm.pristine)
  {
    alert('Please Edit form First')
  }
  else{
    if(this.contactForm.valid){
  // this.itemData=this.contactForm.value
  // this.inventoryService.updateInventoryData(this.itemId,this.itemData).subscribe((result)=>{
  //   this.dialogRef.close('updated');
  // },(error) => {
  //   console.log('Failed! Error occurred while Edting a Item.', error);
  // })
 }
 else{
  this.validateAllFormFields(this.contactForm);
   alert('Please fill form correctly')
 }
}
}
validateAllFormFields(form: FormGroup) {
  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}
get controls() {
  return this.contactForm.controls;
}
}
