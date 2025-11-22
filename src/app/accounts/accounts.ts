import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountsService} from '../services/accountsService';
import {catchError, Observable, throwError} from 'rxjs';
import {AccountDetails} from '../model/account.model';
import {AsyncPipe, DatePipe, DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    DecimalPipe,
    NgForOf,
    DatePipe,
    NgClass,
    //JsonPipe
  ],
  styleUrl: './accounts.css'
})
export class Accounts implements OnInit {

    currentPage : number = 0;
    pageSize : number   = 5;
    accountObservable! : Observable<AccountDetails>;
    accountFormGroup!: FormGroup;
    operationFormGroup!: FormGroup;
    errorMessage! : string;

    constructor(private fb: FormBuilder, private accountService: AccountsService) {}

    ngOnInit(): void {
        this.accountFormGroup = this.fb.group({
          accountId:this.fb.control('')
        });

        this.operationFormGroup = this.fb.group({
          operationType : this.fb.control(null),
          amount : this.fb.control(0),
          description : this.fb.control(null),
          accountDestination : this.fb.control(null),
        })


    }


  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
          return throwError(err);
      })
    );

  }

  gotoPage(page: number) {

      this.currentPage = page;
      this.handleSearchAccount();

  }

  handleAccountOperation() {

      let accountId : string = this.accountFormGroup.value.accountId;
      let operationType = this.operationFormGroup.value.operationType;
      let amount:number = this.operationFormGroup.value.amount;
      let description:string = this.operationFormGroup.value.description;
      let accountDestination:string = this.operationFormGroup.value.accountDestination;



      if(operationType=='DEBIT') {

        this.accountService.debit(accountId, amount, description).subscribe({
          next: (data) => {
            alert(alert("Successfully debit"));
            // vider le formulaire
            this.operationFormGroup.reset();
            this.handleSearchAccount()
          },
          error: (err) => {console.log(err)}
        });

      } else if(operationType=='CREDIT') {

        this.accountService.credit(accountId, amount, description).subscribe({
          next: (data) => {
            alert(alert("Successfully credit"));
            // vider le formulaire
            this.operationFormGroup.reset();
            this.handleSearchAccount()
          },
          error: (err) => {console.log(err)}
        });


      } else if(operationType=='TRANSFER') {

        this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
          next: (data) => {
            alert(alert("Successfully transfer"));
            // vider le formulaire
            this.operationFormGroup.reset();
            this.handleSearchAccount()
          },
          error: (err) => {console.log(err)}
        });

      }
      // vider le formulaire
      this.operationFormGroup.reset();
  }
}
