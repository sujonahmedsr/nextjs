"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarPage = () => {
    
    const navItems = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Gallery',
            link: '/gallary'
        },
        {
            title: 'About Us',
            link: '/about'
        },
        {
            title: 'Contact Us',
            link: '/contact'
        },
    ]
    return (
        <section className="p-4 border-b bg-white sticky top-0 z-10 transition-all">
            <div className="container mx-auto">
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-5">
                        {
                            navItems.map((item, index) => <Link
                                key={index + 1}
                                className={`hover:text-blue-600`}
                                href={item?.link}
                            >
                                {item?.title }
                            </Link>)
                        }
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default NavbarPage;