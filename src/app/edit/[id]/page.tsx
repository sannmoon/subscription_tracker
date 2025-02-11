import SubscriptionForm from "@/components/SubscriptionForm";
import { redirect } from "next/navigation";
import prisma from "@/db";

async function editAction(id: number, formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const paymentDate = formData.get("paymentDate") as string;
  const billingFrequency = formData.get("billingFrequency") as string;
  const price = formData.get("price") as string;

  await prisma.subscription.update({
    where: { id: id },
    data: {
      name,
      paymentDate: new Date(paymentDate),
      billingFrequency,
      price: parseFloat(price),
    },
  });
  redirect("/");
}

async function getData(id: string) {
  try {
    const subscription = await prisma.subscription.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    return {
      subscription,
    };
  } catch {
    redirect("/");
  }
}

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { subscription } = await getData(id);

  const editActionWithId = editAction.bind(null, Number(id));

  return (
    <SubscriptionForm
      action={editActionWithId}
      data={subscription}
      type="edit"
    />
  );
}
