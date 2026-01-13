import { useState, useEffect } from "react";

export interface Booking {
  id: string;
  experience: string;
  location: string;
  date: string;
  time: string;
  people: number;
  total: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  imageUrl: string;
  guideName: string;
  createdAt: string;
}

const BOOKINGS_KEY = "vai-por-mim-bookings";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const addBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updated);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  };

  return { bookings, addBooking, cancelBooking };
};
