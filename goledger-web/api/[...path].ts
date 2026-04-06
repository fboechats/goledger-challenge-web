export async function GET(req: Request, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params)
}

export async function POST(req: Request, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params)
}

export async function PUT(req: Request, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params)
}

export async function DELETE(req: Request, { params }: { params: { path: string[] } }) {
    return proxyRequest(req, params)
}

async function proxyRequest(req: Request, params: { path: string[] }) {
    const path = params.path.join('/')

    const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${path}`,
        {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: req.method !== 'GET' ? await req.text() : undefined,
        }
    )

    return new Response(response.body, {
        status: response.status,
    })
}