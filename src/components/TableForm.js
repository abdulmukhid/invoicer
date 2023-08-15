import React, { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { State } from "../context/stateContext";
import { FormControlLabel, Radio, TextField, RadioGroup } from "@mui/material";
import ReactToPrint from "react-to-print";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import PrintIcon from '@mui/icons-material/Print';

export default function TableForm() {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const {
    customerName,
    setCustomerName,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    description,
    setDescription,
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
  } = useContext(State);

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <br />
      <form onSubmit={handleSubmit}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={gstSelect}
          onChange={onSelectGST}
        >
          <FormControlLabel value="GST" control={<Radio />} label="GST" />
          <FormControlLabel value="nonGST" control={<Radio />} label="Non GST" />
        </RadioGroup>
        <div className="md:grid grid-cols-3 gap-5">
          {gstSelect === "GST" ? (
            <div className="flex flex-col custom-mb">
              <TextField
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
            />
          </div>
        </div>
        <hr className="custom-mb" />

        <div className="md:grid grid-cols-3 gap-5">
          <div className="flex flex-col  custom-mb">
            <TextField
              id="description"
              label="Item"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="custom-input-align"
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
            />
          </div>
        </div>
        <div className="md:grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <p>{amount}</p>
          </div>
          <div className="flex flex-col btn-left-align">
            <button
              type="submit"
              className="bg-blue-500 mb-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
            >
              {isEditing ? "Finish Editing" : "Add Item"}
            </button>
          </div>
        </div>
      </form>
      <br />

      {/* Table items */}

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
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td className="amount">{amount}</td>
                <td>
                  <button onClick={() => editRow(id)}>
                    <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                  </button>
                </td>
                <td>
                  <button onClick={() => setShowModal(true)}>
                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>
            {showModal && <DeleteModal id={id} />}
          </React.Fragment>
        ))}
      </table>

      <div className="md:grid grid-cols-2 gap-5">
        <div className="flex flex-col custom-mb">
          <ReactToPrint
            trigger={() => (
              <button className="custom-btn-width bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                <PrintIcon></PrintIcon> Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
        <div className="flex flex-col  custom-mb">
          <h2 className="flex items-end justify-end text-gray-800 text-2xl font-bold">
            Total Amount: {total.toLocaleString()}
          </h2>
        </div>
      </div>
    </>
  );
}
