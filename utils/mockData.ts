import { Order, CommunicationLog } from '@/types/order';

export const initialOrders: Order[] = [
  {
    id: "OD12345",
    customer_name: "Rohan Sharma",
    customer_phone: "+91 9820098200",
    address: "123, MG Road, Ghatkopar, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T14:00:00Z"
  },
  {
    id: "OD12346",
    customer_name: "Priya Patel",
    customer_phone: "+91 9820098201",
    address: "456, SV Road, Andheri West, Mumbai",
    status: "In Transit",
    pickup_time: "2025-10-22T15:30:00Z"
  },
  {
    id: "OD12347",
    customer_name: "Amit Kumar",
    customer_phone: "+91 9820098202",
    address: "789, Hill Road, Bandra, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T16:00:00Z"
  },
  {
    id: "OD12348",
    customer_name: "Sneha Desai",
    customer_phone: "+91 9820098203",
    address: "321, Marine Drive, South Mumbai, Mumbai",
    status: "In Transit",
    pickup_time: "2025-10-22T13:00:00Z"
  },
  {
    id: "OD12349",
    customer_name: "Rahul Verma",
    customer_phone: "+91 9820098204",
    address: "654, Link Road, Malad West, Mumbai",
    status: "Delivered",
    pickup_time: "2025-10-22T12:00:00Z"
  },
  {
    id: "OD12350",
    customer_name: "Neha Singh",
    customer_phone: "+91 9820098205",
    address: "987, LBS Marg, Kurla, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T17:00:00Z"
  },
  {
    id: "OD12351",
    customer_name: "Vikram Joshi",
    customer_phone: "+91 9820098206",
    address: "147, Powai Lake Road, Powai, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T18:00:00Z"
  },
  {
    id: "OD12352",
    customer_name: "Kavita Reddy",
    customer_phone: "+91 9820098207",
    address: "258, BKC, Bandra East, Mumbai",
    status: "In Transit",
    pickup_time: "2025-10-22T14:30:00Z"
  },
  {
    id: "OD12353",
    customer_name: "Arjun Mehta",
    customer_phone: "+91 9820098208",
    address: "369, Juhu Tara Road, Juhu, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T19:00:00Z"
  },
  {
    id: "OD12354",
    customer_name: "Pooja Gupta",
    customer_phone: "+91 9820098209",
    address: "741, Phoenix Mills, Lower Parel, Mumbai",
    status: "In Transit",
    pickup_time: "2025-10-22T15:00:00Z"
  },
  {
    id: "OD12355",
    customer_name: "Sanjay Iyer",
    customer_phone: "+91 9820098210",
    address: "852, Western Express Highway, Goregaon, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T20:00:00Z"
  },
  {
    id: "OD12356",
    customer_name: "Anjali Nair",
    customer_phone: "+91 9820098211",
    address: "963, Carter Road, Bandra West, Mumbai",
    status: "Delivered",
    pickup_time: "2025-10-22T11:00:00Z"
  },
  {
    id: "OD12357",
    customer_name: "Manish Kapoor",
    customer_phone: "+91 9820098212",
    address: "159, Linking Road, Santacruz, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T21:00:00Z"
  },
  {
    id: "OD12358",
    customer_name: "Divya Shah",
    customer_phone: "+91 9820098213",
    address: "357, Colaba Causeway, Colaba, Mumbai",
    status: "In Transit",
    pickup_time: "2025-10-22T16:30:00Z"
  },
  {
    id: "OD12359",
    customer_name: "Rajesh Pillai",
    customer_phone: "+91 9820098214",
    address: "486, Mulund Link Road, Mulund, Mumbai",
    status: "Pending",
    pickup_time: "2025-10-22T22:00:00Z"
  }
];

export const communicationTemplates = [
  "Your order is out for delivery.",
  "Your order has been delivered.",
  "We missed you. We will try again tomorrow."
];

export const initialCommunicationLogs: CommunicationLog[] = [];
