'use client';

import { useState, FormEvent } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { simulateSaveOrder } from '@/utils/mockApi';
import Spinner from './Spinner';
import styles from './OrderForm.module.css';

interface OrderFormProps {
  order?: Order;
  onSave: (order: Order) => void;
  onCancel: () => void;
}

export default function OrderForm({ order, onSave, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customer_name: order?.customer_name || '',
    customer_phone: order?.customer_phone || '',
    address: order?.address || '',
    status: order?.status || 'Pending' as OrderStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Customer name is required';
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = 'Phone number is required';
    } else if (!/^\+91 \d{10}$/.test(formData.customer_phone)) {
      newErrors.customer_phone = 'Phone must be in format: +91 XXXXXXXXXX';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await simulateSaveOrder();

      const savedOrder: Order = {
        id: order?.id || `OD${Math.floor(10000 + Math.random() * 90000)}`,
        ...formData,
        pickup_time: order?.pickup_time || new Date().toISOString(),
      };

      setShowSuccess(true);
      setTimeout(() => {
        onSave(savedOrder);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Auto-format phone number
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2 && digits === '91') {
      setFormData({ ...formData, customer_phone: '+91 ' });
    } else if (digits.length > 2) {
      const phoneDigits = digits.slice(2, 12);
      setFormData({ ...formData, customer_phone: `+91 ${phoneDigits}` });
    } else if (digits.length === 0) {
      setFormData({ ...formData, customer_phone: '' });
    }
  };

  if (showSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.checkmark}>
          <span className="material-icons">check_circle</span>
        </div>
        <h3>Order Saved Successfully!</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="customer_name">
          Customer Name <span className={styles.required}>*</span>
        </label>
        <input
          id="customer_name"
          type="text"
          value={formData.customer_name}
          onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
          className={errors.customer_name ? styles.error : ''}
          placeholder="Enter customer name"
        />
        {errors.customer_name && (
          <span className={styles.errorText}>{errors.customer_name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="customer_phone">
          Phone Number <span className={styles.required}>*</span>
        </label>
        <input
          id="customer_phone"
          type="text"
          value={formData.customer_phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className={errors.customer_phone ? styles.error : ''}
          placeholder="+91 XXXXXXXXXX"
        />
        {errors.customer_phone && (
          <span className={styles.errorText}>{errors.customer_phone}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address">
          Address <span className={styles.required}>*</span>
        </label>
        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className={errors.address ? styles.error : ''}
          placeholder="Enter delivery address"
          rows={4}
        />
        {errors.address && (
          <span className={styles.errorText}>{errors.address}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size={18} color="#fff" />
              <span style={{ marginLeft: '8px' }}>Saving...</span>
            </>
          ) : (
            'Save Order'
          )}
        </button>
      </div>
    </form>
  );
}
