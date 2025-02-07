import Image from 'next/image';
import React from 'react';

const Gallary = () => {
    return (
        <div>
            <div>
                <h1>Regular Image</h1>
                <img src='https://media.licdn.com/dms/image/v2/D4D12AQFJWfUQaQ1qPg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675674296261?e=2147483647&v=beta&t=P8Jq3VX9Y4XbyaI7Y1CwViZVcW3LzVONrntTaogyL94' />
            </div>
            <div>
                <h1>Regular Image</h1>
                <Image src='https://media.licdn.com/dms/image/v2/D4D12AQFJWfUQaQ1qPg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675674296261?e=2147483647&v=beta&t=P8Jq3VX9Y4XbyaI7Y1CwViZVcW3LzVONrntTaogyL94' width={500} height={500} alt='practice image'/>
            </div>
        </div>
    );
};

export default Gallary;