// app/users/[id]/page.tsx

export const metadata = {
    title: "Details Blogs page",
    desciption: "create Details blogs page."
}

const UserDetailsPage = async ({ params }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params?.id}`);
    const user = await res.json();

    if (!user.id) {
        return <p>User not found</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">Username: {user.username}</p>
            <p>Email: <a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a></p>
            <p>Phone: {user.phone}</p>
            <p>Website: <a href={`https://${user.website}`} target="_blank" className="text-blue-500">{user.website}</a></p>

            <h2 className="mt-4 text-xl font-semibold">Address</h2>
            <p>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>

            <h2 className="mt-4 text-xl font-semibold">Company</h2>
            <p className="font-bold">{user.company.name}</p>
            <p>{user.company.catchPhrase}</p>
            <p className="text-gray-500">{user.company.bs}</p>
        </div>
    );
};

export default UserDetailsPage;
