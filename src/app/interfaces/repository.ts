import { Branche } from './branche';
export interface Repository{
    fork:boolean;
    name:string;
    login:string;
    branches:Branche[];
}