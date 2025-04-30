export function HeaderCard({ title }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
                <div className="relative group">
                    <div
                        className="w-4 h-4 bg-[#FF5F5A] rounded-full group-hover:bg-[#FF514B] cursor-pointer flex items-center justify-center">
                    </div>
                    <div
                        className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block text-xs text-white bg-[#2a2a2a] px-2 py-1 rounded shadow">
                        Clear</div>
                </div>
                <div className="relative group">
                    <div
                        className="w-4 h-4 bg-[#FFBE2E] rounded-full group-hover:bg-[#FEB615] cursor-pointer flex items-center justify-center">
                    </div>
                    <div
                        className="absolute left-1/2 -translate-x-1/2 mt-1 hidden text-white group-hover:block text-xs bg-[#2a2a2a] px-2 py-1 rounded shadow">
                        Add Row/Col</div>
                </div>
                <div className="relative group">
                    <div
                        className="w-4 h-4 bg-[#2ACA44] rounded-full  group-hover:bg-[#15CD33] cursor-pointer flex items-center justify-center">
                    </div>
                    <div
                        className="absolute left-1/2 -translate-x-1/2 mt-1 text-white hidden group-hover:block text-xs bg-[#2a2a2a] px-2 py-1 rounded shadow">
                        Remove Row/Col</div>
                </div>
            </div>
            <span className="text-white font-medium">{title}</span>
        </div>
    )
}