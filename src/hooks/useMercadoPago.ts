"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    MercadoPago: new (
      publicKey: string,
      options?: { locale: string }
    ) => {
      createCardToken: (data: {
        cardNumber: string;
        cardholderName: string;
        cardExpirationMonth: string | number;
        cardExpirationYear: string | number;
        securityCode: string;
        identificationType: string;
        identificationNumber: string;
      }) => Promise<{ id: string }>;
    };
  }
}

export function useMercadoPago(publicKey: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (window.MercadoPago) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setError("No se pudo cargar el SDK de Mercado Pago");
    document.body.appendChild(script);
  }, []);

  const getCardToken = useCallback(
    async (data: {
      cardNumber: string;
      cardholderName: string;
      cardExpirationMonth: string | number;
      cardExpirationYear: string | number;
      securityCode: string;
      identificationType: string;
      identificationNumber: string;
    }): Promise<string> => {
      if (!window.MercadoPago) {
        throw new Error("SDK de Mercado Pago no disponible");
      }
      const mp = new window.MercadoPago(publicKey, { locale: "es-CO" });
      const result = await mp.createCardToken(data);
      return result.id;
    },
    [publicKey]
  );

  return { loaded, error, getCardToken };
}
