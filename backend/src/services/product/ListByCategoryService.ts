import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id}: ProductRequest){
        //id-categoria-produto
        const findCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })

        return findCategory

    }
}

export {ListByCategoryService}