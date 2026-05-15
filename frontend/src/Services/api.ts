export let api = "";
if (process.env.NODE_ENV == "development") api = "http://localhost:5000/";
else api = "https://reviewforevery.onrender.com/api/";