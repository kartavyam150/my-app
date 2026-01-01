/* eslint-disable react/prop-types */
import React from 'react';

// Utility for class merging (simple version since we don't have clsx/tailwind-merge setup guaranteed)
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const Button = ({ children, className, variant = 'default', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

    const variants = {
        default: "bg-black text-white hover:bg-black/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </button>
    );
};

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                "border-slate-300 dark:border-slate-700", // Default border color
                className
            )}
            {...props}
        />
    );
};

export const Card = ({ className, children, ...props }) => (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm bg-white dark:bg-slate-950 dark:border-slate-800", className)} {...props}>
        {children}
    </div>
);

export const CardHeader = ({ className, children, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
        {children}
    </div>
);

export const CardTitle = ({ className, children, ...props }) => (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
        {children}
    </h3>
);

export const CardContent = ({ className, children, ...props }) => (
    <div className={cn("p-6 pt-0", className)} {...props}>
        {children}
    </div>
);

export const Label = ({ className, children, ...props }) => (
    <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props}>
        {children}
    </label>
);
