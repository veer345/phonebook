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
    public contact:any,
    private formBuilder: FormBuilder) { }
  errMsg={
  'firstName':'Please Enter First Name',
  'lastName':'Please Enter Last Name',
  'phone':'Please Enter Phone Number'
}
ngOnInit(): void {
  this.contactForm = this.formBuilder.group({
    id:[null],
    firstName: ["", Validators.required],
    lastName: ["",Validators.required],
    phone: ["",[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  if(this.contact)
  {
      this.contactForm.patchValue({
        id:this.contact.id,
        firstName: this.contact.firstName,
        lastName:this.contact.lastName,
        phone:this.contact.phone,
        })
  }
}
onClose()
{
  this.dialogRef.close();
}

//Add method which return the data to phonebook component throgh dialog close method
onAdd(){
  if(this.contactForm.valid){
   let contactData=this.contactForm.value
   console.log(contactData)
   this.dialogRef.close(contactData)
   
 }
 else{
  this.validateAllFormFields(this.contactForm);
   alert('Please fill form correctly')
 }
}

//Edit method which return the data to phonebook component throgh dialog close method
  onEdit() {

    if (this.contactForm.pristine) {
      alert('Please Edit form First')
    }
    else {
      if (this.contactForm.valid) {
        let contactData = this.contactForm.value
        console.log(contactData)
        this.dialogRef.close(contactData)
      }
      else {
        this.validateAllFormFields(this.contactForm);
        alert('Please fill form correctly')
      }
    }
  }

  //validating controls
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
