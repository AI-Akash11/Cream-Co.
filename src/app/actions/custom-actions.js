"use server";

/**
 * Dummy server action to handle custom cake order submission.
 * In a real app, this would save to a database and trigger notifications.
 */
export async function submitCustomOrder(data) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return {
    success: true,
    message:
      "Your custom order request has been received! We'll contact you soon.",
  };
}
