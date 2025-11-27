npm run build 

vercel --prod

configuração do vercel.json:

{
  "version": 2,
  "builds": [
    {
      "src": "dist/src/main.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [{ "source": "/(.*)", "destination": "/dist/src/main.js" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://main.d220l2ccf6vick.amplifyapp.com"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,POST,PUT,DELETE,OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        },
        { "key": "Access-Control-Allow-Credentials", "value": "true" }
      ]
    }
  ]
}
