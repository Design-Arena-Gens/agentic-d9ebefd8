'use client';

import { useState } from 'react';
import { Order, CommunicationLog } from '@/types/order';
import { simulatePorterBooking, simulateSendMessage } from '@/utils/mockApi';
import { communicationTemplates } from '@/utils/mockData';
import Modal from './Modal';
import Spinner from './Spinner';
import styles from './OrderDetails.module.css';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
  communicationLogs: CommunicationLog[];
  onAddLog: (log: CommunicationLog) => void;
}

export default function OrderDetails({
  order,
  onClose,
  onEdit,
  communicationLogs,
  onAddLog,
}: OrderDetailsProps) {
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bookingData, setBookingData] = useState<any>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleBookPickup = async () => {
    setBookingStatus('loading');
    try {
      const result = await simulatePorterBooking(order.id);
      setBookingData(result);
      setBookingStatus('success');
    } catch (error) {
      setBookingStatus('idle');
    }
  };

  const handleSendMessage = async (template: string) => {
    setSendingMessage(true);
    try {
      await simulateSendMessage();
      const newLog: CommunicationLog = {
        id: `LOG${Date.now()}`,
        order_id: order.id,
        message: template,
        timestamp: new Date().toISOString(),
      };
      onAddLog(newLog);
      setShowTemplates(false);
    } finally {
      setSendingMessage(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return '#FF9800';
      case 'In Transit':
        return '#005A9C';
      case 'Delivered':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const orderLogs = communicationLogs.filter(log => log.order_id === order.id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>{order.id}</h2>
          <span
            className={styles.statusBadge}
            style={{
              backgroundColor: `${getStatusColor(order.status)}22`,
              color: getStatusColor(order.status)
            }}
          >
            {order.status}
          </span>
        </div>
        <div className={styles.headerActions}>
          <button onClick={onEdit} className={styles.editButton}>
            <span className="material-icons">edit</span>
            Edit
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            <span className="material-icons">close</span>
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Customer Information</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className="material-icons">person</span>
            <div>
              <label>Name</label>
              <p>{order.customer_name}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className="material-icons">phone</span>
            <div>
              <label>Phone</label>
              <p>{order.customer_phone}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className="material-icons">location_on</span>
            <div>
              <label>Address</label>
              <p>{order.address}</p>
            </div>
          </div>
          <div className={styles.infoItem}>
            <span className="material-icons">schedule</span>
            <div>
              <label>Pickup Time</label>
              <p>{formatDate(order.pickup_time)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Pickup Booking</h3>
        {bookingStatus === 'idle' && (
          <button onClick={handleBookPickup} className={styles.bookButton}>
            <span className="material-icons">local_shipping</span>
            Book Pickup
          </button>
        )}
        {bookingStatus === 'loading' && (
          <div className={styles.loadingContainer}>
            <Spinner size={32} />
            <p>Booking pickup with Porter...</p>
          </div>
        )}
        {bookingStatus === 'success' && bookingData && (
          <div className={styles.successBox}>
            <div className={styles.successHeader}>
              <span className="material-icons">check_circle</span>
              <h4>Booking Confirmed!</h4>
            </div>
            <div className={styles.bookingDetails}>
              <div className={styles.bookingItem}>
                <label>Price</label>
                <p>₹{bookingData.price}</p>
              </div>
              <div className={styles.bookingItem}>
                <label>Driver ETA</label>
                <p>{bookingData.eta_minutes} minutes</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Communication Log</h3>
          <button
            onClick={() => setShowTemplates(true)}
            className={styles.sendButton}
          >
            <span className="material-icons">send</span>
            Send Update
          </button>
        </div>
        <div className={styles.logContainer}>
          {orderLogs.length === 0 ? (
            <p className={styles.emptyLog}>No messages sent yet</p>
          ) : (
            orderLogs.map((log) => (
              <div key={log.id} className={styles.logItem}>
                <span className="material-icons">message</span>
                <div>
                  <p>{log.message}</p>
                  <small>{formatDate(log.timestamp)}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        title="Select Message Template"
        maxWidth="500px"
      >
        <div className={styles.templates}>
          {communicationTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(template)}
              disabled={sendingMessage}
              className={styles.templateButton}
            >
              {sendingMessage ? <Spinner size={18} /> : template}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
