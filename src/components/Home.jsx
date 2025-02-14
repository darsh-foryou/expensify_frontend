import React from "react";
import NavBar from "./Navbar";
import { CreateExpense } from "./CreateExpense";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "../redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "../hooks/useGetExpenses";
import Footer from "./Footer";

const Home = () => {
    useGetExpenses();
    const dispatch = useDispatch();

    const changeCategoryHandler = (value) => {
        dispatch(setCategory(value));
    };

    const changeDoneHandler = (value) => {
        dispatch(setMarkAsDone(value));
    };

    return (
        <div style={{
            backgroundColor: '#FFFFFF', // Light background for a clean look
            minHeight: '100vh',
            padding: '20px'
        }}>
            <NavBar />
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                borderRadius: '8px', // Soft rounded corners
                backgroundColor: '#f2f2f2' // Slightly off-white background for the content area
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        color: '#333', // Darker text for better readability
                        fontWeight: 'bold'
                    }}>All your expenses</h1>
                    <CreateExpense />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px', // Increased gap for visual separation
                    marginBottom: '20px'
                }}>
                    <h2 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#555'
                    }}>Filter By:</h2>
                    <Select onValueChange={changeCategoryHandler} style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'solid 2px #ccc', // More defined border
                        backgroundColor: '#FFFFFF'
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="rent">Rent</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="all">All</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <ExpenseTable />
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
