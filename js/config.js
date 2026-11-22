
const WHATSAPP_NUMBER = "+966539677087";

const GENERAL_MESSAGE =
  "أهلًا BIXOPLAY 👋\n" +
  "أنا جاي من موقع BIXOPLAY الرسمي، " +
  "وحابب أستفسر عن الباقات المتاحة وطريقة الاشتراك.";

export function createWhatsAppLink(message) {
  return (
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(message)
  );
}

export const CONTACT_CONFIG = {
  whatsappNumber: WHATSAPP_NUMBER,

  whatsappSupportLink: createWhatsAppLink(
    GENERAL_MESSAGE
  ),

  telegram: "https://t.me/bixoplaay",

  facebook: "YOUR_FACEBOOK_URL"
};
