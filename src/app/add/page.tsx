import SubscriptionForm from "@/components/SubscriptionForm";
import prisma from "@/db";
import { redirect } from "next/navigation";

async function saveAction(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const paymentDate = formData.get("paymentDate") as string;
  const billingFrequency = formData.get("billingFrequency") as string;
  const price = formData.get("price") as string;

  if (!name || !paymentDate || !billingFrequency || !price) {
    throw new Error("All fields are required");
  }

  await prisma.subscription.create({
    data: {
      name,
      paymentDate: new Date(paymentDate),
      billingFrequency,
      price: parseFloat(price),
    },
  });

  redirect("/");
}

export default function AddSubscription() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Add Subscription</h1>
      <SubscriptionForm action={saveAction} type="add" />
    </>
  );
}
