import prismaClient from "../../prisma";

interface OrderResquest{
    order_id: string
}

class FinishOrderService{
    async execute({order_id}: OrderResquest){
        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                status: true
            }
        })
        return order
    }
}

export {FinishOrderService}