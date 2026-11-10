import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  Booking,
  BusRoute,
  BusSchedule,
  Destination,
  Enquiry,
  SiteSettings,
  TourPackage,
} from '../types';
import {
  DEFAULT_BUS_ROUTES,
  DEFAULT_BUS_SCHEDULES,
  DEFAULT_DESTINATIONS,
  DEFAULT_PACKAGES,
  DEFAULT_SITE_SETTINGS,
} from '../data/defaultData';

const ENQUIRIES_COLLECTION = 'enquiries';
const BOOKINGS_COLLECTION = 'bookings';
const PACKAGES_COLLECTION = 'packages';
const ROUTES_COLLECTION = 'busRoutes';
const BUSES_COLLECTION = 'buses';
const DESTINATIONS_COLLECTION = 'destinations';
const SETTINGS_COLLECTION = 'siteSettings';

export async function submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const enquiryId = 'ENQ-' + Date.now().toString().slice(-6);
  const path = `${ENQUIRIES_COLLECTION}/${enquiryId}`;

  const payload: Enquiry = {
    ...enquiryData,
    id: enquiryId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, ENQUIRIES_COLLECTION, enquiryId), {
      ...payload,
      timestamp: serverTimestamp(),
    });
    return enquiryId;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.CREATE, path);
    } catch {
      // Return enquiryId so client flow completes even if offline
      return enquiryId;
    }
  }
}

export async function submitBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'bookingStatus'>): Promise<string> {
  const bookingId = 'HMC-' + Math.floor(100000 + Math.random() * 900000);
  const path = `${BOOKINGS_COLLECTION}/${bookingId}`;

  const payload: Booking = {
    ...bookingData,
    id: bookingId,
    bookingStatus: 'requested',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, BOOKINGS_COLLECTION, bookingId), {
      ...payload,
      timestamp: serverTimestamp(),
    });
    return bookingId;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.CREATE, path);
    } catch {
      return bookingId;
    }
  }
}

export async function fetchEnquiries(): Promise<Enquiry[]> {
  try {
    const snap = await getDocs(collection(db, ENQUIRIES_COLLECTION));
    const items: Enquiry[] = [];
    snap.forEach((docSnap) => {
      items.push(docSnap.data() as Enquiry);
    });
    return items;
  } catch (error) {
    console.warn('Fallback: could not fetch enquiries from Firestore', error);
    return [];
  }
}

export async function updateEnquiryStatus(enquiryId: string, status: Enquiry['status']) {
  const path = `${ENQUIRIES_COLLECTION}/${enquiryId}`;
  try {
    await updateDoc(doc(db, ENQUIRIES_COLLECTION, enquiryId), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function fetchBookings(): Promise<Booking[]> {
  try {
    const snap = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const items: Booking[] = [];
    snap.forEach((docSnap) => {
      items.push(docSnap.data() as Booking);
    });
    return items;
  } catch (error) {
    console.warn('Fallback: could not fetch bookings from Firestore', error);
    return [];
  }
}

export async function updateBookingStatus(bookingId: string, status: Booking['bookingStatus']) {
  const path = `${BOOKINGS_COLLECTION}/${bookingId}`;
  try {
    await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), { bookingStatus: status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function fetchPackages(): Promise<TourPackage[]> {
  try {
    const snap = await getDocs(collection(db, PACKAGES_COLLECTION));
    if (!snap.empty) {
      const items: TourPackage[] = [];
      snap.forEach((d) => items.push(d.data() as TourPackage));
      return items;
    }
    return DEFAULT_PACKAGES;
  } catch {
    return DEFAULT_PACKAGES;
  }
}

export async function saveTourPackage(pkg: TourPackage) {
  const path = `${PACKAGES_COLLECTION}/${pkg.id}`;
  try {
    await setDoc(doc(db, PACKAGES_COLLECTION, pkg.id), pkg);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeTourPackage(pkgId: string) {
  const path = `${PACKAGES_COLLECTION}/${pkgId}`;
  try {
    await deleteDoc(doc(db, PACKAGES_COLLECTION, pkgId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function fetchBusRoutes(): Promise<BusRoute[]> {
  try {
    const snap = await getDocs(collection(db, ROUTES_COLLECTION));
    if (!snap.empty) {
      const items: BusRoute[] = [];
      snap.forEach((d) => items.push(d.data() as BusRoute));
      return items;
    }
    return DEFAULT_BUS_ROUTES;
  } catch {
    return DEFAULT_BUS_ROUTES;
  }
}

export async function saveBusRoute(route: BusRoute) {
  const path = `${ROUTES_COLLECTION}/${route.id}`;
  try {
    await setDoc(doc(db, ROUTES_COLLECTION, route.id), route);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function fetchBusSchedules(): Promise<BusSchedule[]> {
  try {
    const snap = await getDocs(collection(db, BUSES_COLLECTION));
    if (!snap.empty) {
      const items: BusSchedule[] = [];
      snap.forEach((d) => items.push(d.data() as BusSchedule));
      return items;
    }
    return DEFAULT_BUS_SCHEDULES;
  } catch {
    return DEFAULT_BUS_SCHEDULES;
  }
}

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const snap = await getDocs(collection(db, DESTINATIONS_COLLECTION));
    if (!snap.empty) {
      const items: Destination[] = [];
      snap.forEach((d) => items.push(d.data() as Destination));
      return items;
    }
    return DEFAULT_DESTINATIONS;
  } catch {
    return DEFAULT_DESTINATIONS;
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDoc(doc(db, SETTINGS_COLLECTION, 'main'));
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
    return DEFAULT_SITE_SETTINGS;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function saveSiteSettings(settings: SiteSettings) {
  const path = `${SETTINGS_COLLECTION}/main`;
  try {
    await setDoc(doc(db, SETTINGS_COLLECTION, 'main'), settings);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
