import React, { useContext, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { State } from "../context/stateContext";
import {
  FormControlLabel,
  Radio,
  TextField,
  RadioGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import ReactToPrint from "react-to-print";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PrintIcon from "@mui/icons-material/Print";
import { getInvoiceNumberService } from "../servises/BillingApiService";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

export default function TableForm() {
  const [loading, setLoading] = React.useState(true);
  const {
    customerName,
    setCustomerName,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    list,
    total,
    isEditing,
    showModal,
    setShowModal,
    handleSubmit,
    editRow,
    componentRef,
    gstSelect,
    onSelectGST,
    gstNumber,
    setGstNumber,
    invoiceDate,
    setInvoiceDate,
    invoiceNumber,
    setInvoiceNumber,
    setInvoiceDataHandler,
    refreshPage,
    setRefreshPage,
  } = useContext(State);

  useEffect(() => {
    getInvoiceNumber();
  }, [refreshPage]);

  const getInvoiceNumber = async () => {
    setLoading(true);
    let response = await getInvoiceNumberService();
    setTimeout(() => {
      setInvoiceNumber(response.data);
      setLoading(false);
    }, 1000);
    setRefreshPage(false);
  };
  const pagestyle = `{ size: 2.5in 4in }`;


  

  return (
    <>
      {loading ? (
        <CircularProgress style={{ display: "flex", margin: "0 auto" }} />
      ) : (
      <div>
        <div>
          <ToastContainer position="top-right" theme="colored" />
          
          <form onSubmit={handleSubmit}>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={gstSelect}
              onChange={onSelectGST}
              className="custom-mb"
            >
              <FormControlLabel
                value="nonGST"
                control={<Radio />}
                label="Non GST"
              />
              <FormControlLabel value="GST" control={<Radio />} label="GST" />
            </RadioGroup>
            <div className="md:grid grid-cols-3 gap-5">
              {gstSelect === "GST" ? (
                <div className="flex flex-col custom-mb">
                  <TextField
                    disabled
                    id="gst-number"
                    label="GST Number"
                    variant="outlined"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="custom-input-align"
                  />
                </div>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
              <div className="flex flex-col custom-mb custom-picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Invoice Date"
                      value={invoiceDate}
                      onChange={(newValue) => setInvoiceDate(newValue)}
                      className="custom-input-align"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex flex-col custom-mb">
                <TextField
                  disabled
                  id="invoice-number"
                  label="Invoice Number"
                  variant="outlined"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="custom-input-align"
                />
              </div>
              <div className="flex flex-col custom-mb">
                <TextField
                  id="customer-name"
                  label="Customer Name"
                  variant="outlined"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="custom-input-align"
                  required
                />
              </div>
              <div className="flex flex-col custom-mb">
                <TextField
                  id="phone-number"
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="custom-input-align"
                  required
                  minlength="10"
                  type="number"
                />
              </div>
              <div className="flex flex-col custom-mb">
                <TextField
                  id="address"
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="custom-input-align"
                  required
                />
              </div>
            </div>
            <hr className="custom-mb" />

            <div className="md:grid grid-cols-3 gap-5">
              <div className="flex flex-col  custom-mb">
                <TextField
                  id="itemName"
                  label="Item Name"
                  variant="outlined"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="custom-input-align"
                  required
                />
              </div>
              <div className="flex flex-col custom-mb">
                <TextField
                  id="quantity"
                  label="Quantity"
                  variant="outlined"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="custom-input-align"
                  required
                />
              </div>
              <div className="flex flex-col custom-mb">
                <TextField
                  id="price"
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="custom-input-align"
                  required
                />
              </div>
            </div>
            <div className="md:grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="amount">Amount</label>
                <p>{amount}</p>
              </div>
              <div className="flex flex-col btn-left-align">
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={isEditing ? <DoneIcon /> : <AddIcon />}
                >
                  {isEditing ? "Finish Editing" : "Add Item"}
                </Button>
              </div>
            </div>
          </form>
          <br />
        </div>

      
        <table width="100%" className="mb-10 overflow-auto custom-table">
          <thead>
            <tr className="bg-gray-100 p-1">
              <td className="font-bold">Item</td>
              <td className="font-bold">Quantity</td>
              <td className="font-bold">Price</td>
              <td className="font-bold">Amount</td>
              <td className="font-bold">Edit</td>
              <td className="font-bold">Delete</td>
            </tr>
          </thead>
          <tbody> 
          {list.map(({ id, itemId, itemName, quantity, price, amount }) => (
            <React.Fragment>
                <tr className="h-10" key={id}>
                  <td>{itemName}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                  <td className="amount">{amount}</td>
                  <td>
                    <IconButton onClick={() => editRow(itemId)} aria-label="edit">
                      <EditSharpIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      onClick={() => setShowModal({show:true,value:itemId})}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>{showModal.show && <DeleteModal itemId={showModal.value} />}
            </React.Fragment>
          ))}
          </tbody>
        </table>

      <div className="md:grid grid-cols-2 gap-5">
        <div className="flex flex-col custom-mb">
          <ReactToPrint
            pagestyle={pagestyle}
            trigger={() => (
              <Button
                disabled={list.length == 0}
                variant="contained"
                className="custom-btn-width"
                startIcon={<PrintIcon />}
              >
                Print
              </Button>
            )}
            onAfterPrint={() => {
              setInvoiceDataHandler();
              console.log("Document Printed Successfully!");
            }}
            content={() => componentRef.current}
          ></ReactToPrint>
        </div>
        <div className="flex flex-col  custom-mb">
          <h2 className="flex items-end justify-end text-gray-800 font-bold">
            TOTAL AMOUNT : {total.toLocaleString()}
          </h2>
        </div>
      </div>
      </div>
      )}
    </>
  );
}
