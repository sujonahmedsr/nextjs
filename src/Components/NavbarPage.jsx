"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavbarPage = () => {
    const pathname = usePathname()
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
            title: 'Blogs',
            link: '/blogs'
        },
        {
            title: 'About Us',
            link: '/about'
        },
        {
            title: 'Contact Us',
            link: '/contact'
        },
        {
            title: 'Make Pdf',
            link: '/pdf'
        },
    ]
    return (
        <section className="p-4 border-b sticky top-0 z-10 transition-all bg-white">
            <div className="container mx-auto">
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-5">
                        {
                            navItems.map((item, index) => <Link
                                key={index + 1}
                                className={` ${pathname === item.link && 'text-blue-700 font-semibold'}`}
                                href={item?.link}
                            >
                                {item?.title}
                            </Link>)
                        }
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default NavbarPage;