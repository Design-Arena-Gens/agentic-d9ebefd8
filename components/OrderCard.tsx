'use client';

import { Order } from '@/types/order';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

export default function OrderCard({ order, onClick }: OrderCardProps) {
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

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.orderId}>{order.id}</h3>
          <p className={styles.customerName}>{order.customer_name}</p>
        </div>
        <span
          className={styles.statusBadge}
          style={{ backgroundColor: `${getStatusColor(order.status)}22`, color: getStatusColor(order.status) }}
        >
          {order.status}
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className="material-icons">phone</span>
          <span>{order.customer_phone}</span>
        </div>
        <div className={styles.detailRow}>
          <span className="material-icons">location_on</span>
          <span>{order.address}</span>
        </div>
        <div className={styles.detailRow}>
          <span className="material-icons">schedule</span>
          <span>{formatDate(order.pickup_time)}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.viewDetails}>View Details →</span>
      </div>
    </div>
  );
}
