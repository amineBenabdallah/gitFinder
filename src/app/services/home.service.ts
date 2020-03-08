import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

	private clientId = environment.clientId;
	private clientSecret = environment.clientSecret;

  constructor(private http: HttpClient) {
   }


   getRepositories(userName){
   	return this.http.get("https://api.github.com/users/"+ userName + "/repos?client_id="+ this.clientId + "?client_secret="+ this.clientSecret)
   	.pipe(map((repos:any)=> {
      return repos.map((repository:any)=>{
        let repo = {
          fork:repository.fork,
          login:repository.owner.login,
          name:repository.name,
          branche:[]
        }
        return repo;
      })

   }),catchError(err=>{
   	return throwError("Username doesn't exist !");
   })
   	)
  }

   getBranches(repo,userName){
     return this.http.get("https://api.github.com/repos/"+ userName + "/"+repo+"/branches?client_id="+ this.clientId + "?client_secret="+ this.clientSecret)
   	.pipe(map((branches:any)=>{
       return branches.map((branch:any)=>{
         return {
          name:branch.name,
          sha:branch.commit.sha
        }
       })
       
     }));
   }

  
   
}
