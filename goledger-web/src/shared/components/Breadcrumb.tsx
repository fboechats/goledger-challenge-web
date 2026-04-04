import { Link } from 'react-router-dom'

type Item = {
    label: string
    to?: string
}

type Props = {
    items: Item[]
}

export function Breadcrumb({ items }: Props) {
    return (
        <nav className="text-sm text-gray-500 mb-4">
            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <span key={index}>
                        {item.to && !isLast ? (
                            <Link
                                to={item.to}
                                className="hover:underline text-blue-600"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-700">
                                {item.label}
                            </span>
                        )}

                        {!isLast && <span className="max-w-4xl mx-auto px-4 py-10">{">"}</span>}
                    </span>
                )
            })}
        </nav>
    )
}