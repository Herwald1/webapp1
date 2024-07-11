import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Inventory(){
    const dummyUsers = [
        { id: 1, name: 'Shirt' },
        { id: 2, name: 'pants' },
        { id: 3, name: 'socks' },
    ];

    return (
        <div>
            <h1>Inventory Page</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Product Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

