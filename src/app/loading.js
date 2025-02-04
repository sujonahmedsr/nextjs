import Link from "next/link";

const loading = () => {
    return (
        <div className="grid place-items-center h-[75vh]">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-semibold">Somethin went wrong ok</h1>
                <Link href={'/'}><button className="px-6 py-2 bg-gray-700 text-white font-medium">Home</button></Link>
            </div>
        </div>
    );
};

export default loading;