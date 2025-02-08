import Link from "next/link";

export const metadata = {
    title: "Blogs page",
    desciption: "create blogs page."
}

const page = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: "force-cache"
    })
    const users = await res.json()

    return (
        <div className="container mx-auto grid grid-cols-4 gap-6 p-5">
            {
                users?.map(user => <div key={user.id} className="bg-gray-50 shadow p-5 rounded border">
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Phone: {user?.phone}</p>
                    <p>Website: {user?.website}</p>
                    <Link href={`blogs/${user?.id}`}>
                        <button className="px-6 py-2 border bg-gray-100">View Details</button>
                    </Link>
                </div>)
            }
        </div>
    );
};

export default page;