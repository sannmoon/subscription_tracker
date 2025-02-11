import { Subscription } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import {
  addMonths,
  addYears,
  differenceInDays,
  format,
  parseISO,
} from "date-fns";

const SubscriptionCard = ({
  subscription,
  onDelete,
}: {
  subscription: Subscription;
  onDelete: () => void;
}) => {
  const { name, price, billingFrequency, paymentDate } = subscription;

  function calculateDaysToNextPayment(
    startDate: string,
    billingFrequency: string
  ) {
    const today = new Date();
    const parsedStartDate = parseISO(startDate);

    let nextPaymentDate = parsedStartDate;

    while (nextPaymentDate <= today) {
      if (billingFrequency === "monthly") {
        nextPaymentDate = addMonths(nextPaymentDate, 1);
      } else if (billingFrequency === "yearly") {
        nextPaymentDate = addYears(nextPaymentDate, 1);
      } else {
        throw new Error(
          'Invalid billing frequency. Use "monthly" or "yearly".'
        );
      }
    }

    const daysLeft = differenceInDays(nextPaymentDate, today);

    return { daysLeft, nextPaymentDate };
  }

  const v = calculateDaysToNextPayment(
    paymentDate.toISOString(),
    billingFrequency
  );

  return (
    <div className="flex items-center p-2 bg-[#0A192F] text-white rounded-lg shadow-lg">
      <h2 className="text-md font-semibold w-1/3">{name}</h2>
      <div className="flex items-center gap-4 flex-row w-2/3">
        <div className="text-center flex-1">
          <p className="text-smd">RM{price.toString()}</p>
          <p className="text-[9px] text-gray-400 uppercase">
            {billingFrequency}
          </p>
        </div>
        <p className="text-xs text-gray-300 flex-1">
          {format(v.nextPaymentDate, "yyyy-MM-dd")}
        </p>
        <div className="text-center flex-1">
          <p className="text-sM">{v.daysLeft}</p>
          <p className="text-[9px] text-gray-400 uppercase">DAYS LEFT</p>
        </div>
      </div>
      <DeleteButton onDelete={onDelete} />
    </div>
  );
};

export default SubscriptionCard;
