const base = (import.meta as any).env.BASE_URL || '/';

const data = {
    headerMenus:[
        {
            name: "Today's Deals", 
            href: "/search?category=all&q=today's%20deals",
        },
        {
            name: "New Arrivals", 
            href: "/search?category=all&q=new%20arrivals",
        },
        {
            name: "Best Sellers", 
            href: "/search?category=all&q=best%20sellers",
        },
        {
            name: "Trending", 
            href: "/search?category=all&q=trending",
        },
        {
            name: "Browsing History", 
            href: "/#browsing-history",
        },
        {
            name: "Customer Service", 
            href: "/pages/customer-service",
        },
        {
            name: "About Us",
            href: "/pages/about-us",
        },
        {
            name: "Help",
            href: "/pages/help",
        }
    ],
    carousel:[
        {
    title: 'Gentle & Rash-Free Sanitary Pads',
    buttonCaption: 'Shop Now',
    url: '/search?category=sanitary-pads&q=gentle%20rash%20free',
    image: `/images/carouselImages/nua-banner1.jpg`,
    isPublished: true
},
{
    title: 'Personal Hygiene Essentials',
    buttonCaption: 'Shop Now',
    url: '/search?category=hygiene&q=essentials',
    image: `/images/carouselImages/nua-banner2.jpeg`,
    isPublished: true
},
{
    title: 'Customised Period Care Packs',
    buttonCaption: 'Shop Now',
    url: '/search?category=period-care&q=customised%20packs',
    image: `/images/carouselImages/nua-banner3.jpeg`,
    isPublished: true
}

    ]
}
export default data;