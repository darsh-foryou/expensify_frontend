import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Logo from './shared/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/authSlice'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    // api integration
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
           dispatch(setLoading(true)); 
            const res = await axios.post("https://expensify-backend-6ls3.onrender.com/api/v1/user/register", input, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false)); 
        }
    }
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg'>
                <div className='w-full flex justify-center mb-5'>
                    <Logo />
                </div>
                <div>
                    <Label>Full Name</Label>
                    <Input
                        type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                    />
                </div>
                {
                    loading ? (
                        <Button className='w-full my-4'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-5">Signup</Button>
                    )
                }

                <p className='text-center text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
            </form>
        </div>
    )
}

export default Signup