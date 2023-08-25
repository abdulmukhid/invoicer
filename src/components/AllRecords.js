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
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import dayjs from "dayjs";
import {
  deleteRecordById,
  getListOfRecords,
} from "../servises/AllRecordsServises";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { TablePagination } from "@mui/material";

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

const rowsPerPageOptions = [5, 10];

export default function AllRecords() {
  const { editTableHandler, deleteRecordStatus, setDeleteRecordStatus } =
    useContext(State);
  const [record, setRecords] = React.useState([0]);

  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    setLoading(true);
    let response = await getListOfRecords();
    setTimeout(() => {
      setRecords(response.data);
      setLoading(false);
    }, 1000);
  };

  const deleteRecord = async (id) => {
    setLoading(true);
    let response = await deleteRecordById(id);
    if (response.data === "Deleted Successfully") {
      getRecords();
      setTimeout(() => {
        setDeleteRecordStatus(false);
      }, 4000);
      setDeleteRecordStatus(true);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {loading ? (
        <CircularProgress style={{ display: "flex", margin: "0 auto" }} />
      ) : (
        <div>
          {deleteRecordStatus ? (
            <Alert severity="success">Data Deleted Successfully!</Alert>
          ) : (
            <Alert style={{ display: "none" }} severity="error">
              Error
            </Alert>
          )}
          {Object.keys(record).length === 0 ? (
            <h6 style={{ textAlign: "center" }}>No Data Available!</h6>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr No</StyledTableCell>
                    <StyledTableCell>Customer Name</StyledTableCell>
                    <StyledTableCell>Phone Number</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Invoice Date</StyledTableCell>
                    <StyledTableCell>Edit</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-edit">
                  {record
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => (
                      <StyledTableRow key={data.id}>
                        <StyledTableCell>{data.id}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {data.customerName}
                        </StyledTableCell>
                        <StyledTableCell>{data.mobileNumber}</StyledTableCell>
                        <StyledTableCell>{data.address}</StyledTableCell>
                        <StyledTableCell>{dayjs(data.invoiceDate).format('DD/MM/YYYY')}</StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              editTableHandler(record, data.id, navigate)
                            }
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
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={record.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableContainer>
          )}
        </div>
      )}
    </>
  );
}
