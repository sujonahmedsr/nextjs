
const page = async ({params, searchParams}) => {
    const {productId} = await params
    console.log(await searchParams);
    
    return (
        <div className="grid place-items-center h-[75vh]">
            product id {productId}
        </div>
    );
};

export default page;