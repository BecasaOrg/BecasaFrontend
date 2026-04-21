import StudentSidebar from '@/components/dashboard/StudentSidebar';
import StudentHeader from '@/components/dashboard/StudentHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050d18] text-white flex p-4 gap-6 font-sans overflow-hidden">
      {/* Sidebar - Fixed width for desktop */}
      <aside className="w-[340px] flex-shrink-0 h-[calc(100vh-2rem)]">
        <StudentSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 h-[calc(100vh-2rem)]">
        <header className="flex justify-end items-center px-4 pt-2">
            <StudentHeader />
        </header>

        <main className="flex-1 relative overflow-hidden flex flex-col pt-2">
          {children}
        </main>
      </div>
    </div>
  );
}
