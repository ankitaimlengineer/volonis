'use client';
import React from 'react';

export default function PaymentButton() {
  const handlePayment = () => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      alert('Razorpay SDK loaded નથી થયો. કૃપા કરીને ઇન્ટરનેટ કનેક્શન અથવા સ્ક્રીપ્ટ ચેક કરો.');
      return;
    }

    const options = {
      key: "rzp_test_TLAmZWNiLRQA5m", 
      amount: 50000, // ₹500
      currency: "INR",
      name: "VOLONIS",
      description: "Test Payment",
      handler: async function (response: any) {
        alert("પેમેન્ટ સફળ થયું! Payment ID: " + response.razorpay_payment_id);

        try {
          const res = await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerName: "Ankit Thummar",
              email: "ankitthummar@gmail.com",
              productName: "VOLONIS Test Plan",
              plan: "Standard",
              amount: "500",
              paymentId: response.razorpay_payment_id,
              durationDays: 30
            }),
          });

          // ૧. પહેલા રિસ્પોન્સને ટેક્સ્ટ તરીકે લો (જેથી HTML આવે તો પણ ક્રેશ ન થાય)
          const responseText = await res.text();
          
          let result;
          try {
            result = JSON.parse(responseText);
          } catch (e) {
            // જો બેકએન્ડમાંથી HTML એરર પેજ આવ્યું હશે તો અહીં પકડાશે અને કન્સોલમાં દેખાશે
            console.error("Backend HTML Error Response:", responseText);
            alert("સર્વરમાં એરર છે. કૃપા કરીને VS Code નું ટર્મિનલ ચેક કરો.");
            return;
          }

          // ૨. જો સફળ થાય તો જ આગળ વધો
          if (result && result.success) {
            console.log("ડેટા સફળતાપૂર્વક એડમિન પેનલમાં સિન્ક થઈ ગયો!");
            alert("પેમેન્ટ અને ડેટા સફળતાપૂર્વક સેવ થઈ ગયા છે!");
          } else {
            console.error("Server Message:", result?.message);
          }

        } catch (error) {
          console.error("એડમિન પેનલ સાથે સિંક કરવામાં એરર:", error);
        }
      },
      prefill: {
        name: "Ankit Thummar",
        email: "ankitthummar@gmail.com",
        contact: "9876543210"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button 
        onClick={handlePayment}
        style={{ padding: '12px 24px', background: '#3399cc', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
      >
        Pay Now (Razorpay Test)
      </button>
    </div>
  );
}