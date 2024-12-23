export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const code = body.code

    // Échange le code contre un token
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code,
        })
    })

    return await response.json();
})
