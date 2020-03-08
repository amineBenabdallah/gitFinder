import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import {Repository} from '../../interfaces/repository';
import {Branche} from '../../interfaces/branche';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	repositories: Repository[];
	userName: string;
	error: string;

  constructor(private homeService: HomeService) { 
    }
  ngOnInit(): void {
  }
  getUserInformation(){
       if(this.userName==null || this.userName==""){
            return;
       }
       this.error=null;
  	   this.homeService.getRepositories(this.userName).subscribe((repositories:Repository[]) => {
       this.repositories=repositories.map((repo:Repository)=> {
       this.homeService.getBranches(repo.name,this.userName).subscribe((branches:Branche[])=>{
          repo.branches = branches; 
        })
        return repo;
      });
    },(err)=>{
        this.error=err;
    })
  }

}
