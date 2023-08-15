import { useContext } from "react";
import ClientDetails from "./ClientDetails";
import Header from "./Header";
import MainDetails from "./MainDetails";
import Table from "./Table";
import { State } from "../context/stateContext";
import InvoiceDashboardMenu from "./Drawer";

function App() {
  const {
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
    componentRef,
  } = useContext(State);

  return (
    <>
      <InvoiceDashboardMenu />
      <main
        className="m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start"
        style={{
          maxWidth: "1920px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          marginTop: "50px",
        }}
      >
        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200" style={{ display: "none" }}>
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails />

            <Table />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
