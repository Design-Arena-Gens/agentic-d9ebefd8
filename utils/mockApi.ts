import { PorterBookingResponse } from '@/types/order';

export function simulatePorterBooking(orderId: string): Promise<PorterBookingResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        price: "120.00",
        eta_minutes: 5
      });
    }, 2000);
  });
}

export function simulateSaveOrder(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export function simulateSendMessage(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export function simulateBulkUpload(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
