import { Subscription } from "@prisma/client";

interface SubscriptionFormProps {
  action: (formData: FormData) => Promise<void>;
  data?: Subscription | null;
  type: "edit" | "add";
}

export default function SubscriptionForm({
  action,
  data,
  type,
}: SubscriptionFormProps) {
  const formattedDate = data?.paymentDate
    ? data.paymentDate.toISOString().split("T")[0]
    : "";

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={data?.name}
          className="w-full px-3 py-2 bg-[#1E2A4A] rounded-md"
        />
      </div>
      <div>
        <label htmlFor="paymentDate" className="block mb-1">
          Payment Date
        </label>
        <input
          id="paymentDate"
          name="paymentDate"
          type="date"
          required
          defaultValue={formattedDate}
          className="w-full px-3 py-2 bg-[#1E2A4A] rounded-md"
        />
      </div>
      <div>
        <label htmlFor="billingFrequency" className="block mb-1">
          Billing Frequency
        </label>
        <select
          id="billingFrequency"
          name="billingFrequency"
          required
          defaultValue={data?.billingFrequency}
          className="w-full px-3 py-2 bg-[#1E2A4A] rounded-md"
        >
          <option value="">Select frequency</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          required
          defaultValue={data?.price?.toString()}
          className="w-full px-3 py-2 bg-[#1E2A4A] rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#904496] text-white rounded-lg hover:bg-green-600"
      >
        {type === "edit" ? "Update" : "Add"} Subscription
      </button>
    </form>
  );
}
