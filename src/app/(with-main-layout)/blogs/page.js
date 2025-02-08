
const page = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    console.log(users);

    return (
        <div className="container mx-auto grid grid-cols-4 gap-6 p-5">
            {
                users?.map(user => <div key={user.id} className="bg-gray-50 shadow p-5 rounded border">
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Phone: {user?.phone}</p>
                    <p>Website: {user?.website}</p>
                </div>)
            }
        </div>
    );
};

export default page;