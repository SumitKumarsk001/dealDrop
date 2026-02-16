import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogIn,Rabbit,Shield,Bell, TrendingDown } from "lucide-react";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./action";
import ProductCard from "@/components/ProductCard";
export default async function Home() {

  const supabase=await createClient(); // Replace with actual user authentication logic
  const{
    data:{user},
    }=await supabase.auth.getUser();

  const products=user?await getProducts():[]; // Replace with actual product data fetching logic

   const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <>
   <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky px-18 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src={"/deal-drop-logo.png"} alt="Deal drop logo"
          width={600} height={200} className="h-10 w-auto"/>
        </div>
        { /** Auth Button */ }
       <AuthButton user={user}/>
      </div>
    </header>

    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-6">Made with ❤️ by Deal Drop Team</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Never Miss a Price Drop</h2>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">Track prices from any e-commerce site. Get instant alerts when prices drop below your target drop. Save money effortlessly with Deal Drop.</p>

        {/* Add products form */}
        <AddProductForm user={user}/>
        {/* Feature */}
        {products.length === 0 && (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg shadow p-6">
                <feature.icon className="w-8 h-8 text-orange-500 mb-4"/>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
       {products.length > 0 && (
        <div className="text-center text-gray-500 mt-10">Your tracked products will appear here.</div>
       )}
      </div>
    </section>

    {
      user && products.length >0 && (
        <section className="max-w-7xl mx-auto px-18 ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Tracked Products</h3>
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? "product" : "products"} 
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
           {
            products.map(product=><ProductCard key={product.id} product={product}/>)
           }
          </div>
        </section>
      )
    }

     {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
   </main>
    </>
  );
}
