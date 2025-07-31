export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDateForForm(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


export function formatDateTime(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options).replace(",", "");
}

export function formatDateOnly(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleString("en-US", options).replace(",", "");
}

export function formatTo12Hour(time24) {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12; // convert 0 -> 12, 13 -> 1, etc.

  return `${hour}:${minute} ${ampm}`;
}

import { parseISO, intervalToDuration, differenceInDays } from "date-fns";

export function getFormattedAgoText(dateString) {
  const date = parseISO(dateString);
  const now = new Date();
  const daysDiff = differenceInDays(now, date);

  if (daysDiff < 30) {
    return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
  }

  const duration = intervalToDuration({ start: date, end: now });
  const { years, months, days } = duration;

  let result = "";

  if (years > 0) result += `${years} year${years > 1 ? "s" : ""} `;
  if (months > 0) result += `${months} month${months > 1 ? "s" : ""} `;
  if (days > 0) result += `${days} day${days > 1 ? "s" : ""}`;

  return result.trim() + " ago";
}

export function timeAgo(lastLogin) {
  if (!lastLogin) return 'Never logged in';

  const now = new Date();
  const past = new Date(lastLogin);
  const diff = now - past; // difference in ms

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;  // approx
  const year = 365 * day;  // approx

  if (diff < minute) return 'Just now';
  if (diff < hour) return Math.floor(diff / minute) + ' minute(s) ago';
  if (diff < day) return Math.floor(diff / hour) + ' hour(s) ago';
  if (diff < month) return Math.floor(diff / day) + ' day(s) ago';
  if (diff < year) return Math.floor(diff / month) + ' month(s) ago';

  return Math.floor(diff / year) + ' year(s) ago';
}

