'use client';

import { useState, useRef } from 'react';
import { Order, CommunicationLog } from '@/types/order';
import { initialOrders, initialCommunicationLogs } from '@/utils/mockData';
import { simulateBulkUpload } from '@/utils/mockApi';
import Modal from '@/components/Modal';
import OrderForm from '@/components/OrderForm';
import OrderCard from '@/components/OrderCard';
import OrderDetails from '@/components/OrderDetails';
import Toast from '@/components/Toast';
import styles from './page.module.css';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>(initialCommunicationLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.customer_name.toLowerCase().includes(query) ||
      order.customer_phone.includes(query) ||
      order.address.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query)
    );
  });

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const inTransitCount = orders.filter((o) => o.status === 'In Transit').length;

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowOrderForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setSelectedOrder(null);
    setShowOrderForm(true);
  };

  const handleSaveOrder = (order: Order) => {
    if (editingOrder) {
      setOrders(orders.map((o) => (o.id === order.id ? order : o)));
      setToast({ message: 'Order updated successfully!', type: 'success' });
    } else {
      setOrders([order, ...orders]);
      setToast({ message: 'Order added successfully!', type: 'success' });
    }
    setShowOrderForm(false);
    setEditingOrder(null);
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        await simulateBulkUpload();
        setToast({ message: 'Orders Uploaded!', type: 'success' });
      } catch (error) {
        setToast({ message: 'Upload failed', type: 'error' });
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddCommunicationLog = (log: CommunicationLog) => {
    setCommunicationLogs([...communicationLogs, log]);
    setToast({ message: 'Message Sent', type: 'success' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Order Management</h1>
          <p className={styles.subtitle}>Track and manage your delivery orders</p>
        </div>
      </div>

      <div className={styles.summaryCards}>
        <div className={styles.summaryCard} style={{ borderLeft: '4px solid #FF9800' }}>
          <div className={styles.cardIcon} style={{ backgroundColor: '#FF980022' }}>
            <span className="material-icons" style={{ color: '#FF9800' }}>pending</span>
          </div>
          <div>
            <h3>{pendingCount}</h3>
            <p>Orders Pending</p>
          </div>
        </div>
        <div className={styles.summaryCard} style={{ borderLeft: '4px solid #005A9C' }}>
          <div className={styles.cardIcon} style={{ backgroundColor: '#005A9C22' }}>
            <span className="material-icons" style={{ color: '#005A9C' }}>local_shipping</span>
          </div>
          <div>
            <h3>{inTransitCount}</h3>
            <p>In Transit</p>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <span className="material-icons">search</span>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={styles.bulkUploadButton}
          >
            <span className="material-icons">upload_file</span>
            Bulk Upload
          </button>
          <button onClick={handleAddOrder} className={styles.addButton}>
            <span className="material-icons">add</span>
            Add New Order
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            style={{ display: 'none' }}
            onChange={handleBulkUpload}
          />
        </div>
      </div>

      <div className={styles.orderList}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <span className="material-icons">inbox</span>
            <h3>No orders found</h3>
            <p>Try adjusting your search or add a new order</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => setSelectedOrder(order)}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={showOrderForm}
        onClose={() => {
          setShowOrderForm(false);
          setEditingOrder(null);
        }}
        title={editingOrder ? 'Edit Order' : 'Add New Order'}
      >
        <OrderForm
          order={editingOrder || undefined}
          onSave={handleSaveOrder}
          onCancel={() => {
            setShowOrderForm(false);
            setEditingOrder(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="800px"
      >
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onEdit={() => handleEditOrder(selectedOrder)}
            communicationLogs={communicationLogs}
            onAddLog={handleAddCommunicationLog}
          />
        )}
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
