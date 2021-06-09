import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {ApprovalService} from '../approval.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-allocatedlist',
  templateUrl: './allocatedlist.component.html',
  styleUrls: ['./allocatedlist.component.css']
})
export class AllocatedlistComponent implements OnInit {

  showImage: boolean = true;
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  allocatedlist={
    name:'',
    email:'',
    startdate :'',
    enddate:'',
    time:'',
    course:'',
    courseid:'',
    batchid:'',
    meetinglink:''
   
    }
  constructor(private _ApprovalService:ApprovalService,private router: Router,public _AdminService:AdminService) { }
  
  ngOnInit(): void {
    this._ApprovalService.getAllocatedlist().subscribe((data)=>{
      this. allocatedlist=JSON.parse(JSON.stringify(data));
      console.log(this.allocatedlist)
    });
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
