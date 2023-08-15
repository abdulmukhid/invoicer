import { useContext } from "react";
import { State } from "../context/stateContext";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const records = [
    {
        'customerName' : 'Salahuddin',
        'phoneNumber' : '8421009959',
        'address' : 'Nanded',
        'date' : '15/08/2023',
        'price' : '25000'
    },
    {
        'customerName' : 'Raheman',
        'phoneNumber' : '9921998701',
        'address' : 'Himayat nagar',
        'date' : '15/08/2023',
        'price' : '18000'
    },
    {
        'customerName' : 'Bilal',
        'phoneNumber' : '7774051073',
        'address' : 'Nanded',
        'date' : '10/08/2023',
        'price' : '40000'
    },
    {
        'customerName' : 'Faizan',
        'phoneNumber' : '9021995031',
        'address' : 'Kinwat',
        'date' : '01/07/2023',
        'price' : '10000'
    }
]

export default function AllRecords() {
  const { invoiceNumber, invoiceDate, dueDate } = useContext(State);

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Invoice Date</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((records) => (
            <StyledTableRow key={records.customerName}>
              <StyledTableCell component="th" scope="row">
                {records.customerName}
              </StyledTableCell>
              <StyledTableCell align="right">{records.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{records.address}</StyledTableCell>
              <StyledTableCell align="right">{records.date}</StyledTableCell>
              <StyledTableCell align="right">{records.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
