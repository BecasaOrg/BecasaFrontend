"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMercadoPago } from "@/hooks/useMercadoPago";
import StepIndicator from "./_components/StepIndicator";
import InfoPanel from "./_components/InfoPanel";
import Alert from "./_components/Alert";
import { FormField, FormSelect } from "./_components/FormField";
import TagInput from "./_components/TagInput";
import FileUpload from "./_components/FileUpload";
import { getCampById } from "@/app/actions/camp.action";
import CouponVerifier from "@/components/coupons/coupon-verifier";

const reasonTranslations: Record<string, string> = {
  cc_rejected_other_reason: "Tarjeta rechazada. Intenta con otro medio de pago.",
  cc_rejected_bad_filled_card_number: "Número de tarjeta inválido.",
  cc_rejected_bad_filled_date: "Fecha de vencimiento inválida.",
  cc_rejected_bad_filled_security_code: "Código de seguridad inválido.",
  cc_rejected_card_disabled: "Tarjeta deshabilitada.",
  cc_rejected_insufficient_amount: "Fondos insuficientes.",
  cc_rejected_max_attempts: "Se excedió el límite de intentos.",
  cc_rejected_duplicated_payment: "Pago duplicado.",
  cc_rejected_high_risk: "Transacción rechazada por seguridad.",
  cc_call_for_authorize: "Debes autorizar el pago con tu banco.",
};

const translateReason = (detail: string) => reasonTranslations[detail] || detail;

const posiciones = [
  "Delantero", "Mediocampista", "Defensor", "Portero",
  "Base", "Escolta", "Alero", "Ala-Pívot", "Pívot",
  "Libero", "Opuesto", "Receptor", "Armador",
  "Sprinter", "Fondista", "Saltador", "Lanzador",
];

const nivelesJuego = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
  { value: "élite / competitivo", label: "Élite / Competitivo" },
];

const tallasCalcetas = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

function FormularioRegistroInner() {
  const searchParams = useSearchParams();
  const campId = searchParams.get("camp_id");
  const stepFromParams = searchParams.get("step");

  const router = useRouter();

  const [posicionesSeleccionadas, setPosicionesSeleccionadas] = useState<string[]>([]);
  const [clubsSeleccionados, setClubsSeleccionados] = useState<string[]>([]);
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [step, setStep] = useState<"register" | "payment">((stepFromParams as "register" | "payment") || "register");
  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [serverCampPrice, setServerCampPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [payerEmail, setPayerEmail] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");

  useEffect(() => {
    if (!campId) return;
    getCampById(Number(campId)).then((camp) => {
      setServerCampPrice(camp.price);
      setRegistrationId(camp.registration_id);
    });
  }, [campId, router]);

  const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!;
  const { loaded: mpLoaded, error: mpError, getCardToken } = useMercadoPago(MP_PUBLIC_KEY);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const userId = localStorage.getItem("user_id");
    const authToken = localStorage.getItem("auth_token");

    if (!userId || !authToken) {
      setMessage({ type: "error", text: "Por favor inicia sesión para continuar con el registro." });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);

    setPayerEmail(formData.get("guardian_email") as string);
    setIdentificationNumber(formData.get("identification_number") as string);

    if (campId) formData.append("camp_id", campId);
    formData.append("user_id", userId);
    formData.set("position", posicionesSeleccionadas.join(", "));
    formData.set("club_name", clubsSeleccionados.join(", "));

    const fileInput = formData.get("health_insurance_path");
    if (fileInput instanceof File && fileInput.size === 0) {
      formData.delete("health_insurance_path");
    }

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const id = data.data?.id ?? data.data?.registration_id ?? data.registration_id;
        setRegistrationId(id);
        setStep("payment");
        setMessage(null);
      } else {
        setMessage({ type: "error", text: data.message || "Hubo un error al procesar el registro." });
      }
    } catch {
      setMessage({ type: "error", text: "Error de conexión. Intente nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      setMessage({ type: "error", text: "Sesión expirada. Inicia sesión nuevamente." });
      setIsSubmitting(false);
      return;
    }

    if (!registrationId) {
      setMessage({ type: "error", text: "Error: no hay registro activo." });
      setIsSubmitting(false);
      return;
    }

    if (!mpLoaded) {
      setMessage({ type: "error", text: "Mercado Pago no se ha cargado aún. Intente nuevamente." });
      setIsSubmitting(false);
      return;
    }

    const form = e.currentTarget.elements;
    const cardNumber = (form.namedItem("card_number") as HTMLInputElement).value.replace(/\s/g, "");
    const cardholderName = (form.namedItem("cardholder_name") as HTMLInputElement).value;
    const cardExpiry = (form.namedItem("card_expiry") as HTMLInputElement).value;
    const cardCvv = (form.namedItem("card_cvv") as HTMLInputElement).value;
    const payerEmailInput = (form.namedItem("payer_email") as HTMLInputElement)?.value || payerEmail;
    const payerIdInput = (form.namedItem("payer_identification") as HTMLInputElement)?.value || identificationNumber;

    if (!cardNumber || !cardholderName || !cardExpiry || !cardCvv) {
      setMessage({ type: "error", text: "Completa todos los datos de la tarjeta." });
      setIsSubmitting(false);
      return;
    }

    const [expMonth, expYear] = cardExpiry.split("/");

    if (!expMonth || !expYear) {
      setMessage({ type: "error", text: "Formato de fecha inválido. Usa MM/AA." });
      setIsSubmitting(false);
      return;
    }

    try {
      const token = await getCardToken({
        cardNumber,
        cardholderName,
        cardExpirationMonth: expMonth,
        cardExpirationYear: "20" + expYear,
        securityCode: cardCvv,
        identificationType: "CC",
        identificationNumber: payerIdInput,
      });

      const payload = {
        token,
        transaction_amount: Number(serverCampPrice) ?? 0,
        description: campId
          ? `Inscripción: Campamento ${campId}`
          : "Inscripción campamento",
        installments: 1,
        payer: {
          email: payerEmailInput,
          identification: {
            type: "CC",
            number: payerIdInput,
          },
        },
        registration_id: registrationId,
        ...(campId ? { camp_id: Number(campId) } : {}),
      };

      const response = await fetch("/api/payments/process-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success && data.status !== "rejected") {
        setMessage({ type: "success", text: "Pago procesado exitosamente." });
      } else {
        setMessage({ type: "error", text: translateReason(data.detail) || data.message || data.error || "Hubo un error al procesar el pago." });
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Error de conexión. Intente nuevamente.";
      const msg = errMsg.includes("token")
        ? "Error al procesar la tarjeta. Verifica los datos e intenta nuevamente."
        : errMsg;
      setMessage({ type: "error", text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const btnClass =
    "w-full bg-[#AAFF00] text-black font-bold text-base rounded-full py-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100";

  return (
    <section className="min-h-screen bg-[#0A0E2A] flex items-center justify-center px-4 pb-12 pt-17 relative">
      <div
        className="absolute right-0 -bottom-50 h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url('/img/becasa/Vector.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "auto 100%",
          width: "100%",
        }}
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 rounded-2xl overflow-hidden shadow-2xl border border-white/5 px-5 py-5 bg-[#060f18]/80 backdrop-blur-lg relative z-10">
        <div className="bg-[#0a1520]/50 px-8 py-10 rounded-2xl">
          <StepIndicator step={step} onChange={setStep} />

          {step === "register" && (
            <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              <Alert message={message} className="sm:col-span-2" />

              <FormField
                label="Número de identificación (C.C o T.I) *"
                name="identification_number"
                type="text"
                placeholder="Numero..."
                required
                maxLength={10}
              />

              <FormField
                label="Años de experiencia competitiva *"
                name="years_experience"
                type="number"
                placeholder="Numero..."
                required
                min="0"
              />

              <TagInput
                label="Posición en la cancha *"
                tags={posicionesSeleccionadas}
                onAdd={(p) => setPosicionesSeleccionadas((prev) => [...prev, p])}
                onRemove={(p) => setPosicionesSeleccionadas((prev) => prev.filter((x) => x !== p))}
                placeholder="Escribe/Selecciona Múltiples Opciones"
                suggestions={posiciones}
                colSpan
                name="position"
              />

              <FormSelect
                label="Nivel de juego estimado *"
                name="skill_level"
                options={nivelesJuego}
                required
              />

              <FormSelect
                label="Talla de camiseta *"
                name="shirt_size"
                options={tallasCalcetas}
                required
              />

              <TagInput
                label="Club(s) o equipo(s) al que perteneces *"
                tags={clubsSeleccionados}
                onAdd={(c) => setClubsSeleccionados((prev) => [...prev, c])}
                onRemove={(c) => setClubsSeleccionados((prev) => prev.filter((x) => x !== c))}
                placeholder="Escribe y presiona Enter para agregar"
                suggestionsLabel="Escribe y presiona Enter para agregar"
                colSpan
                name="club_name"
              />

              <FormField
                label="Nombre del colegio o universidad actual *"
                name="school_name"
                type="text"
                placeholder="Escribe..."
                colSpan
                required
              />

              <FileUpload
                label="Certificado de afiliación a la EPS o carnet de salud *"
                name="health_insurance_path"
                fileName={archivoNombre}
                fileRef={fileRef}
                onChange={setArchivoNombre}
              />

              <FormField
                label="¿Tiene alguna restricción alimenticia o alergias? *"
                name="dietary_restrictions"
                type="text"
                placeholder="Escribe..."
              />

              <FormField
                label="¿Tiene alguna condición médica que debamos conocer?"
                name="medical_conditions"
                type="text"
                placeholder="Escribe..."
                colSpan
              />

              <div className="sm:col-span-2 border-t border-white/5 pt-2" />

              <FormField
                label="Nombre completo del acudiente *"
                name="guardian_name"
                type="text"
                placeholder="Nombre Completo"
                required
              />

              <FormField
                label="Número de contacto del acudiente *"
                name="guardian_phone"
                type="tel"
                placeholder="+57"
                required
              />

              <FormField
                label="Email del acudiente *"
                name="guardian_email"
                type="email"
                placeholder="Usuario@Gmail.Com"
                required
              />

              <div className="flex items-end">
                <button type="submit" disabled={isSubmitting} className={btnClass}>
                  {isSubmitting ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handlePay} className="grid grid-cols-1 gap-x-5 gap-y-4">
              <Alert message={message} />

              {message?.type === "success" ? (
                <div className="text-center py-6">
                  <p className="text-[#AAFF00] text-lg font-bold mb-2">¡Pago completado!</p>
                  <p className="text-white/60 text-sm">Tu inscripción está confirmada.</p>
                </div>
              ) : (
                <>
                  <div className="border border-[#AAFF00]/20 bg-[#AAFF00]/5 rounded-lg p-3 mb-2">
                    <p className="text-[#AAFF00] text-sm font-bold">Total a pagar $ {priceLoading ? "..." : Number(serverCampPrice ?? 0).toLocaleString("es-CO")}</p>
                    {/* <p className="text-white/70 text-xs">
                      Registro #{registrationId} creado correctamente. Ahora completa el pago
                      para confirmar tu cupo.
                    </p> */}
                  </div>

                  {mpError && <p className="text-red-400 text-xs">{mpError}</p>}

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Email del pagador *"
                      name="payer_email"
                      type="email"
                      placeholder="usuario@gmail.com"
                      defaultValue={payerEmail}
                      required
                    />
                    <FormField
                      label="Número de identificación *"
                      name="payer_identification"
                      type="text"
                      placeholder="C.C o T.I"
                      defaultValue={identificationNumber}
                      required
                      maxLength={10}
                    />
                  </div>

                  <FormField
                    label="Nombre del titular de la tarjeta *"
                    name="cardholder_name"
                    type="text"
                    placeholder="Como aparece en la tarjeta"
                    required
                    autoComplete="cc-name"
                  />

                  <FormField
                    label="Número de la tarjeta *"
                    name="card_number"
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    required
                    autoComplete="cc-number"
                    maxLength={19}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                      e.target.value = raw.replace(/(.{4})/g, "$1 ").trim();
                    }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="Fecha de vencimiento *"
                      name="card_expiry"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/AA"
                      required
                      autoComplete="cc-exp"
                      maxLength={5}
                      onChange={(e) => {
                        let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (raw.length >= 3) {
                          raw = raw.slice(0, 2) + "/" + raw.slice(2);
                        }
                        e.target.value = raw;
                      }}
                    />

                    <FormField
                      label="CVV *"
                      name="card_cvv"
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      required
                      autoComplete="cc-csc"
                      maxLength={4}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting || priceLoading} className={btnClass}>
                    {isSubmitting ? "Procesando pago..." : `Pagar $ ${Number(serverCampPrice ?? 0).toLocaleString("es-CO")}`}
                  </button>
                </>
              )}
            </form>
          )}
        </div>

        <InfoPanel />
        <CouponVerifier />
      </div>
    </section>
  );
}

export default function FormularioRegistro() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0E2A] flex items-center justify-center text-white">
          Cargando formulario...
        </div>
      }
    >
      <FormularioRegistroInner />
    </Suspense>
  );
}
