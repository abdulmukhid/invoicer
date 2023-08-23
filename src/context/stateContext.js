import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import dayjs from "dayjs";
import { saveCustomerDataService } from "../servises/BillingApiService";

export const State = createContext();

export default function StateContext({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [saveInvoiceData, setSaveInvoiceData] = useState({});
  const [invoiceDate, setInvoiceDate] = useState(dayjs(new Date()));
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [totalItems, setTotalItems] = useState([]);
  const [gstSelect, setGstSelect] = useState("nonGST");
  const [gstNumber, setGstNumber] = useState("921234567");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [customerDataSave, setCustomerDataSave] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  // const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [deleteRecordStatus, setDeleteRecordStatus] = useState();
  const [refreshPage, setRefreshPage] = useState(false);

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  const onSelectGST = (event) => {
    setGstSelect(event.target.value);
    console.log(gstSelect);
  };

  const clearFields = () => {
    setInvoiceNumber("");
    setCustomerName("");
    setPhoneNumber("");
    setAddress("");
    setItemName("");
    setQuantity("");
    setPrice("");
    setAmount("");
    setList([]);
  };

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: 0,
        itemName,
        quantity,
        price,
        amount,
        deleted: false,
        created: "2023-08-18T13:34:24.279Z",
        modified: "2023-08-18T13:34:24.279Z",
      };
      setItemName("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
      console.log("check list :", list);
    }

    if (!customerName || !phoneNumber || !address) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        gstNumber,
        customerName,
        phoneNumber,
        address,
      };
      setGstNumber(newItems.gstNumber);
      setClientName(newItems.customerName);
      setClientPhoneNumber(newItems.phoneNumber);
      setClientAddress(newItems.address);
    }
  };

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Use collect.js to calculate the total amount of items in the table. This is a much better function than the commented one above.
  const calculateTotal = () => {
    const allItems = list.map((item) => item.amount);

    setTotal(collect(allItems).sum());
  };

  useEffect(() => {
    calculateTotal();
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    const { itemName, quantity, price } = editingRow;
    setItemName(itemName);
    setQuantity(quantity);
    setPrice(price);
  };

  const setInvoiceDataHandler = async () => {
    const data = {
      id: 0,
      address: address,
      customerName: customerName,
      created: "2023-08-18T13:34:24.279Z",
      modified: "2023-08-18T13:34:24.279Z",
      deleted: false,
      gstNumber: gstSelect === "GST" ? gstNumber : "",
      invoiceDate: invoiceDate.format(),
      invoiceNumber: invoiceNumber,
      mobileNumber: phoneNumber,
      item: list,
    };
    setSaveInvoiceData(data);
    console.log("passing data to backend:", data);
    let response = await saveCustomerDataService(data);
    setRefreshPage(true);
    console.log("response from backend:", response);
  };

  const editTableHandler = (record, id, navigate) => {
    const editRecord = record.find((row) => row.id == id);
    const { customerName, mobileNumber, address, item } = editRecord;
    setTotalItems(item);
    console.log(totalItems);
    setCustomerName(customerName);
    setPhoneNumber(mobileNumber);
    setAddress(address);
    setList(item);
    navigate("/");
  };

  // Delete function
  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
    // CalcSum();
    setShowModal(false);
  };

  const context = {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientPhoneNumber,
    setClientPhoneNumber,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    gstSelect,
    setGstSelect,
    gstNumber,
    setGstNumber,
    totalItems,
    setTotalItems,
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
    setAmount,
    list,
    setList,
    total,
    setTotal,
    width,
    componentRef,
    handlePrint,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    onSelectGST,
    handleSubmit,
    editRow,
    editTableHandler,
    setInvoiceDataHandler,
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
    deleteRecordStatus,
    setDeleteRecordStatus,
    refreshPage,
    setRefreshPage,
    clearFields,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
