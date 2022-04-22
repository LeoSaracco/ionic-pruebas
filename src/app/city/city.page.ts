import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  id: any;
  cities: any = [];
  name: string;
  img: string;
  desc: string;
  constructor(
    private activateRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.getCities().subscribe((res) => {
      this.cities = res[this.id - 1];
      this.name = this.cities.name;
      this.img = this.cities.image;
      this.desc = this.cities.desc;
    });
  }

  getCities() {
    return this.httpClient.get('assets/files/cities.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
