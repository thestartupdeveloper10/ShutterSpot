"use client";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"


const UserRegister = () => {
    const FormSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        email: z.string().email()
      })
      const form = useForm({resolver: zodResolver(FormSchema),defaultValues: {username: "",},})
    return ( 
        <div className="md:pt-20 md:items-center w-full h-[100dvh]">
          
            <Form {...form}>
      <form  className="w-[350px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute glass  py-10 rounded-md space-y-6 flex items-center justify-center flex-col">
      <h3 className="text-4xl md:text-4xl text-center font-semibold">
        Register
        </h3>
        <div>
        
        </div>
     <div className="w-[300px]">
     <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
                  <FormControl className='h-14 text-[15px] rounded-3xl'>
                      <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
             )}
            />
     </div>
        <div className="w-[300px]">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
                  <FormControl className='h-14 text-[15px] rounded-3xl'>
                      <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
             )}
            />
        </div>
        <div className="flex justify-end w-[300px]">
            <h4 className="">Forgot Password?</h4>
        </div>
       <div className="bg-blue-500 w-[300px] h-14 flex justify-center items-center text-[15px] rounded-3xl">
       <Button type="submit">Register</Button>
       </div>
       <div>
        <h4>Have an account?<span><Link to="/login">Login</Link></span></h4>
       </div>
      </form>
    </Form>
        </div>
     );
}
 
export default UserRegister;