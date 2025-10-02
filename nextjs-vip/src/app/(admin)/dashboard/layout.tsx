import React from "react";

function DashboardLayout({
  children,
  products,
  analytics,
  payments,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  analytics: React.ReactNode;
  payments: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div>{children}</div>
      <div className="flex items-center justify-between gap-5">
        {products}
        {analytics}
      </div>
      {payments}
    </div>
  );
}

export default DashboardLayout;
