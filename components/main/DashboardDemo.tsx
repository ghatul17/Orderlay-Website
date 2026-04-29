
// DashboardDemo.tsx
import React from 'react';
import DashboardDemoItem from '@/components/DashboardDemoItem';

function DashboardDemo() {
    return (
        <section className="w-full py-8 md:py-16">
            <div className="container flex flex-wrap justify-evenly gap-6">
                <DashboardDemoItem
                    tag="Dashboard"
                    title="Summarize the sales performance for the reporting period."
                    image="/asset/sales.svg"
                    isBottom={false}
                />
                <DashboardDemoItem
                    title="Manage Different Member."
                    description="Assign and oversee staff roles and enhance team coordination for smoother service."
                    image="/asset/member-dash.png"
                    isBottom={true}
                />
                <DashboardDemoItem
                    tag="Dashboard"
                    title="Review and Track Orders and Table Status in Real Time"
                    image="/asset/ordersummary.svg"
                    isBottom={false}
                />
            </div>
        </section>
    );
}

export default DashboardDemo;