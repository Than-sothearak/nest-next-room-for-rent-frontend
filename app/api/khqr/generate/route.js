const {BakongKHQR, khqrData, IndividualInfo, MerchantInfo, SourceInfo} = require("bakong-khqr");


export async function GET(request) {
 
  const optionalData = {
  
    MerchantID: '1234567890',
    currency: khqrData.currency.khr,
    bank_account: 'than_sothearak@aclb',
    amount: 8600,
    mobileNumber: "85586643253",
    storeLabel: "Room for rent",
    terminalLabel: "Cashier_1",
    purposeOfTransaction: "oversea",
    languagePreference: "km",
    merchantNameAlternateLanguage: "THAN SOTHEARAK",
    merchantCityAlternateLanguage: "Phnom Penh",
    upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO",
    expirationTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
  };

  try {
    const merchantInfo = new MerchantInfo(
      "than_sothearak@aclb",
      "Than Sothearak",
      "Phnom Penh",
      "123456",
      "ABA Bank",
      optionalData
    );

 
   const KHQR = new BakongKHQR();
  const merchant = KHQR.generateMerchant(merchantInfo); console.log("qr: " + merchant.data.qr);

    console.log("qr: " + merchant.data.qr);
console.log("md5: " + merchant.data.md5);

    return new Response(JSON.stringify(merchant.data.md5), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("KHQR generation error:", err);
    return new Response("Failed to generate KHQR", { status: 500 });
  }
}
