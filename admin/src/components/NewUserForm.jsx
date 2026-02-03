import { Button, Dialog, DialogPanel, DialogTitle} from '@headlessui/react'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import Input,{Label} from "./ui/input.tsx";



//import  input from "./ui/input";

const NewUserForm = ({ isOpen, setIsOpen, close, selectedUser, getUsersList }) => {
const [formData,setFormData]=useState({
  name:"",
  email:"",
  password:""
});
useEffect(()=>{
  //if user exist
  if(selectedUser){
   setFormData({
      _id:selectedUser?._id||null,
  name:selectedUser?.name||"" ,
  email:selectedUser?.email|| "" ,
  password:"",
   });
  }
  else {
    //add user
    setFormData({
      name:"",
      email:"",
      password:"",  
    });
  }
},[selectedUser]);

const handleChange=(e)=>{
 const {name,value}=e.target;
};
  return (
    <>
      {isOpen && (
        <div className="fixed w-full min-h-screen bg-black/70 top-0 left-0">
          <Dialog open={isOpen} as="div" onClose={close}
            className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 z-10 w-full overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel className="w-full max-w-xl rounded-lg px-10 py-5
                bg-white shadow-md shadow-orange-200 border border-gray-300
                text-black">
                 
                    <div className="flex items-center justify-between">
                      <DialogTitle>
                        {selectedUser ? "Edit User" : "Add User"}
                      </DialogTitle>
                      <IoMdClose onClick={()=>setIsOpen(false)} className="text-lg hover:text-red-600 duration-300
                    cursor-pointer"/>
                    </div>
                    <div className="mt-3">
                      <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                          <Label>Enter Name </Label>
                          <Input id="name" type="text" name="name"
                          placeholder="Enter Name"                           onChange={handleChange}
                          value={formData.name}/>
                        </div>
                      </form>
                    </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  )
}
export default NewUserForm;
