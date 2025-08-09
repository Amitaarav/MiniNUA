import { ShieldCheck, Truck, RotateCw, Headphones } from 'lucide-react';

export default function ValueProps() {
  const items = [
    { icon: Truck, title: 'Fast Delivery', desc: '2–5 days across India' },
    { icon: RotateCw, title: 'Easy Returns', desc: '7-day hassle-free returns' },
    { icon: ShieldCheck, title: 'Secure Payments', desc: 'UPI, Cards, Netbanking' },
    { icon: Headphones, title: 'Support', desc: '24/7 chat & email support' },
  ];
  return (
    <section className="w-full bg-gray-50 border-t border-b">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="w-6 h-6 text-pink-700" />
            <div>
              <div className="font-semibold leading-tight">{title}</div>
              <div className="text-xs text-gray-600">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 