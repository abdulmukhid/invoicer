import { useContext } from "react";
import { State } from "../context/stateContext";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { AiOutlineDelete } from "react-icons/ai";
// import { AiOutlineEdit } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import {
  deleteRecordById,
  getListOfRecords,
} from "../servises/AllRecordsServises";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const records = [
  {
    id: 1,
    customerName: "Salahuddin",
    phoneNumber: "8421009959",
    address: "Nanded",
    date: "15/08/2023",
    price: "25000",
  },
  {
    id: 2,
    customerName: "Raheman",
    phoneNumber: "9921998701",
    address: "Himayat nagar",
    date: "15/08/2023",
    price: "18000",
  },
  {
    id: 3,
    customerName: "Bilal",
    phoneNumber: "7774051073",
    address: "Nanded",
    date: "10/08/2023",
    price: "40000",
  },
  {
    id: 4,
    customerName: "Faizan",
    phoneNumber: "9021995031",
    address: "Kinwat",
    date: "01/07/2023",
    price: "10000",
  },
];

export default function AllRecords() {
  const { editTableHandler, deleteRecordStatus, setDeleteRecordStatus } =
    useContext(State);
  const [record, setRecords] = React.useState([0]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    let response = await getListOfRecords();
    setRecords(response.data);
    console.log(response.data);
  };

  const deleteRecord = async (id) => {
    let response = await deleteRecordById(id);
    if (response.data === "Deleted Successfully") {
      setTimeout(() => {
        setDeleteRecordStatus(false);
        getRecords();
      }, 3000);
      setDeleteRecordStatus(true);
    }
  };

  return (
    <>
      {deleteRecordStatus ? (
        <Alert severity="success">Data Deleted Successfully!</Alert>
      ) : (
        <Alert style={{ display: "none" }} severity="error">
          Error
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Invoice Date</StyledTableCell>
              {/* <StyledTableCell align="right">Price</StyledTableCell> */}
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {record.map((data, index) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell>{data.id}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {data.customerName}
                </StyledTableCell>
                <StyledTableCell>{data.mobileNumber}</StyledTableCell>
                <StyledTableCell>{data.address}</StyledTableCell>
                <StyledTableCell>{data.created}</StyledTableCell>
                {/* <StyledTableCell align="right">{records.price}</StyledTableCell> */}

                <StyledTableCell>
                  <IconButton
                    color="primary"
                    onClick={() => editTableHandler(record, data.id, navigate)}
                    aria-label="edit"
                  >
                    <EditSharpIcon />
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell>
                  <IconButton
                    color="primary"
                    onClick={() => deleteRecord(data.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
