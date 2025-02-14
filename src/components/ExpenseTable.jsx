import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import UpdateExpense from "./UpdateExpense";
import { setExpenses } from "@/redux/expenseSlice";

const ExpenseTable = () => {
    const { expenses } = useSelector(state => state.expense);
    const dispatch = useDispatch();
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const initialCheckedState = {};
        expenses.forEach(expense => {
            initialCheckedState[expense._id] = expense.done;
        });
        setCheckedItems(initialCheckedState);
    }, [expenses]);

    const totalAmount = expenses.reduce((acc, expense) => {
        if (!checkedItems[expense._id]) {
            return acc + expense.amount;
        }
        return acc;
    }, 0);

    const handleCheckboxChange = async (expenseId) => {
        const newStatus = !checkedItems[expenseId];
        try {
            const res = await axios.put(`https://expensify-backend-6ls3.onrender.com/api/v1/expense/${expenseId}/done`, { done: newStatus }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setCheckedItems(prevData => ({
                    ...prevData,
                    [expenseId]: newStatus
                }));
                dispatch(setExpenses(expenses.map(exp => exp._id === expenseId ? { ...exp, done: newStatus } : exp)));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeExpenseHandler = async (expenseId) => {
        try {
            const res = await axios.delete(`https://expensify-backend-6ls3.onrender.com/api/v1/expense/remove/${expenseId}`);
            if (res.data.success) {
                toast.success(res.data.message);
                const filteredExpenses = expenses.filter(expense => expense._id !== expenseId);
                dispatch(setExpenses(filteredExpenses)); // Update Redux state
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your expenses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Mark as Done</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.length === 0 ? <span>Add Your First Expense</span> : expenses.map((expense) => (
                        <TableRow key={expense._id}>
                            <TableCell className="font-medium">
                                <Checkbox
                                    checked={checkedItems[expense._id]}
                                    onCheckedChange={() => handleCheckboxChange(expense._id)}
                                />
                            </TableCell>
                            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.category}</TableCell>
                            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.description}</TableCell>
                            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.amount}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button onClick={() => removeExpenseHandler(expense._id)} size="icon" className="rounded-full border border-blue-600 hover:border-transparent" variant="outline">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                    <UpdateExpense expense={expense} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableCell colSpan={5} className="font-bold text-xl">Total Money Spent</TableCell>
                    <TableCell className="text-right font-bold text-xl">${totalAmount}</TableCell>
                </TableFooter>
            </Table>
        </div>
    );
};

export default ExpenseTable;
