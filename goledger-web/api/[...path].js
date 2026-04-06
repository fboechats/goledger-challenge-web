export default async function handler(req, res) {
    try {
        const url = `${process.env.API_URL}${req.url}`

        const auth = Buffer.from(
            `${process.env.USER}:${process.env.PASSWORD}`
        ).toString('base64');

        const response = await fetch(url, {
            method: req.method,
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
            headers: {
                ...req.header,
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        })

        const data = await response.text()
        console.log(data)
        res.status(response.status).send(data)
    } catch (err) {
        console.error('Proxy error:', err)
        res.status(500).json({ error: 'Proxy error' })
    }
}