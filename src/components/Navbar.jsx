import React from "react";
import Logo from "./shared/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const NavBar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get("https://expensify-backend-6ls3.onrender.com/api/v1/user/logout");
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message || "Logout failed");
        }
    };

    return (
        <div className="border-b border-gray-300" style={{ padding: '0 20px' }}>
            <div className="flex items-center justify-between max-w-7xl mx-auto h-16" style={{ alignItems: 'center' }}>
                <Logo />
                <h1 style={{ flex: 1, textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                    Expensify
                </h1>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User Image" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent style={{ padding: '10px' }}>
                                <Button variant="link" onClick={logoutHandler}>Log Out</Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Signup</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
