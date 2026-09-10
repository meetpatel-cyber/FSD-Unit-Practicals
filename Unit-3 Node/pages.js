function home(){
    return `
        <html>
            <head>
                <title>This is Home Page</title>
            </head>
            <body>
                ${menu()}
                <h1>Home Page</h1>
                <p>This is Home Page</p>
            </body>
        </html>
    `;
}

function about(){
    return `
        <html>
            <head>
                <title>This is About US Page</title>
            </head>
            <body>
                ${menu()}
                <h1>About US</h1>
                <p>This is About Us Page</p>
            </body>
        </html>
    `;
}

function contact(){
    return `
        <html>
            <head>
                <title>This is Contact US Page</title>
            </head>
            <body>
                ${menu()}
                <h1>Contact US</h1>
                <p>This is Contact Us Page</p>
            </body>
        </html>
    `;
}

function nopage(){
    return `
        <html>
            <head>
                <title>Page Not Found</title>
            </head>
            <body>
                <h1>Page Not Found</h1>
                <h2>No found</h2>
            </body>
        </html>
    `;
}

function menu(){
    return `
        <nav>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
        </nav>
    `;
}

export default {
    home,
    contact,
    about,
    nopage
}