import { Truck, HeadphonesIcon, Package, Percent, Users, Leaf } from 'lucide-react';

export function TrustStrip() {
  const features = [
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Always here to help'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: '2-5 business days'
    },
    {
      icon: Leaf,
      title: 'Eco Friendly',
      description: 'Sustainable options'
    },
    {
      icon: Percent,
      title: 'Bulk Discounts',
      description: 'Save up to 30%'
    },
    {
      icon: Users,
      title: 'Free Design',
      description: 'Expert assistance'
    }
  ];

  return (
    <section className="bg-[#F7F9FB] py-12 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300 border-2 border-[#2D7F88]">
                  <Icon className="w-8 h-8 text-[#2D7F88]" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-[#0F2E4D] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#5A5A5A]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
