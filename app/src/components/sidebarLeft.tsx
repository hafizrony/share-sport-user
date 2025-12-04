export default function SidebarLeft({ title, items }: { title: string, items: string[] }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx}>
                        <a href="#" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition text-sm font-medium">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}