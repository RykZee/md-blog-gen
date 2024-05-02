import Navbar from "@/app/ui/home/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex v-screen flex-row md:flex-col md:overflow-hidden">
      <div className="">
        <Navbar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
