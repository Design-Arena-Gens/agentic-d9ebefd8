export type OrderStatus = 'Pending' | 'In Transit' | 'Delivered';

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  status: OrderStatus;
  pickup_time: string;
}

export interface PorterBookingResponse {
  status: 'success';
  price: string;
  eta_minutes: number;
}

export interface CommunicationLog {
  id: string;
  order_id: string;
  message: string;
  timestamp: string;
}
