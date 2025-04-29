import {create} from 'zustand'
type UserStore = {
    _id:string;
    name:string;
    email:string;
    phoneNumber:string;
    point:number;
    created_at:Date| undefined;
    changeUser : (value:any)=> void
}
export const useUserStore = create<UserStore>((set)=>({
    _id: '',
    name:'',
    email:'',
    phoneNumber:'',
    point:0,
    created_at:undefined,
    changeUser: (value)=>{set({
        _id: value._id,
        name:value.name,
        email:value.email,
        phoneNumber:value.phoneNumber,})}
}))