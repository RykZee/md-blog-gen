import Navbar from "@/app/ui/home/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex v-screen flex-row md:flex-col md:overflow-hidden">
      <div className="flex-grow pt-3 md:overflow-y-auto md:px-12 md:py-20">
        {children}
      </div>
    </div>
  );
}
