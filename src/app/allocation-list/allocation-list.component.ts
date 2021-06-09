import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {ApprovalService} from '../approval.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.css']
})
export class AllocationListComponent implements OnInit {
  showImage: boolean = true;
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  approvedlist=[{
 
    name :'',
    email:'',
    phone:'',
    address:'',
    qualification:'',
    skillset:'',
    current:'',
    designation:'',
    appliedcourse:'',
    typemp:''
    }]
  constructor(private _ApprovalService:ApprovalService,private router: Router,public _AdminService:AdminService) { }

  ngOnInit(): void {
    this._ApprovalService.getApprovedlist().subscribe((data)=>{
      this.approvedlist=JSON.parse(JSON.stringify(data));
      console.log(this.approvedlist)
    });
    setTimeout(()=>{                       
      $('#datatableexample').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25],
        order:[[1,"desc"]]
    } );
     }, 500);
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
  single(approvedlist:any)
    {
      localStorage.setItem("alloid", approvedlist._id.toString());
      //  console.log(applicationlist._id);
      // const myData = localStorage.getItem("id");
      // console.log(myData);
      this.router.navigate(['/allocationform']);
    }
   
}
