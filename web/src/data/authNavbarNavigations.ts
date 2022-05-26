const authNavbarNavigations = [
    {
        title: "Account",
        child: [
            {
                title: "Profile",
                child: [
                    {
                        title: "View Profile",
                        url: "/profile",
                    },
                    {
                        title: "Edit Profile",
                        url: "/profile/edit",
                    },
                    {
                        title: "Address",
                        url: "/address",
                    },
                    {
                        title: "Logout",
                        url: "/signin",
                    },
                ],
            },
            {
                title: "Orders",
                child: [
                    {
                        title: "Order List",
                        url: "/orders",
                    },
                    {
                        title: "Order Details",
                        url: "/orders/5452423",
                    },
                ],
            },
            {
                title: "Wishlist",
                url: "/wish-list",
            },
        ],
    },
    {
        title: "Account"
    },
    {
        title: "Books",
        url: "/books",
    },
    {
        title: "Home",
        url: "/",
    },
];

export default authNavbarNavigations;