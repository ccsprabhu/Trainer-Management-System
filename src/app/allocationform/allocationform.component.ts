import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'
import {ApprovalService} from '../approval.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-allocationform',
  templateUrl: './allocationform.component.html',
  styleUrls: ['./allocationform.component.css']
})
export class AllocationformComponent implements OnInit {
  showImage: boolean = true;
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  constructor(private router: Router,public _AdminService:AdminService,private _ApprovalService:ApprovalService) { }
  allocationItem={
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
    
  ngOnInit(): void {
    let alloid = localStorage.getItem("alloid");
    console.log(alloid);
    this._ApprovalService.getTrainer(alloid).subscribe((data)=>{
      this.allocationItem=JSON.parse(JSON.stringify(data));
  })
  }
  allocate()
  {   
    this._ApprovalService.newAllocation(this.allocationItem);
    // console.log("Called"); 
    console.log(this.allocationItem)   
    alert("Allocated Successfully");
    this.router.navigate(['/allocatedlist']);
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
