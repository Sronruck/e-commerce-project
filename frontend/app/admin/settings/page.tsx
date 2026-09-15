"use client";

import {
  User, Bell, Lock, CreditCard, Sun, Globe, Settings as SettingsIcon, HelpCircle, ChevronRight,
} from "lucide-react";

const settingsItems = [
  { label: "Account & Profile", icon: User },
  { label: "Notifications", icon: Bell },
  { label: "Privacy & Security", icon: Lock },
  { label: "Payment Methods", icon: CreditCard },
  { label: "Appearance", icon: Sun },
  { label: "Language & Region", icon: Globe },
  { label: "Integration & API", icon: SettingsIcon },
  { label: "Help & Support", icon: HelpCircle },
];

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-admin-text">Settings</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {settingsItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center justify-between rounded-2xl bg-admin-card px-5 py-4 text-left hover:bg-admin-cardLight"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-admin-text">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-admin-cardLight text-admin-muted">
                <item.icon size={16} />
              </span>
              {item.label}
            </span>
            <ChevronRight size={16} className="text-admin-muted" />
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="rounded-full bg-admin-cardLight px-8 py-2.5 text-sm font-medium text-admin-text">
          Save Changes
        </button>
      </div>
    </div>
  );
}
