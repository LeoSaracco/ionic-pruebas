import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  users: any = [];
  searchedUser: any;
  arrayVacio: Boolean = false;
  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {
    this.getUsers().subscribe((res) => {
      console.log('Data ---> ', res);
      this.users = res;
      this.searchedUser = this.users;
      if (this.users.length == 0) {
        this.arrayVacio = true;
      }
      console.log(this.searchedUser);
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  getUsers() {
    return this.httpClient.get('assets/files/customers.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  searchCustomer(event) {
    const text = event.target.value;
    this.searchedUser = this.users;
    if (text && text.trim() != '') {
      this.searchedUser = this.searchedUser.filter((user: any) => {
        return user.name.toLowerCase().indexOf(text.toLowerCase().trim()) > -1;
      });
    }
  }
}
