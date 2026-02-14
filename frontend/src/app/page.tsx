import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Truck, Package } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col">

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-emerald-700 mb-6">
          Smart Order Management System
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground mb-10">
          Seamlessly manage orders, track deliveries in real-time,
          and provide a smooth checkout experience with our full-stack solution.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/menu">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse Menu
            </Button>
          </Link>

          <Link href="/track">
            <Button variant="outline" size="lg">
              <Truck className="mr-2 h-5 w-5" />
              Track Order
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Package className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Order Management
            </h3>
            <p className="text-muted-foreground">
              Efficiently create, manage, and update customer orders in real time.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Truck className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Live Tracking
            </h3>
            <p className="text-muted-foreground">
              Customers can track their orders with real-time status updates.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Smooth Checkout
            </h3>
            <p className="text-muted-foreground">
              Secure checkout with validation and optimized performance.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-600 text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} Order Management System. Built with Next.js & Hono.
      </footer>
    </div>
  );
}
