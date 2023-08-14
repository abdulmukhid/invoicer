import { useContext } from "react";
import ClientDetails from "./ClientDetails";
import Dates from "./Dates";
import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
import Table from "./Table";
import TableForm from "./TableForm";
import ReactToPrint from "react-to-print";
import { State } from "../context/stateContext";

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
      <main
        className="m-5 p-5 xl:grid grid-cols-2 gap-10 xl:items-start"
        style={{
          maxWidth: "1920px",
          margin: "auto",
        }}
      >
        <section>
          <div className="bg-white p-5 rounded shadow">
            <div className="flex flex-col justify-center">
              {/* This is our table form */}
              <article>
                <TableForm />
              </article>
            </div>
          </div>
        </section>

        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails />

            <Dates />

            <Table />

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
