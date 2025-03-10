// Import bcrypt for password hashing
import bcrypt from 'bcrypt';

// Sample data for Users with hashed passwords
const users = [
    {
        userID: 1,
        name: "Alice Johnson",
        email: "alice@gmail.com",
        password: bcrypt.hashSync("AlicePassword123", 10), // hashed password
        isAdmin: true
    },
    {
        userID: 2,
        name: "Bob Smith",
        email: "bob@gmail.com",
        password: bcrypt.hashSync("BobPassword456", 10), // hashed password
        isAdmin: false
    },
    {
        userID: 3,
        name: "Charlie Brown",
        email: "charlie@gmail.com",
        password: bcrypt.hashSync("CharliePassword789", 10), // hashed password
        isAdmin: false
    }
];

// Enhanced Sample data for Watches
const watches = [
    {
        watchID: 1,
        brand: "Rolex",
        model: "Submariner",
        yearOfRelease: 2020,
        price: 8000,
        endDate: "2024-12-31",
        imageUrl: "https://chronexttime.imgix.net/V/6/V68508/V68508_1.png?w=570&ar=1:1&auto=format&fm=png&q=55&usm=50&usmrad=1.5&dpr=1&trim=color&fit=fill&auto=compress&bg=FFFFFF&bg-remove=false",
        imageThumbnails: [
            "https://www.ap-watches.com/ap-watches/fotos/rolex-submariner-date-16610-tritium-completo-nunca-pulido-1556098385.jpg",
            "https://rolex.schaapcitroen.nl/_next/image/?url=https%3A%2F%2Fschapi-products.s3.eu-central-1.amazonaws.com%2F3665439%2Fm126610ln-0001_material.webp&w=3840&q=90",
            "https://www.time-trader.co.uk/images/rolex-submariner-date-40-p138-3472_image.jpg"
        ]
    },
    {
        watchID: 2,
        brand: "Omega",
        model: "Seamaster",
        yearOfRelease: 2018,
        price: 6000,
        endDate: "2024-10-30",
        imageUrl: "https://www.renekahle.nl/media/catalog/product/cache/8b24f022a403b62cad204787a49500ea/2/1/210.30.42.20.03.001.jpg",
        imageThumbnails: [
            "https://www.watchworksus.com/cdn/shop/files/omega-seamaster-planet-ocean-right-side.png?v=1720562839&width=1445",
            "https://www.careofcarl.nl/bilder/artiklar/zoom/26634710_4.jpg?m=1706860633",
            "https://content.thewosgroup.com/productimage/17331937/17331937_4.jpg?impolicy=hero&imwidth=700"
        ]
    },
    {
        watchID: 3,
        brand: "Tag Heuer",
        model: "Carrera",
        yearOfRelease: 2019,
        price: 4500,
        endDate: "2024-11-20",
        imageUrl: "https://www.juweliervanwillegen.nl/media/catalog/product/cache/d397454e8c611481035024d9db973e42/c/b/cbs2210.fc6534_1.jpg",
        imageThumbnails: [
            "https://www.robertgatwardjewellers.co.uk/cdn/shop/files/cbn2a1aa-ft6228-thumb2_1024x.jpg?v=1695632733",
            "https://www.tagheuer.com/on/demandware.static/-/Sites-tagheuer-master/default/dw946189ac/TAG_Heuer_Carrera/CBK2117.FC6266/CBK2117.FC6266_USP1.jpg",
            "https://italianwatchspotter.com/wp-content/uploads/2023/01/iws-tag-heuer-carrera-60th-anniversary-side-view-heuer-1024x683-1.png"
        ]
    }
];

// Sample data for Bids
const bids = [
    {
        bidID: 1,
        amount: 5000,
        userID: 1,
        watchID: 1
    },
    {
        bidID: 2,
        amount: 3000,
        userID: 2,
        watchID: 1
    },
    {
        bidID: 3,
        amount: 4500,
        userID: 1,
        watchID: 2
    },
    {
        bidID: 4,
        amount: 2000,
        userID: 3,
        watchID: 3
    }
];

// Exporting the data arrays
export { users, watches, bids };