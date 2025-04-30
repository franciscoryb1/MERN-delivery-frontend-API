import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
}

const OrderStatusHeader = ({ order }: Props) => {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);
        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = created.getHours();
        const minutes = created.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes; // formateo los minutos a 2 digitos

        return `${hours}:${paddedMinutes}`;
    };

    const getorderStatusInfo = () => {
        return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0];
    };

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight flex flex-col gap-5 md:flex-row md:justify-between">
                <span className="">Order Status: {getorderStatusInfo().label}</span>
                <span>Expected By: {getExpectedDelivery()}</span>
            </h1>
            <Progress className="animate-pulse" value={getorderStatusInfo().progressValue} />
        </>
    )
};

export default OrderStatusHeader;