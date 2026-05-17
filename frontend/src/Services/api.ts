export let api = "";
if (process.env.NODE_ENV == "development") api = "http://localhost:5000/";
else api = "https://cities-of-the-rear.onrender.com/";