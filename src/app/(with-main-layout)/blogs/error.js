"use client"
const error = ({error, reset}) => {
    return (
        <div>
            <p>{error?.message}</p>
            <div>
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    );
};

export default error;