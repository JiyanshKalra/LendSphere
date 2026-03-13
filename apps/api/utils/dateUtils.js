/**
 * Calculates the date when a loan is expected to be fully paid off.
 * 
 * @param {Date|string} startDate - The date the loan originated.
 * @param {number} termMonths - The term of the loan in months.
 * @returns {Date} The maturity date.
 */
function calculateMaturityDate(startDate, termMonths) {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + termMonths);
  return date;
}

/**
 * Gets the next payment date given the current date and the day of the month payments are due.
 * 
 * @param {Date|string} currentDate - The current date.
 * @param {number} paymentDayOfMonth - The day of the month the payment is due (e.g., 15 for 15th).
 * @returns {Date} The next payment date.
 */
function getNextPaymentDate(currentDate, paymentDayOfMonth) {
  const date = new Date(currentDate);
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  let nextPaymentDate;

  if (currentDay < paymentDayOfMonth) {
    // Payment is later this month
    nextPaymentDate = new Date(currentYear, currentMonth, paymentDayOfMonth);
  } else {
    // Payment is next month
    nextPaymentDate = new Date(currentYear, currentMonth + 1, paymentDayOfMonth);
  }

  // Handle edge cases where the next month doesn't have the payment day (e.g., Feb 30th)
  // If we set Feb 30th, JS date rolls over to March. We check if the month rolled over *too far*.
  const expectedMonth = currentDay < paymentDayOfMonth ? currentMonth : (currentMonth + 1) % 12;
  if (nextPaymentDate.getMonth() !== expectedMonth) {
     // Go to the last day of the expected month
     nextPaymentDate = new Date(nextPaymentDate.getFullYear(), expectedMonth + 1, 0);
  }

  return nextPaymentDate;
}

/**
 * Checks if a specific date is past due compared to today.
 * 
 * @param {Date|string} dueDate - The date the payment was due.
 * @returns {boolean} True if the current date is strictly after the due date.
 */
function isDatePastDue(dueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  return today > due;
}

/**
 * Calculates the number of days a payment is late.
 * 
 * @param {Date|string} dueDate - The expected due date.
 * @param {Date|string} [currentDate=new Date()] - The date to check against (defaults to today).
 * @returns {number} The number of days late. Returns 0 if not late.
 */
function getDaysLate(dueDate, currentDate = new Date()) {
  const due = new Date(dueDate).getTime();
  const current = new Date(currentDate).getTime();
  
  if (current <= due) return 0;
  
  const diffTime = Math.abs(current - due);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
}

module.exports = {
  calculateMaturityDate,
  getNextPaymentDate,
  isDatePastDue,
  getDaysLate
};
