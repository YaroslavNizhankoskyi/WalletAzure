import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Profile;

  constructor(
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    let profileData = localStorage.getItem('profileData')
    this.profile = JSON.parse(profileData)
  }


}