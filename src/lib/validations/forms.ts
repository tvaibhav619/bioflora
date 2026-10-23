import { z } from "zod";

export const consultationRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please provide your full legal or preferred name (at least 2 characters)." })
    .max(80, { message: "Name cannot exceed 80 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Please provide a valid 10-digit telephone number." })
    .max(15, { message: "Telephone number is too long." }),
  preferredContactMethod: z.enum(["email", "phone", "text"], {
    message: "Please select a preferred contact method.",
  }),
  serviceInterest: z
    .string()
    .min(1, { message: "Please select a treatment category or service of interest." }),
  locationPreference: z
    .string()
    .min(1, { message: "Please select your preferred clinic location." }),
  preferredTimeWindow: z
    .enum(["morning", "afternoon", "evening", "anytime"])
    .default("anytime"),
  privacyConsent: z.literal(true, {
    message: "You must acknowledge and accept the Patient Privacy Notice and Terms.",
  }),
  marketingConsent: z.boolean().default(false),
});

export type ConsultationFormInput = z.infer<typeof consultationRequestSchema>;

export const bookingSubmissionSchema = z.object({
  treatmentSlug: z.string().min(1, "Treatment selection is required"),
  treatmentName: z.string().min(1, "Treatment name is required"),
  locationSlug: z.string().min(1, "Location selection is required"),
  providerSlug: z.string().min(1, "Provider selection is required"),
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Appointment date must be YYYY-MM-DD"),
  timeSlot: z.string().min(1, "Please select an appointment time slot"),
  patientName: z.string().min(2, "Please enter your name"),
  patientEmail: z.string().email("Please enter a valid email address"),
  patientPhone: z.string().min(10, "Please enter a valid phone number"),
  policyConsent: z.boolean().default(true),
  notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
});


export type BookingFormInput = z.infer<typeof bookingSubmissionSchema>;
