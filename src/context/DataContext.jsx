import { createContext, useContext, useState } from "react";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {

  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Pedro Sanchez",
      email: "pedro.sanchez@email.com",
      phone: "987654321",
      country: "Peru",
      status: "Active",
      lastPurchase: "2025-11-20",
    },
    {
      id: 2,
      name: "Lucia Fernandez",
      email: "lucia.fernandez@email.com",
      phone: "945123789",
      country: "Chile",
      status: "Active",
      lastPurchase: "2025-11-28",
    },
    {
      id: 3,
      name: "Roberto Gómez",
      email: "roberto.gomez@techsolutions.com",
      phone: "+52 55 1234 5678",
      country: "Mexico",
      status: "Active",
      lastPurchase: "2025-12-05",
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@globalsoft.es",
      phone: "+34 912 345 678",
      country: "Spain",
      status: "Inactive",
      lastPurchase: "2025-10-15",
    },
    {
      id: 5,
      name: "Carlos Villagrán",
      email: "c.villagran@andescorp.cl",
      phone: "+56 9 8765 4321",
      country: "Chile",
      status: "Active",
      lastPurchase: "2025-12-10",
    },
    {
      id: 6,
      name: "Sofia Rossi",
      email: "s.rossi@italy-design.it",
      phone: "+39 02 1234 567",
      country: "Italy",
      status: "Active",
      lastPurchase: "2025-12-18",
    },
    {
      id: 7,
      name: "James Wilson",
      email: "james.wilson@cloud-systems.us",
      phone: "+1 202 555 0123",
      country: "USA",
      status: "Active",
      lastPurchase: "2025-11-30",
    },
    {
      id: 8,
      name: "Valentina Duarte",
      email: "v.duarte@rioplatense.ar",
      phone: "+54 11 4321 8765",
      country: "Argentina",
      status: "Inactive",
      lastPurchase: "2025-09-22",
    },
    {
      id: 9,
      name: "Diego Portillo",
      email: "diego.p@limabusiness.pe",
      phone: "+51 981 234 567",
      country: "Peru",
      status: "Active",
      lastPurchase: "2025-12-14",
    },
    {
      id: 10,
      name: "Isabella Silva",
      email: "isabella.silva@brasilhub.br",
      phone: "+55 11 91234 5678",
      country: "Brazil",
      status: "Active",
      lastPurchase: "2025-12-01",
    },
    {
      id: 11,
      name: "Mateo Ortiz",
      email: "mortiz@colombia-export.co",
      phone: "+57 310 123 4567",
      country: "Colombia",
      status: "Active",
      lastPurchase: "2025-11-25",
    },
    {
      id: 12,
      name: "Elena Petrov",
      email: "e.petrov@euro-logistics.de",
      phone: "+49 30 1234567",
      country: "Germany",
      status: "Inactive",
      lastPurchase: "2025-08-10",
    }
  ]);


  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Consulting Service",
      category: "Services",
      price: 450,
      stock: 10,
      status: "Available",
      date: "2025-11-22",
    },
    {
      id: 2,
      name: "Premium Subscription",
      category: "Subscriptions",
      price: 120,
      stock: 50,
      status: "Available",
      date: "2025-10-10",
    },
    {
      id: 3,
      name: "Cloud Server Hosting",
      category: "Software",
      price: 89.99,
      stock: 100,
      status: "Available",
      date: "2025-09-15",
    },
    {
      id: 4,
      name: "Business Intelligence Suite",
      category: "Software",
      price: 599.00,
      stock: 5,
      status: "Available",
      date: "2025-11-05",
    },
    {
      id: 5,
      name: "Graphic Workstation Z1",
      category: "Equipment",
      price: 2450.00,
      stock: 0,
      status: "Out of Stock",
      date: "2025-08-20",
    },
    {
      id: 6,
      name: "Enterprise VPN License",
      category: "Software",
      price: 25.00,
      stock: 200,
      status: "Available",
      date: "2025-12-01",
    },
    {
      id: 7,
      name: "Cybersecurity Audit",
      category: "Services",
      price: 1200.00,
      stock: 3,
      status: "Available",
      date: "2025-11-12",
    },
    {
      id: 8,
      name: "Ergonomic Office Chair",
      category: "Equipment",
      price: 320.00,
      stock: 15,
      status: "Available",
      date: "2025-10-25",
    },
    {
      id: 9,
      name: "Data Analytics Training",
      category: "Services",
      price: 150.00,
      stock: 25,
      status: "Available",
      date: "2025-12-10",
    },
    {
      id: 10,
      name: "SEO Optimization Pro",
      category: "Services",
      price: 850.00,
      stock: 12,
      status: "Available",
      date: "2025-11-28",
    },
    {
      id: 11,
      name: "Network Switch 24-Port",
      category: "Equipment",
      price: 480.00,
      stock: 0,
      status: "Out of Stock",
      date: "2025-07-14",
    },
    {
      id: 12,
      name: "Developer API Access",
      category: "Subscriptions",
      price: 45.00,
      stock: 500,
      status: "Available",
      date: "2025-12-15",
    }
  ]);

  /* ===================== ORDERS ===================== */
 const [orders, setOrders] = useState([
  {
    id: 1,
    client: { name: "Pedro Sanchez" },
    items: [
      { name: "Consulting Service", qty: 1 },
      { name: "Premium Subscription", qty: 2 },
    ],
    total: 690,
    status: "Paid",
    date: "2025-12-01",
  },
  {
    id: 2,
    client: { name: "Lucia Fernandez" },
    items: [
      { name: "Cloud Server Hosting", qty: 3 },
      { name: "Enterprise VPN License", qty: 5 },
    ],
    total: 394.97,
    status: "Paid",
    date: "2025-12-05",
  },
  {
    id: 3,
    client: { name: "Roberto Gómez" },
    items: [
      { name: "Business Intelligence Suite", qty: 1 },
    ],
    total: 599.00,
    status: "Pending",
    date: "2025-12-08",
  },
  {
    id: 4,
    client: { name: "James Wilson" },
    items: [
      { name: "Cybersecurity Audit", qty: 1 },
      { name: "Developer API Access", qty: 10 },
    ],
    total: 1650.00,
    status: "Paid",
    date: "2025-12-10",
  },
  {
    id: 5,
    client: { name: "Sofia Rossi" },
    items: [
      { name: "Ergonomic Office Chair", qty: 2 },
      { name: "Premium Subscription", qty: 1 },
    ],
    total: 760.00,
    status: "Paid",
    date: "2025-12-12",
  },
  {
    id: 6,
    client: { name: "Diego Portillo" },
    items: [
      { name: "SEO Optimization Pro", qty: 1 },
      { name: "Data Analytics Training", qty: 2 },
    ],
    total: 1150.00,
    status: "Paid",
    date: "2025-12-14",
  },
  {
    id: 7,
    client: { name: "Mateo Ortiz" },
    items: [
      { name: "Enterprise VPN License", qty: 10 },
      { name: "Cloud Server Hosting", qty: 1 },
    ],
    total: 339.99,
    status: "Pending",
    date: "2025-12-15",
  },
  {
    id: 8,
    client: { name: "Isabella Silva" },
    items: [
      { name: "Consulting Service", qty: 2 },
    ],
    total: 900.00,
    status: "Paid",
    date: "2025-12-18",
  }
]);

  /* ===================== LOGS ===================== */
  const [logs, setLogs] = useState([]);

  const addLog = (action, detail, user = "Administrator") => {
    const entry = {
      id: logs.length ? Math.max(...logs.map((l) => l.id)) + 1 : 1,
      user,
      action,
      detail,
      date: new Date().toLocaleString(),
    };
    setLogs((prev) => [entry, ...prev]);
  };

  /* ===================== CLIENT FUNCTIONS ===================== */
  const addClient = (data) => {
    const nextId = clients.length ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    const newClient = { id: nextId, ...data };
    setClients([...clients, newClient]);
    addLog("Create Client", `New client added: ${newClient.name}`);
  };

  const editClient = (id, newData) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...newData } : c))
    );
    addLog("Update Client", `Information updated for: ${newData.name}`);
  };

  const deleteClient = (id) => {
    const c = clients.find((x) => x.id === id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    addLog("Delete Client", `Client removed: ${c?.name || `ID ${id}`}`);
  };

  /* ===================== PRODUCT FUNCTIONS ===================== */
  const addProduct = (data) => {
    const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      ...data,
      date: new Date().toISOString().slice(0, 10),
    };
    setProducts([...products, newProduct]);
    addLog("Create Product", `New item in inventory: ${newProduct.name}`);
  };

  const editProduct = (id, newData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...newData } : p))
    );
    addLog("Update Product", `Price or stock updated for: ${newData.name}`);
  };

  const deleteProduct = (id) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addLog("Delete Product", `Product discontinued: ${p?.name || `ID ${id}`}`);
  };

  /* ===================== ORDER FUNCTIONS ===================== */
  const addOrder = (order) => {
    const nextId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
    const newOrder = { id: nextId, ...order };
    setOrders([...orders, newOrder]);
    addLog("Process Order", `Order #${nextId} created for ${order.client.name}`);
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    addLog("Cancel Order", `Order #${id} was removed from system`);
  };

  /* ===================== EXPORT CONTEXT ===================== */
  return (
    <DataContext.Provider
      value={{
        clients,
        products,
        orders,
        logs,
        addClient,
        editClient,
        deleteClient,
        addProduct,
        editProduct,
        deleteProduct,
        addOrder,
        deleteOrder,
        addLog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}