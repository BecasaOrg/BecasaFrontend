interface DashboardTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        'TABLERO',
        'CAMPAMENTOS',
        'MIS CURSOS',
        'VERIFICAR PERFIL',
        'CHAT',
        'AYUDA'
    ];

    return (
        <div className="w-full bg-white rounded-full border border-gray-200 p-1 flex items-center justify-between shadow-sm">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`flex-1 py-3 px-4 text-[10px] font-black tracking-widest rounded-full transition-all ${
                        activeTab === tab 
                        ? 'bg-[#AAFF00] text-black shadow-[0_2px_10px_rgba(170,255,0,0.3)]' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default DashboardTabs;
