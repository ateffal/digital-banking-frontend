import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './accounts.css'
})
export class Accounts implements OnInit {

    accountFormGroup!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.accountFormGroup = this.fb.group({
          accountId:this.fb.control('')
        })
    }


  handleSearchAccount() {

  }
}
