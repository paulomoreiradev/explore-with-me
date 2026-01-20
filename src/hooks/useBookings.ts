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

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "mock-completed-1",
    experience: "Tour Gastronômico",
    location: "Jijoca de Jericoacoara, CE",
    date: "10 Jan 2025",
    time: "09:00",
    people: 2,
    total: 300,
    status: "completed",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    guideName: "Maria Silva",
    createdAt: "2025-01-10T09:00:00.000Z",
  },
  {
    id: "mock-confirmed-1",
    experience: "Trilha ao Pôr do Sol",
    location: "Guaramiranga, CE",
    date: "25 Jan 2025",
    time: "15:00",
    people: 3,
    total: 360,
    status: "confirmed",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    guideName: "João Santos",
    createdAt: "2025-01-18T10:00:00.000Z",
  },
];

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge mock bookings with stored ones (avoid duplicates)
      const mockIds = MOCK_BOOKINGS.map(b => b.id);
      const filtered = parsed.filter((b: Booking) => !mockIds.includes(b.id));
      setBookings([...MOCK_BOOKINGS, ...filtered]);
    } else {
      setBookings(MOCK_BOOKINGS);
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
