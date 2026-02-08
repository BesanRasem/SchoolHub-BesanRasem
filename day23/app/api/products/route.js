import { addProduct,getProduct } from "@/lib/productsStore";
export async function Get() {
    return Response.json(getProducts());
    
}
export async function Post(request) {
    let body;
    try
    {
        body = await request.json();
    }
    catch(e){
        return Response.json({error:"invalid JSON"},{status:400});
    }
    
}