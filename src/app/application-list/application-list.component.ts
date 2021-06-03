import { Component, OnInit } from '@angular/core';
import { ApplicationlistService } from '../applicationlist.service';
import { AdminService } from '../admin.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  showImage: boolean = true;
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  applicationlist=[{
 
    name :'',
    email:'',
    phone:'',
    address:'',
    qualification:'',
    skillset:'',
    current:'',
    designation:'',
    appliedcourse:'',
    imageUrl:''
    }]
  constructor(private applicationlistService:ApplicationlistService ,private router: Router,public _AdminService:AdminService) { }

  ngOnInit(): void {
    this.applicationlistService.getApplicationlist().subscribe((data)=>{
      this.applicationlist=JSON.parse(JSON.stringify(data));
      console.log(this.applicationlist)
    })
}

  singlelist(applicationlist:any)
    {
      localStorage.setItem("id", applicationlist._id.toString());
      //  console.log(applicationlist._id);
      // const myData = localStorage.getItem("id");
      // console.log(myData);
      this.router.navigate(['/approvalform']);
    }
logoutUser()
  {
  localStorage.removeItem('token')
  this.router.navigate(['/admin'])
  }
  loggedUser()
  {
    this.router.navigate(['/admindashboard'])
  }

}
