import prisma from "@/db";
import SubscriptionCard from "@/components/SubscriptionCard";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function deleteAction(id: number) {
  "use server";
  await prisma.subscription.delete({
    where: { id: id },
  });
  revalidatePath("/");
}

async function getData() {
  const subscriptions = await prisma.subscription.findMany();

  return {
    subscriptions,
  };
}

export default async function Page() {
  const { subscriptions } = await getData();

  return (
    <>
      <div className="flex justify-end mb-10">
        <Link href="/add">
          <button className="px-4 py-2 bg-[#904496] text-white rounded-lg hover:bg-green-600">
            Add Subscription
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        {subscriptions.map((subscription) => {
          const deleteWithId = deleteAction.bind(null, subscription.id);
          return (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onDelete={deleteWithId}
            />
          );
        })}
      </div>
    </>
  );
}
