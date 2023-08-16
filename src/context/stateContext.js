import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import dayjs from "dayjs";

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
  const [invoiceNumber, setInvoiceNumber] = useState(76842031);
  const [invoiceDate, setInvoiceDate] = useState(dayjs(new Date()));
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [gstSelect, setGstSelect] = useState("GST");
  const [gstNumber, setGstNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
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

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount,
      };
      setDescription("");
      setQuantity("");
      setPrice("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
      console.log(list);
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

  /* Calculate total amount of items in table
  This is the previous function to calculate the total amount of items in the table
  But it has a bug where if you delete an item from the table, it still keeps the previous total amount.
  The function after this comment uses `collect.js` which is a much better solution.  
  */
  // function CalcSum() {
  //   let rows = document.querySelectorAll(".amount");
  //   let sum = 0;

  //   for (let i = 0; i < rows.length; i++) {
  //     if (rows[i].className === "amount") {
  //       sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
  //       setTotal(sum);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   CalcSum();
  // }, [price, quantity]);

  // Use collect.js to calculate the total amount of items in the table. This is a much better function than the commented one above.
  const calculateTotal = () => {
    const allItems = list.map((item) => item.amount);

    setTotal(collect(allItems).sum());
  };

  useEffect(() => {
    calculateTotal();
    // const date = new Date();

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${day}/${month}/${year}`;
    // setInvoiceDate(currentDate);
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    const { description, quantity, price } = editingRow;
    setDescription(description);
    setQuantity(quantity);
    setPrice(price);
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
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
