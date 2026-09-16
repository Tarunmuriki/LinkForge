export function Card({className="",children}){return <div className={`rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}>{children}</div>}
export function CardHeader({children,className=""}){return <div className={`p-5 ${className}`}>{children}</div>}
export function CardTitle({children}){return <h3 className="font-semibold text-zinc-950">{children}</h3>}
export function CardContent({children,className=""}){return <div className={`px-5 pb-5 ${className}`}>{children}</div>}
