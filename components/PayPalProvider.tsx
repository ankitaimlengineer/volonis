'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  clientId: "AU1zeYMqFtOBYtWro5JAUaVKl3MkWmyJ9JvVccpCuEsQ41DYtEYiuOho6aBnh7VeGx990BMJXz-_m2Kb", // અહિયાં તમારો PayPal નો Sandbox Client ID મૂકી દેવો
  currency: "INR",
  intent: "capture",
};

export default function PayPalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
}